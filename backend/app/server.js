const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { server } = require('./config');
const database = require('./database');

// Define express app
const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Routes
app.get('/', (req, res) => {
  res.send('Poll Time API');
});
app.use('/', require('./routes/polls'));

// Start server
database.sync().then(() => {
  app.listen(server.port, () => {
    console.log(`Api is running on port ${server.port}`);
  });
});
