## Text Inputs

As a general rule, data flow in svelte is *top down* - a parent component can set props on a child component, and a component can set attributes  on an element, but not the other way around.

Sometimes it is useful to break that rule. 

```html
<script>
	let name = 'world';
</script>

<input value={name}>
   
<h1>Hello {name}!</h1>
```

Take the case of the `<input>` element in the component - we could add an `on:input` event handler that sets the value of `name` to `event.target.value`, but it is a bit... biolerplatey. It gets even worse with other form elements.

Instead, we can use the `bind:value` directive:

```html
<input bind:value={name}>
```

This means that not only will changes to the value of `name` update the input value, but changes to the input value will update `name`.

However, `bind:value` directive only updates the variable when the input element loses focus, so the `on:input` listener ensures that changes to the input element are immediately reflected in the variable.

```html
<input bind:value={name} on:input={handleChange} >
```

`bind:value` is a powerful feature of Svelte that makes it easy to create two-way data bindings between variables and input elements, allowing for dyanamic and reactive user interfaces.

## Numeric Inputs

In the DOM, everything is a string. That's unhelpful when you are dealing with numeric inputs - `type="number"` and `type="range"` - as it means you have to remember to coerce `input.value` before using it.

With `bind:value`, Svelte takes care of it for you:

```html
<input type=number bind:value={a} min=0 max=10>
<input type=range bind:value={a} min=0 max=10>
```

## Checkbox inputs

```html
<script>
	let yes = false;
</script>
<label>
	<input type=checkbox checked={yes}>
	Yes! Send me regular email spam
</label>
{#if yes}
	<p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p>You must opt-in to continue. If you're not paying, you're the product.</p>
{/if}
<button disabled={!yes}>
	Subscribe
</button>
```

Checkboxes are used for toggling between states. Instead of binding to `input:value`, we bind to `input:checked`:

```html
<input type=checkbox bind:checked={yes}>
```

## Group Inputs

```html
<script>
	let scoops = 1;
	let flavours = ['Mint choc chip'];
</script>

<h2>Size</h2>

<label>
	<input type=radio group={scoops} name="scoops" value={1}>
	One scoop
</label>

<label>
	<input type=radio group={scoops} name="scoops" value={2}>
	Two scoops
</label>

<label>
	<input type=radio group={scoops} name="scoops" value={3}>
	Three scoops
</label>

<h2>Flavours</h2>

<label>
	<input type=checkbox group={flavours} name="flavours" value="Cookies and cream">
	Cookies and cream
</label>

<label>
	<input type=checkbox group={flavours} name="flavours" value="Mint choc chip">
	Mint choc chip
</label>

<label>
	<input type=checkbox group={flavours} name="flavours" value="Raspberry ripple">
	Raspberry ripple
</label>


```

If you have multiple inputs relating to the same value, you can use `bind:group` along with the `value` attribute. Radio inputs in the same group are mutually exclusive; checkbox inputs in the same group form an array of selected values.

Add `bind:group` to each input:

```html
<input type=radio bind:group={scoops} name="scoops" value={1}>
```

In this case, we could make the code simpler by moving the checkbox inputs into an `each` block. First, add a `menu` variable to the `<script>` block...

```js
let menu = [
	'Cookies and cream',
	'Mint choc chip',
	'Raspberry ripple'
];
```

...then replace the second section:

```html
<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
		{flavour}
	</label>
{/each}
```

It is now easy to expand our icecream menu in new and exciting directions.

## Textarea Inputs

The `<textarea>` element behaves similarly to a text input in Svelte - use `bind:value` to create a two-way binding between the `<textarea>` content and the `value` varaible:

```html
<textarea bind:value={value}></textarea>
```

In cases like these, where the names match, we can also use a shorthand form:

```html
<textarea bind:value></textarea>
```

This applies to all bindings, not just textareas.

## Select Bindings

```html
<script>
	let questions = [
		{ id: 1, text: `Where did you go to school?` },
		{ id: 2, text: `What is your mother's name?` },
		{ id: 3, text: `What is another personal fact that an attacker could easily find with Google?` }
	];
	let selected;
	let answer = '';
	function handleSubmit() {}
</script>
<h2>Insecurity questions</h2>
<form on:submit|preventDefault={handleSubmit}>
	<select value={selected} on:change="{() => answer = ''}">
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>
	<input bind:value={answer}>
	<button disabled={!answer} type=submit>
		Submit
	</button>
</form>
<p>selected question {selected ? selected.id : '[waiting...]'}</p>
```

We can also use `bind:value` with `<select>` elements. 

```html
<select bind:value={selected} on:change="{() => answer = ''}">
```

Note that `<option>` values are objects rather than strings. Svelte does not mind.

> Because we haven't set an initial value of `selected`, the binding will set it to the default value (the first in the list) automatically. Be careful though — until the binding is initialised, `selected` remains undefined, so we can't blindly reference e.g. `selected.id` in the template. If your use case allows it, you could also set an initial value to bypass this problem.

## Select Multiple

A select can have a `multiple` attribute, in which case it will populate an array rather than selecting a single value.

```html
<h2>Flavours</h2>

<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

## Contenteditable bindings

Elements with `contenteditable=true` attribute support `textContent` and `innerHTML` bindings:

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
	bind:textContent={text}
></div>
```

## Each block bindings

You can even bind to properties inside an `each` block.

```html
{#each todos as todo}
	<div class:done={todo.done}>
		<input
			type=checkbox
			bind:checked={todo.done}
		>

		<input
			placeholder="What needs to be done?"
			bind:value={todo.text}
		>
	</div>
{/each}
```

> Note that interacting with these `<input>` elements will mutate the array. If you prefer to work with immutable data, you should avoid these bindings and use event handlers instead.

## Media elements

The `<audio>` and `<video>` elments have several properties that you can bind to.

```
<video
	poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
	src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
	on:mousemove={handleMove}
	on:touchmove|preventDefault={handleMove}
	on:mousedown={handleMousedown}
	on:mouseup={handleMouseup}
	bind:currentTime={time}
	bind:duration
	bind:paused>
	<track kind="captions">
</video>
```

> Ordinarily on the web, you would track `currentTime` by listening for `timeupdate` events. But these events fire too infrequently, resulting in choppy UI. Svelte does better — it checks `currentTime` using `requestAnimationFrame`

The complete set of bindings for `<audio>` and `<video>` is as follows — six _readonly_ bindings...

-   `duration` (readonly) — the total duration of the video, in seconds
-   `buffered` (readonly) — an array of `{start, end}` objects
-   `seekable` (readonly) — ditto
-   `played` (readonly) — ditto
-   `seeking` (readonly) — boolean
-   `ended` (readonly) — boolean

...and five _two-way_ bindings:

-   `currentTime` — the current point in the video, in seconds
-   `playbackRate` — how fast to play the video, where `1` is 'normal'
-   `paused` — this one should be self-explanatory
-   `volume` — a value between 0 and 1
-   `muted` — a boolean value where true is muted

Videos additionally have readonly `videoWidth` and `videoHeight` bindings.

## Dimensions

Every block-level element has `clientWidth`, `clientHeight`, `offsetWidth`, and `offsetHeight` bindings:

```html
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>
```

These bindings are readonly — changing the values of `w` and `h` won't have any effect.

## This

The readonly `this` binding applies to every element (and component) and allows you to obtain a reference to rendered elements. For example, we can get a reference to a `<canvas>` element:

```html
<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas>
```

Note that the value of `canvas` will be `undefined` until the component has mounted, so we must put the logic inside the `onMount` lifecycle function.

## Component bindings


