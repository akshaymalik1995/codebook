CommonJS and ES modules are two different ways of importing modules in JavaScript.

CommonJS is a module system used Node.js for importing and exporting modules. It uses the `require()` function for importing modules and the `module.exports` or `exports` object for exporting modules.

```js
const express = require("express")
```

ES modules, also knows as ECMAScript modules, is the official standard for JavaScript modules. It used the `import` keyword for importing modules and the `export` keyword for exporting modules. 

```js
import express from 'express'
```

In Node.js, the `import` statement can only be used when the file containing the code is being executed in a module environment, which is enabled by default when the file is run using the `--experiment-modules` flag, or by adding `"type" : "module"` to package.json. 

```json
...
"main": "index.js",
"type": "module",
...
```

One main difference between the two is that CommonJS modules are executed immendiately, while ES modules are executed only when they are imported. This means that if a CommonJS module is imported multiple times, it will execute multiple times, while an ES module will execute only once. Additionally, CommonJS modules use a global `require()` function, while ES modules use a more explicit import statement, making the dependencies of a module more clear.

Another difference is that CommonJS modules are synchronous, which means that the imported module is guaranteed to be fully loaded and executed before the next line of code is executed. ES modules, on the other hand, are asynchronous, which means that the imported module may not be fully loaded and executed before the next line of code is executed.

It is worth noting that in browser, you can use `<script type='module'>` to import ES modules and `<script type="text/javascript" nomodule>` to import CommonJS modules.