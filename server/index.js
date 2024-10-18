require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

const { port } = keys;
const app = express();

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helmet for securing HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,  // Disable CSP if necessary, use with caution
    frameguard: { action: 'deny' },  // Prevent clickjacking
  })
);

// Enable CORS for cross-origin requests
app.use(cors());

// Set up the database
setupDB();

// Passport configuration for authentication
require('./config/passport')(app);

// Use the defined routes
app.use(routes);

// Start the server
const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Server is running on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

// Set up WebSocket or Socket.io functionality
socket(server);

