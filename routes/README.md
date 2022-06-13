# Routing
Routing is a fundamental framework in express. To be honest express is a pretty light framework. All it really does is help you setup a server to listen to a specific port, and then provide you with an API to define functions to help route a network request across your desired flow. 

In express there is an object called the Router which essentially is an object that you can use to create handlers to process a specific request type. Let take the following as an example:

- You want to allow your server to respond to GET requests at the endpoint 'api/posts'.
	- In yours posts.js file you would first import the Express router using: 
	`const router = require('express').Router();`
	- Define a handler for a get request using your router like this:
	`router.get('/api/posts', (req, res) => {
			console.log('We are handling GET Request)	});`
- You would then just put your business logic handling that request inside the curly brace of the function you just defined. 
- Some things to note. The first parameter in the get function call is the route. You may notice in `posts.js` or `ping.js` that we left that as an empty string. The reason why is because in our `server.js` we defined the route '/api/ping' and 'api/post' in the middleware. So when the router reaches to posts.js it already has that route and you don't need to add anything additional. To make this even more clear, say in `posts.js` we wanted to define a Get request for `/api/posts/research`, then inside router.get we would pass in `/research`. 
- You may also see that in our router.get we passed in `validateRequest` as the second parameter. This is actually telling the router that we have a middlware we'd like to use before we get to the next function where we actually handle the posts requests. This will call upon `validateRequests.js` which will verify if the request is valid or not and will only go to the next function we defined if it is valid.
- Lastly, the last thing we pass in is a middleware function that will be called after 	`validateRequest`. Remember that middleware functions have access to request and response objects so you can read and even write new values to those objects. 
- At the bottom, the last thing we need to do is define module.exports to be our router. 

## Posts.js
I'll try to quickly go through what the code in `posts.js` does but hopefully the above section has made it easier to understand. 

- At the top we make all of our import such as Express Router, our own defined middleware function called `validateRequest`, as well as our own defined service functions that we'll use to make network calls and to sort the response.
- We call `router.get(' ', validateRequest, async (req, res) => {});` to tell the router we would like to handle GET requests at `api/posts` and that we'd like to run the `validateRequest`middleware function before we go any further and that you should perform this next function if that completes successfully.
- Inside our own defined request handler we do a few things:
	1. We extract the query parameters that were passed in. Query parameters look like this in a url ?tags=health&sortBy=reads&direction=asc. They allow us to specify certain parameters when querying the server. These all can be accessed in side the requests object inside the query object. So: `req.query`. Here's how the objects is structured:
	`request = { query: { tags: health, sortBy=reads, direction=asc}} `
- One thing to be mindful of is that the `validateRequest` middleware will set default values to the sortBy and direction query parameters if the user doesn't provide them. So when they reach here, they'll always have a value.
- Once we have all the tags, it calls on the `FetchPostsService` to fetch all the posts with matching tags
- Once that returns with all the posts, it then calls on the `SortPostsService` to sort all the posts based on the sortBy and direction query parameters.
- That will return with all the sorted posts and can be sent back to the client with a 200 Status and the json object of the posts results.
- You may be wondering what is this `async` and `await` keywords i'm seeing. This has to do with handling asynchronous tasks that don't finish immediately like sending a network request in the `FetchPostsService`. If your function has this kind of asynchronous task, you can use the keyword `await` to wait for the results to come back and then continue with the rest of the code. In order to use `await` you must define your function as asynchronous by putting the keyword `async` in front of the function definition.
