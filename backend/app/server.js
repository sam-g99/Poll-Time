const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const slowDown = require('express-slow-down');

const app = express(); // Define express app
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { server } = require('./config');
const database = require('./database');

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100,
  delayMs: 500
});

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(speedLimiter);
app.io = io;

// Routes
app.get('/', (req, res) => {
  res.send('You stumbled upon the Poll Time API');
});
app.use('/', require('./routes/polls'));

const Poll = require('./database/models/poll');
const Vote = require('./database/models/vote');

io.on('connection', socket => {
  socket.on('poll', async pollId => {
    const pollQuery = await Poll.findOne({
      where: { pollId }
    });
    const resultQuery = await Vote.findAll({
      where: { pollId }
    });
    const { question, options } = pollQuery;
    const results = [];
    // Setting up array
    options.forEach(() => {
      results.push(0);
    });
    // Counting the votes
    resultQuery.forEach(vote => {
      results[vote.chose] += 1;
    });
    const pollData = {
      question,
      options,
      results
    };
    socket.join(pollId);
    socket.emit('pollData', pollData);
    // eslint-disable-next-line dot-notation
  });

  console.log('a user is connected');
});
// Start server
database
  .sync()
  .then(() => {
    http.listen(server.port, () => {
      console.log(`Api is running on port ${server.port}`);
    });
  })
  .catch(error => console.log(error));
