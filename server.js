const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import Routes
const pingRoute = require('./routes/ping');
const postsRoute = require('./routes/posts');

// Middlewares
app.use(bodyParser.json());
app.use('/api/ping', pingRoute);
app.use('/api/posts', postsRoute);

// Server Start on Port 3000
app.listen(3000, () => {
    console.log("Server started on Port 3000");
});

module.exports = app;