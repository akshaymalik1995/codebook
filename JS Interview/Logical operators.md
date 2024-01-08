
**Question : How many logical operators are there in JavaScript?**
There are four logical operators in JavaScript. 
	- `||` (OR)
	- `&&` (AND)
	- `!` (NOT)
	- `??` (NULLISH Coalescing)

**Question: Do logical operators apply only to the boolean values in JavaScript?**
No. they can be applied to values of any type.

## `||` OR

**Question: How does the logical OR operate?**
If any of its arguments are `true`, it returns `true`, otherwise it `false`

For example:
```js
true || true // true
false || true // true
true || false // true
false || false // false
```

**Question: What happens when an operand is not a boolean value?**

If an operand is not a boolean, it is converted to a boolean for the evaluation.

```js
1 || 0 // true || false -> 1
```

Question: What will be the value of the constant `result`?
```js
const value1 = 1
const value2 = 2
const value3 = true
const result = value1 || values2 || values3
// 1
```

In JavaScript, the OR `||` does the following:
- Evaluates operands from left to right
- For each operand, coverts it to boolean. If the result is `true`, stops and return the original value of that operand.
- If all operands have been evaluated, it returns the last operand.

A value is returned in its original form, without the conversion.

In other words, a chain of OR `||` returns the first truthy value or the last one if no truthy value is found.

## `&&` AND

**Question: How does `&&` operator work in classical programming?**
In classical programming, AND returns `true` if both operands are truthy and `false` otherwise.

**Question: How does `&&` operator work in JavaScript?**

It finds the first falsy value.

The AND `&&` operator does the following:
- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.

In other words, AND returns the first falsy value or the last value if none were found.

Examples:
```js
1 && 0 // 0
1 && 5 // 5
null && 5 // null
0 && "no matter what" // 0
```

**Question: How does the expression `a && b || c && d` gets evaluated?**

In JavaScript, the precedence of `&&` is higher than `||`.

Hence, the expression gets evaluated as `(a && b) || (c && b)`


## `!` NOT

**Question: How does the logical `!` work in JavaScript?**
The operator accepts a single argument and does the following:

1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.

```js
!true // false
!0 // true
```

**Question: What does the expression `!!"non-empty string"` evaluates to?**

A double NOT `!!` is sometimes used for converting a value to boolean type. That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

**Question: What is the precedence of the `!` operator of all logical operators?**
The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`

## Miscellaneous

**Question: What does the expression `alert(1) || 2 || alert(3)` evaluates to?**

Answer:  `2`

`alert(1) || 2 || alert(3)` shall return `2` because `alert(1)` returns `undefined`. That's why the first truthy values is `2`.


**Question: What does the expression `1 && null && 2` evaluates to?**

`null` because it is the only falsy value in the expression.

















