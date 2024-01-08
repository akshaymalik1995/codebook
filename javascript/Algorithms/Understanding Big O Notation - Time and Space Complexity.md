
In the previous video, we learned that the worst-case complexity of an algorithm is represented using Big O notation. Now, let's dive deeper into understanding what Big O notation actually is.

Big O notation describes the complexity of an algorithm using algebraic terms. It has two important characteristics:

1. It is expressed in terms of the input: Big O notation considers how the algorithm's performance scales with the size of the input.

2. It focuses on the bigger picture: It abstracts away minor details and emphasizes the dominant factors that affect the algorithm's performance.

To illustrate these characteristics, let's calculate the worst-case time complexity of a program. We'll consider an algorithm implemented in JavaScript that finds the sum of the first n natural numbers.

```js
function summation(n) {
	let sum = 0
	for (let i = 1, i <= n, i++) {
		sum += i
	}
	return sum
}
```

We analyze the program by counting the number of times each statement executes based on the input size. For this algorithm, we have three main statements: line two, line four, and line six (the for loop).

Let's calculate the number of times each statement is executed when n is equal to 4:

- Line two executes only once.
- Line four, within the for loop, executes four times (i = 1 to i = 4).
- Line six executes only once.

Therefore, the total count is 4 + 2, which can be generalized to n + 2, where n is the input to the function.

By observing the pattern, we notice that the input size directly influences the count. Hence, the time complexity is expressed in terms of the input size, as mentioned earlier.

Additionally, Big O notation focuses on the bigger picture. When we plug in different values for n, such as 100, 1000, or even 100 million, we realize that the "+ 2" term becomes insignificant compared to the dominant factor (n). Therefore, we can approximate the time complexity to just n, dropping the less significant terms.

For the summation algorithm, the worst-case time complexity (or simply the time complexity) is expressed as O(n), which is known as linear time complexity. It means that as the input size increases, the time complexity also increases linearly.

To determine the time complexity of an algorithm, you don't necessarily have to calculate the count line by line. In most cases, when there is a loop in the algorithm, you can safely assume the time complexity to be at least linear. However, there are exceptions, which we'll explore throughout this course.

```js
function summation(n) {
	return (n * (n + 1)) / 2
}
```

In the video, another algorithm for the same problem is presented, where the time complexity is O(1), referred to as constant time complexity. This means that regardless of the value of n, line two is executed only once.

Once you get familiar with Big O notation, it becomes easier to analyze the time complexity of algorithms. For example, if there are two nested loops, the time complexity is quadratic. Big O notation allows us to drop the less dominant terms and focus on the most significant factor. For instance, if the complexity is calculated as 3n^2 + 5n + 1, we simplify it to n^2 and call it quadratic.

Space complexity follows a similar principle. If an algorithm doesn't require extra memory or the memory needed doesn't depend on the input size, the space complexity is constant. However, algorithms can have linear or logarithmic space complexity as well, where the extra memory needed grows with the input size but not at the same rate.

Throughout the course, we'll be determining the time complexity of various algorithms, and you'll gradually develop a better understanding of it.

Before continuing, keep a few points in mind: multiple algorithms can exist for the same problem, and there is no one right solution. Different algorithms excel under different constraints,
so understanding the problem statement is crucial. Additionally, the same algorithm can be implemented in different ways using the same programming language. Modern features and techniques may simplify the code, but it doesn't make other solutions incorrect. Finally, when writing programs, always consider the big picture. Optimize code for functions that are called frequently, prioritize readability and maintainability over cleverness.

In the next video, we'll explore object and array operations in the context of Big O notation. Understanding these operations is essential for correctly determining the Big O of your algorithms.

