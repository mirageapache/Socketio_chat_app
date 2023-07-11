const express = require('express');
const cors = require('cors');

const port = process.env.port || 3001;
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const io = new Server(app, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// 監聽-連線狀態
io.on('connection', (socket) => {
  console.log(socket.id);
});

// app.get('/', (req, res) => {
//   res.send('express server!');
// });

app.listen(port, () => {
  console.log('Express server running!');
});
