const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuration
const config = require('config');

const environment = config.get('environment');
const serverPort = config.get('server.port');
const mongoConn = config.get('mongoDB.url');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const postRoutes = require('./routes/posts');
const authorRoutes = require('./routes/authors');
const userRoutes = require('./routes/users');

app.use('/posts', postRoutes);
app.use('/authors', authorRoutes);
app.use('/users', userRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('This is the main route');
});

// Connect to DB
mongoose.set('useCreateIndex', true); // to avoid warning with unique

mongoose.connect(mongoConn, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
    if (environment !== "TEST") {
        console.log('- DB connected');
    }
});

// Run the server
app.listen(serverPort, () => {
    if (environment !== "TEST") {
        console.log(`- SERVER port: ${serverPort}`);
    }
});

module.exports = app; // For testing
