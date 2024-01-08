

`onMount` is a lifecycle function in Svelte that is called when a component is first mounted to the DOM. It is often used to perform initial step, such as fetching data or setting up event listeners.

Here is an example of using `onMount` to fetch data from an API:

```html
<script>
	import {onMount} from 'svelte';
	let data = []
	async function fetchData(){
		const response = await fetch("https://example.com/api/data")
		data = await response.json()
	}
onMount(() => fetchData())
</script>

<ul>
{#each data as item}
	<li>{item}</li>
{/each}
</ul>
```

In this example. `onMount` is used to call the `fetchData` function, which makes a request to an API and sets the `data` variable to the response. The data is then rendered in the `ul` element using a `#each` block.    

Here is another example of using `onMount` to set up an event listener:

```html
<script>
	import {onMount} from 'svelte'
	function handleResize() {
		console.log("Window resized")
	}
	onMount(() => {
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	})
</script>
```

In this example, `onMount` is used to add an event listener to the `window` object for the `resize` event. The `handleResize` function is called whenever the window is resized, and logs a message to the console. The `return` statement in the `onMount` function is used to clean up the event listener when the component is unmounted. This is important to prevent leaks in the application.



