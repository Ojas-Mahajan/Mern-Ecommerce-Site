require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

// Validate environment variables
if (!keys.port) {
  console.error(chalk.red('Error: PORT is not defined in your environment variables.'));
  process.exit(1);
}

const { port } = keys;
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

// Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(`Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`)}`
  );
});

// Setup socket.io
socket(server);
