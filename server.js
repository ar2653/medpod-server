const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

// Connection setup
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('audio-data', (data) => {
    console.log('Audio data received on server');
    socket.broadcast.emit('audio-data', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// start server on port
server.listen(5001, () => {
  console.log('Server listening on port 5001');
});
