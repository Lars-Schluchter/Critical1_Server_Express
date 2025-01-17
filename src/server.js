import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});
/*
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
*/
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


io.on('connection', (socket) => {
  socket.on('diceRolled', (number) => {
    console.log(`Dice rolled: ${number}`);
    // Handle the received dice roll number as needed
    io.emit('diceRollBroadcast', number)
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

/*
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
*/
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});