
## Task 1

**Install Nodejs**

## Task 2

**Create an empty project.**

1.  `npm init -y`
2.  Create an `index.js` file.
3. Run the file with `node index.js`

## Task 3

**Installing express and initial app setup**

1. Install `express`

```
npm i express --save
```

2. Create a basic server using express

```js
// index.js
const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.get("/products", (req, res) => {
    res.send("Products Page")
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
```


## Task 4

**Configuring hot reload with `nodemon`**

1. Install `nodemon`

```
npm i -g nodemon
```

2. Start the app with `nodemon`

```
nodemon index.js
```

3. Reconfigure `package.json` to add the `start` script

```json
  "scripts": {
    "start": "nodemon index.js"
  },
```

4. Restart the app

```
npm start
```




