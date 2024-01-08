
## Introduction

A huge portion of the internet's data travels over HTTP/HTTPS through request-response cycles between client and servers. Every time that you use a website, your browser sends requests to one or many servers requesting resources. Every image, meme, post, and video is requested by a client and sent in a response from a server.

Express is a powerful but flexible JavaScript framework for creating web servers and APIs. It can be user for everything from simple file servers to JSON APIs to full production servers.

In this lesson, You will be learning all the necessary skills to implement an API allowing clients to Create, Read, Update and Delete Expressions. These four functionalities together are known as CRUD, and they form the backbone of many real-life APIs. 

## Starting a Server

Express is a node module, so in order to use it, we will need to import it in our program file. To create a server, the imported `express` function must be invoked. 

```js
// import the express module
const express = require("express")
// create an instance of an Express application
const app = express()
```

On the first line, we import the Express library with `require`. When invoked on the second line, it returns an instance of an Express application. This application can be used to start a server and specify server behavior.   

The purpose of a server is to listen for requests, perform whatever action is required to satisfy the request, and then return a response. 

In order for our server to start responding, we have to tell the server where to *listen* for new requests by providing a port number argument to a method called `app.listen()`. The server will then listen on the specified `port` and respond to any requests that come into it.

The second argument is a callback function that will be called once the server is running and ready to receive responses.

```js
const PORT = 4001
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
```

In this example, our `app.listen()` call will start a server listening on port `4001`, and once the server is started it will log `'Server is listening on port 4001'`

## Writing Your First Route

Once the Express server is listening, it can respond to any and all requests. But how does it know what to do with these requests? To tell our server how to deal with any given request, we register a series of *routes*. Routes define the control flow for requests based on the request's *path* and HTTP verb.

For example, if your server receives a GET request at `/monsters`, we will use a route to define the appropriate functionality for that HTTP verb (GET) and path (`monsters`).

The HTTP verb is always included in the request, and it is one of a finite number of options used to specify expected functionality. GET requests are used for retrieving resources from a server, and we will discuss additional request types in later exercises.

Express uses `app.get()` to register routes to match `GET` requests. Express routes (including `app.get()`) usually take two arguments, a path (usually a string), and a callback function to handle the request and send a response.

```js
const moods = [
	{mood : 'excited about express!'},
	{mood : 'route-tastic'}
]

app.get("/moods", (req, res, next) => {
	// Here we would send back the moods array in response
})
```

The route above will match any `GET` request to `'/moods'` and call the callback function, passing in two objects as the first two arguments. These objects represent the request sent to the server and the response that the Express server should eventually send to the client.

If no routes are matched on a client request, the Express server will handle sending a 404 Not Found response to the client.

## Sending a Response

HTTP follows a one request-one response cycle. Each client expects exactly one response per request, and each server should only send a single response back to the client per request. The client is like a customer at a restaurent ordering a large bowl of cup: the request is sent through the wait staff, the kithcen prepares the soup, and after it is prepared, the wait staff returns it to the customer. In the restaurent, it would be unfortunate if the soup never arrived back to the customer, but it would be equally problematic if the customer was given four large bowls of soup and was asked to consume them all at the exact time. That's impossible with only two hands!

Express servers send responses using the `.send()` method on the response object. `.send()` will take any input and include it into the response body.

```js
const monsters = [
	{...},
	{...}
]
app.get("/monsters", () => {
	res.send(monsters)
})
```

In this example, a `GET /monsters` request will match the route, Express will call the callback function, and the `res.send()` method will send back an erray of spooky monsters.

In addition to `.send()`, `.json()` can be used to explicitly send JSON-formatted responses. `.json()` sends any Javascript object passed into it. 






