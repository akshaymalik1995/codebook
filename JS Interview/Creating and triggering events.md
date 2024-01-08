
**Question: How to create a custom events in JavaScript?**

Events can be created with the [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) constructor as follows:

```js
const event = new Event("build")

// Listen for the event
elem.addEventListener("build", "e" => {
	console.log("'build' event fired")
})

// Dispatch the event
elem.dispatchEvent(event)
```


**Question: How to add custom data to a custom event?**

To add more data to the event object, the [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) interface exists and the **detail** property can be used to pass custom data. For example, the event could be created as follows:

```js
const event = new CustomEvent("build", { detail: elem.dataset.time });

```

This will then allow you to access the additional data in the event listener:

```js
function eventHandler(e) {
  console.log(`The time is: ${e.detail}`);
}
```


**Question: How do you enable event bubbling in a custom event?**

```js
const eventAwesome = new CustomEvent("awesome", {
  bubbles: true,
  detail: { text: 'some text' },
});
```





