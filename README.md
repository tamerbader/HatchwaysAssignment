# Hatchways API

The contents of this repo contain the entire source code to the Hatchways Backend API assignment. Feel free to look around and get a feel for everything inside. I've tried my best to add comments to all the code and each section of the repo should have a detailed description on what it does and how.

### Different files and folders
- `package.json` contains all the properties of the application. It defines:
	-  Name/Author of the project
	- Dependencies the project requires
		> When you install a new dependency using the command `npm install {dependencyName}` it will automatically get added to dependencies section of the package.json
	- Configurations
	- Any scripts that you define 
		> Scripts can be run using the command format `npm run {script name}`
- `server.js` is the main starting point for the application. When you run npm start or npm run start it runs that file to launch the application. `server.js` does the following:
	- Creates a new express application
	- Sets up all the middleware
		>Middleware are extra pieces of code that you can pass into an express app to help it parse, validate, and handle requests to the server. 
	- Starts the server on Port 3000
- `routes` folder contains javascript files to handle specific api calls. This is a good practice because it  make the code cleaner and extensible instead of putting all the code into `server.js`. In this project for example:
	- Any network request with the endpoint of /api/ping{can be anything after this} will be directed to use the ping.js route handler.
	- Any network request with the endpoint /api/posts/{can be anything after this} will be directed to use the posts.js route handler.
- `services` folder contains additional functionality our project depends on. For example, in this hatchways project we need services to fetch from an outside API as well as services to help sort the data.
- `middleware` folder contains our own middleware functions that express will use to help validate, parse, and handle requests to the server. There's only one middleware function in there, `validateRequest`, which will validate if the user submitted a correctly formatted request. 
- `models` folder contains any data models the app will use. In this project we only ended up needing two, one to represent valid SortBy fields and one to represent valid Direction fields. 
- `__tests__` folder contains all of the unit tests we have defined. You can run all the unit tests by running `npm run test`. This will look at all the tests defined in that folder and run them and will print out a code coverage report.
### How to setup and run the application
1. You will need to install all the project dependencies by running `npm install`.
2. You can the project normally using the script `npm run start`. This will run your `server.js` file.
3. You can also run the project using the command `npm run nodemon`. Nodemon is a really cool tool that will restart your server anytime you save code in your project. This is great for testing and developing because you don't have to keep rerunning the project multiple times.
4. To run unit tests, you can use the command `npm run test`.

## Server.js
- Since `server.js` is in the root directory, I thought i would just add the notes here rather than making a new files for it. 

- `server.js` as mentioned before is the main entry point for the application. When the application is run either through `npm start` or `npm run start`, it really is just calling the command `node server.js` which runs the `server.js` file on your computer as if it were a server/browser.

### Importing Dependencies
- At the top of `server.js` you'll find a few const definitions with a  `require` call. Importing dependencies in javascript is done by defining a variable using the `require` command. The `require ` command can take in a directory to your own javascript file (ex. './routes/ping', we omit the .js as it's inferred) or the name of the npm module you install (ex. 'express').
- If you defined a function or additional functionality in a different javascript file you will also use the `require` statement to access the code inside there. This can be seen in lines 6&7 of `server.js` where we are importing the routes from our `ping.js` and `posts.js` files. 
### Registering Middleware's
- Middleware's in the simplest terms are functions that have access to the request and response object of a network request. They also help route the request to through a flow using the `next` function.
- For more detailed info on middlewares, you can checkout this [section](https://expressjs.com/en/guide/using-middleware.html#middleware.application) in express's website. 
- In express we can register middleware by calling `app.use()`. We can pass in two things: a route we specifically want this middleware to only run on and the middleware function. `app.use('route needed', 'middleware function');`
- So make this a bit more clear, here's how the flow works:
	1.  Your server receives a request from a client like postman.
	2.  Express takes the request object and creates a new response objects and looks to see who is the first middleware registered to handle this request. If you look at line 10 in `server.js` the first one is a middleware we installed from npm called bodyParser.
	3.  Express passes the request, response and a next function(the next middleware to run) to the bodyParser function. The bodyParser function does only 1 thing, it validates if the request passed in valid JSON data. 
	4. If it is valid the bodyParser function calls the next() method provided so that it can continue processing the request.
	5.  If the bodyParser can't validate the request, since it has access to the response object, it will send a response back to the client and not call next() which effectively stops the request from continuing to be processed. 
- This is such a powerful tool in the express framework because you can do a lot of validation of a request before it gets to the actual business logic. Think of an example like accessing an authenticated endpoint. Sayin in the case of posting a tweet. You need to be logged in in order to post a tweet. You can define a middleware function that looks at the request headers to see if there is a valid auth token or not and reject the request early before even getting anywhere near posting logic.
- Lines 11 & 12 say that after you are done with the bodyParser, use my own defines javascript router methods to handle requests with particular endpoints. Any request with endpoint '/api/ping' using the ping.js defined router. Any request with '/api/posts' use the posts.js defined router.
### Starting Server
In order to start the server on your desired port you must call `app.listen(PORT_NUMBER, callbackFunction)`;
- You will pass in your desired port number like 3000
- callback function is a function you want to run once the server is started. I defined my own that just prints out Server started.
### Module.exports
You will see this on the bottom of every js file in this project. In Node.js, everything is built as a module. So when. you call require to import a javascript file, it needs to know what you will be importing. You will set module.exports to functions or variables that you want other javascript files to be able to access to. In `server.js` i added a `module.exports = app` because my unit tests need access to the express app to test it.