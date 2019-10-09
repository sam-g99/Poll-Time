const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express(); // Define express app
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { server } = require('./config');
const database = require('./database');

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Routes
app.get('/', (req, res) => {
  res.send('You stumbled upon the Poll Time API');
});
app.use('/', require('./routes/polls'));

io.on('connection', socket => {
  socket.on('poll', data => {
    console.log(data);
    socket.join(data);
    // eslint-disable-next-line dot-notation
    const clients = io.sockets.adapter.rooms['test'].sockets;
    const numClients =
      typeof clients !== 'undefined' ? Object.keys(clients).length : 0;
    console.log(numClients);
    io.to('test').emit('reallyimportantupdate', numClients);
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
