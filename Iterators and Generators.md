
## Generators

1. A generator is a kind of iterator.
2. It is useful when the values to be iterated are not the elements of a data structure, but the result of a computation.
3. To create a generator, you must first define a `generator function`. 
4. A generator function is defined with the keyword `function*` rather than `function`.
5. When you invoke a generator function, it does not actually execute the function body, but instead returns a generator object.
6. This generation object is an iterator.
7. Calling its `next()` method causes the body of the  generator function 