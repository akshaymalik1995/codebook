

## onMount

Every component has a *lifecyle* that starts when it is created, and ends when it is destroyed. There are a handful of functions that allow you to run code at key moments during that lifecycle.

The one you will use most frequently is `onMount`, which runs after the component is first rendered to the DOM. 

We will add an `onMount` handler that loads some data over the network:

```html
<script>
	import {onMount} from 'svelte'
	let photos = []
	onMount(aysnc () => {
		const res = await fetch("/tutorial/api/album")
		photos = await res.json()
	})
</script>
```

It is recommended to put the `fetch` in `onMount` rather than at the top level of the `<script>` because of the server-side rendering (SSR). With the exception of `onDestroy`, lifecycle functions do not run during SSR, which means we can avoid fetching data that should be loaded lazily once the component has been mounted in the DOM.

Lifestyle functions must be called while the component is initialising so that the callback is bound to the component instance - not (say) in a `setTimeout`.

If the `onMount` callback returns a function, that function will be called when the component is destroyed.

## onDestroy

To run code when your component is destroyed, use `onDestroy`.

For example, we can add a `setInterval` function when our component initialises, and clean it up when it is no longer relevant. Doing so prevents memory leaks.

```html
<script>
	import {onDestroy} from 'svelte';
	let counter = 0
	const interval = setInterval(() => counter += 1)
	onDestroy(() => cleanInterval(interval))
</script>
```

While it is important to call lifestyle functions during the component's initialisation, it does not matter *where* you call them from. So if we wanted, we could abstract the internal logic into a helper function in `utils.js` ...

```js
import {onDestroy} from "svelte"
export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds)
	onDestroy(() => {
		clearInterval(interval)
	})
}
```

...and import it into our component:

```html
<script>
	import {onInterval} from "./util.js"
	let counter = 0
	onInterval(() => counter += 1, 1000)
</script>
```

## beforeUpdate and afterUpdate

The `beforeUpdate` function schedules work to happen immediately before the DOM is updated, `afterUpdate` is its counterpart, used for running code once the DOM is in sync with your data.

Together, they are useful for doing things imperatively that are difficult to achieve in a purely state-driven way.

#### Example 1: Updating a DOM element

Suppose you have a Svelte component that renders a button element. You want to update the button's text whenever a prop value changes. You can use the `beforeUpdate` lifecycle method to get the current value of the prop before it updates, and the `afterUpdate` method to update the button text after it has updated.

```html
<script>
export let buttonText;
let button;
function beforeUpdate() {
	console.log("Button text before update: ", button.textContent)
}

function afterUpdate(){
	button.textContent = buttonText
}
</script>

<button bind:this={button}>{buttonText}</button>
```

#### Example 2: Animating a component

Suppose you have a Svelte component that displays a message, and you want to animate it whenever the message changes. You can use the `beforeUpdate` and `afterUpdate` methods to add a CSS class to the component before it updates, and remove it after it has updated. 

```html
<script>
	export let message;
	let container
	function beforeUpdate(){
		container.classList.add("animate")
	}
	function afterUpdate(){
		container.classList.remove("animate")
	}
</script>

<div class="container" bind:this={container}>{message}</div>
```

## tick

The `tick`  function is unlike other lifecycle functions in that you can call it any time, not just when the component initialises. It returns a promise that resolves as soon as any pending state changes have been applied to the DOM (or immediately, if there are no pending state changes).

When you update component state in Svelte, it does not update the DOM immediately. Instead, it waits until the nextt `microtask` to see if there are any other changes that need to be applied including in other components. Doing so avoids unnecessary work and allows the browser to batch things more efficiently. 

#### Example 1: Waiting for a component to be fully rendered before calling a function

Suppose you have a Svelte component that renders a list of items. You want to call a function that manipulates the list items after they have been rendered. You can use `tick` to apply the pending state changes immediately.

```html
<script>
	export let items = []
	let list
	function manipulateList() {
		tick().then( () => {
			list.querySelector(".item").forEach((item, index) => {
				item.textContent = `Item ${index + 1}`
			})
		} )
	}
</script>
<button on:click={manipulateList}>Manipulate List</button>
<ul bind:this={list}>
	{#each items as item}
		<li> class="item">{item}</li>
	{/each}
</ul>
```

#### Example 2: Updating a component property after an animation

Suppose you have a Svelte component that contains an element that you want to animate. After the animation completes, you want to update a property of the component. You can use `tick` to apply the pending state changes before updating the property.

```html
<script>
export let isOpen = false
let box
function toggleBox() {
	isOpen = !isOpen
	box.style.height = isOpen ? "200px" : "0"
	tick().then(() => {
		box.style.background = isOpen ? "green" : "red";
	})
}
</script>

<button on:click={toggleBox}>Toggle Box</button>
<div class="box" bind:this={box}></div>
<style> .box { height: 0; background: red; transition: height 0.3s; } </style>
```

``






















