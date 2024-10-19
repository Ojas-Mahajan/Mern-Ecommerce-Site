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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: true
}));
app.use(cors());

// Database setup
setupDB();

// Passport configuration
require('./config/passport')(app);

// Routes
app.use(routes);

// Start the server
const server = app.listen(port, () => {
    console.log(
        `${chalk.green('✓')} ${chalk.blue(`Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`)}`
    );
});

// Initialize socket
socket(server);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
