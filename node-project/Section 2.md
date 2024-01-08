
## Task 1

**Create a server class**

```js
// server/index.js
const express = require("express")

class Server {
    constructor(port){
        this.port = port
        this.app = express()
    }

    start(){
        this._setupRoutes()
        this._listen()
    }
    
    _setupRoutes(){
        this.app.get("/", (req, res) => {
            res.send("Home Page")
        })

        this.app.get("/products", (req, res) => {
            res.send("Products Page")
        })
    }
    _listen(){
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`)
        })
    }
}
module.exports = Server
```


```js
// index.js
const Server = require("./server")
const app = new Server(port = 8080)
app.start()
```


## Task 2

**Create a router class**

1. Create a group of routes

```js
// router/web/pages.js
module.exports = {
    group : {
        prefix : ""
    }, 
    routes : [
        {
            method : "get", 
            path : "/", 
            handler : (req, res) => {
                res.send("Home page")
            }
        },
        {
            method : "get", 
            path : "/about", 
            handler : (req, res) => {
                res.send("About page")
            }
        }
    ]
}
```

2.  Export these routes

```js
// router/web/index.js
const pageRoutes = require("./pages")
module.exports = [
    pageRoutes
]
```

3. Creating the router class

```js
// router/index.js
const express = require("express")
const webRoutes = require("./web")

class Router {
    constructor(){
        this.router = express.Router()
        this.webRoutes = webRoutes
    }

    create(app){
        // TODO: Attack middleware 
        // TODO: Attach routes

        this._attachWebRoutes()
        this._attachApiRoutes()

        // TODO: Handle 404 pages
        // TODO: Handle exceptions
        // TODO: Register router

        app.use(this.router)
    }

    _attachWebRoutes(){
        this._attachRoutes(this.webRoutes)
    }
    _attachApiRoutes(){
        // this._attachRoutes(this._attachApiRoutes, "/api")
    }

    _attachRoutes(routeGroups, prefix = ""){
        routeGroups.forEach(({group, routes}) => {
            routes.forEach(({method, path, handler}) => {
                this.router[method](prefix + group.prefix + path, handler)
            })
        });
    }
}

module.exports = new Router()
```


4. Creating routes

```js
// server/index.js
const express = require("express")
const Router = require("../router") // new

class Server {
    constructor(port){
        this.port = port
        this.app = express()
    }

    start(){
        this._setupRoutes()
        this._listen()
    }

    _setupRoutes(){
        Router.create(this.app) // new
    }

    _listen(){
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`)
        })
    }
}

module.exports = Server
```


## Task 3

**Handling 404 Errors**

```js
// router/index.js
const express = require("express")
const webRoutes = require("./web")

class Router {
    constructor(){
        this.router = express.Router()
        this.webRoutes = webRoutes
    }

    create(app){
        this._attachWebRoutes()
        this._attachApiRoutes()
        this._handlePageNotFound() // new
        app.use(this.router)
    }

	// new
    _handlePageNotFound(){
        this.router.all("*", (req, res) => {
            res.status(404).send("Page not found")
        })
    }

    _attachWebRoutes(){
        this._attachRoutes(this.webRoutes)
    }

	....

}

module.exports = new Router()
```


