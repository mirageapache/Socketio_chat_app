const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const port = process.env.port || 3001;

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// 監聽-連線狀態
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected!`);

  socket.on('dissconnect', () => {
    console.log(`User ${socket.id} discronnected!`);
  });
});

// app.get('/', (req, res) => {
//   res.send('express server!');
// });

app.listen(port, () => {
  console.log('Express server running!');
});
