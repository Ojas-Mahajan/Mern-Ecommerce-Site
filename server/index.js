// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

// Import configuration and utility modules
const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

// Destructure the port from keys
const { port } = keys;

// Initialize the Express application
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false, frameguard: true }));
app.use(cors());

// Database setup
setupDB();

// Passport configuration
require('./config/passport')(app);

// Set up routes
app.use(routes);

// Start the server
const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(`Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`)}`
  );
});

// Initialize socket connections
socket(server);
