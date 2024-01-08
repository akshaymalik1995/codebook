Svelte is a popular JavaScript framework that provides a powerful toolset for building dynamic web applications. One of the key features of Svelte is its component-based architecture, which allows developers to create reusable and modular UI elements. In this article, we will explore the lifecycle of a Svelte component and the various methods that are available to manage the component's state and behavior.

## Component Lifecycle Overview

A Svelte component goes through several stages during its lifecycle, including creation, initialization, updates, and destruction. Each stage provides an opportunity for the developer to perform specific actions or update the component's state. Here is a high-level overview of the component lifecycle in Svelte:

1. **Creation**: The component is created and initialized with the initial state and properties.
2. **Intialization**: The `onMount` lifecycle method is called, allowing the developer to perform initial setup tasks, such as fetching data from an API or setting up event listeners.
3. **Updates**: The component's state or properties are updated, triggering the `beforeUpdate` and `afterUpdate` lifecycle methods.
4. **Destruction**: The component is removed from the DOM and the `onDestroy` lifecycle method is called, allowing the developer to perform cleanup tasks.

## Creation

The creation stage is the first step in a component's lifecycle. During this stage, the component is created and initialized with the intial state and properties. In Svelte, the `export` statement is used to define the properties that a component expects to receive. For example:

```html
<script>
	export let name = "World"
</script>

<h1>Hello {name}! </h1>
```

In this example, the `name` property is defined using the `export` statement and is set to a default value of "World". When this component is used in a parent component, the `name` property can be overridden to display a custom greeting.

## Intialization

The initialization stage is the next step in a component's lifecycle. During this stage, the component is mounted to the DOM and the `onMount` lifecycle method is called.  The `onMount` method is used to perform initial setup tasks, such as fetching data from the API or setting up event listeners. 

## Updates

The update stage is triggered whenever a component's state or properties are updated. During this stage, the `beforeUpdate` and `afterUpdate` lifecycle methods are called, allowing the developer to perform tasks before and after the update. Here is an example:

```html
<script>
	let count = 0;
	function handleClick(){
		count++;
	}
function beforeUpdate(){
	console.log("Before Update", count)
}
function afterUpdate(){
	console.log("After Update", count)
}
</script>
<button on:click={handleClick}> Increment </button>
```

## Destruction

The destruction stage is triggered when a component is removed from the DOM. During this stage, the `onDestroy` lifecycle method is called, allowing the developer to perform cleanup tasks, such as removing event listeners or cleaning up resources. Here is an example:

```html
<script>
	import {onDestroy, onMount} from `svelte`;
	
	function handleClick(){
		console.log("Button Clicked   ")
	}
	function addEventListener(){
		const button = document.querySelector("button")
		button.addEventListener("click", handleClick)
	}
	function removeClickListener(){
		const button = document.querySelector("button")  
		button.removeEventListener("click", handleClick)
	}

	onMount(() => {
		addEventListener()
	})
	onDestroy(() => {
		removeClickListener()
	})   
</script>
<button> Click Me </button>
```

