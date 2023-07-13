const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const port = process.env.port || 3001;

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  // 設定cors(指定允許的來源及方法)
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// const users = []; // 在線使用者
// const messageList = [] // 訊息內容串

// socket 監聽-連線狀態
io.on('connection', (socket) => {
  // console.log(`User ${socket.id} connected!`);

  // 進入聊天室
  socket.on('login', (data) => {
    // socket.join('room_lobby');
    console.log(`${data.username}(id=${socket.id}) is joined `);
  });

  // 離開聊天室
  socket.on('logout', (data) => {
    console.log(`${data.username}(id=${socket.id}) leaving the chat`);
  });

  // 傳送訊息
  socket.on('send_message', (data) => {
    // socket.to('room_lobby').emit('receive_message', data);
    io.sockets.emit('receive_message', data);
    console.log(data);
  });

  // 離線
  socket.on('disconnect', () => {
    // console.log(`User ${socket.id} discronnected!`);
  });
});

server.listen(port, () => {
  console.log('Express server running!');
});
