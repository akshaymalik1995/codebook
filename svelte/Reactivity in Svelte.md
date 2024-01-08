
## Assignment

At the heart of Svelte is a powerful system of *reactivity* for keeping the DOM in sync with your application state - for example, in response to an event.

For example:

```html
<script>
	let count = 0;
	function incrementCount() {
		count += 1
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

Svelte 'instruments' this assignment with some code that tells it the DOM will need to be updated.

## Declarations

Svelte's reactivity not only keeps the DOM in sync with your application's variables, it cam also keep variables in sync with each other using reactive declarations. They look like this:

```js
let count = 0
$: doubled = count * 2
```

Svelte interepts it to mean 're-run' this code whenever any of the referenced values change.

Let's use `doubled` in our markup:

```html
<p>{count} doubled is {doubled} </p>
```

Ofcourse, you could just write `{count * 2}` in the markup instead - you do not have to use reactive values. Reactive values become particularly valuable when you need to reference them multiple times, or you have values that depend on `other` reactive values.

Svelte does not re-render the entire component whenever the value of any variable changes. Instead, **Svelte uses a technique called "reactive declarations" to track which parts of the component's template depend on which variables, and only updates those parts of the DOM when the corresponding values change**.

When a Svelte component is compiled, it generates optimized code that includes the reactive declarations for all the variables in the component. These reactive declarations create 'subscriptions' that track which parts of the component's template depend on each variable.

When a variable changes, Svelte uses these subscriptions to determine which part of the template need to be updated. It then generates optimized DOM updates that only updates those parts of the template, instead of re-rendering the entire component.

## Statements

We are not limited to declaring reactive values - we can also run aribitrary statements reactively. For example, we can log the value of `count` whenever it changes:

```js
$: console.log("the count is " + count)
```

You can easily group statements together with a block:

```js
$ : {
	console.log("the count is " + count)
	alert("I SAID THE COUNT IS " + count)
}
```

You can even put the `$:` in front of things like `if` blocks:

```js
$: if (count >= 10){
	alert("count is dangerously high")
	count = 9
}
```

## Updating arrays and objects

**Svelte's reactivity is triggered by assignments.** Methods that mutate arrays or objects will not trigger updates by themselves. 

```html
<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers.push(numbers.length + 1);
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>
```

In this example, clicking the "Add a number" button calls the `addNumber` function, which appends a number to the array but does not trigger the recalculation of `sum`.

One way to fix this is to assign `numbers` to itself to tell the compiler it has changed:

```js
function addNumber(){
	numbers.push(numbers.length + 1)
	numbers = numbers
}
```

You could also write this more concisely using the ES6 spread syntax:

```js
function addNumber(){
	numbers = [...numbers, numbers.length + 1]
}
```

The same rule applies to array methods such as `pop`, `shift`, and `splice` and to object methods such as `Map.set`, `Set.add`, etc.

Assignments to `properties` of arrays and objects - e.g. `obj.foo += 1` or `array[i] = x` - work the same way as assignments to the value themselves.

```js
function addNumber() {
	numbers[numbers.length] = numbers.length + 1
}
```

However, indirect assignments to references such as this...

```js
const foo = obj.foo
foo.bar = "baz"
```

or

```js
function quox(thing){
	thing.foo.bar = "baz"
}
quox(obj)
```

...won't trigger reactivity on `obj.foo.bar`, unless you follow it up with `obj=obj`

A simple rule of thumb: the updated variable must directly appear on the left hand side of the assignment.