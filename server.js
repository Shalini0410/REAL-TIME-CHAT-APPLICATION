const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors({
  origin: "http://localhost:3002", // frontend port
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002", // frontend port
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User Connected');

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });
});

server.listen(5001, () => {
  console.log('Server running on port 5001');
});