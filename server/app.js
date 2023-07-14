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

const users = []; // 在線使用者

// socket 監聽-連線狀態
io.on('connection', (socket) => {
  const clientIp = socket.request.connection.remoteAddress;
  socket.emit('user_count', users.length); // 在線人數

  // 進入聊天室
  socket.on('login', (username) => {
    const duplicateUser = users.find((user) => user.username === username);
    if (username !== '' && duplicateUser === undefined) {
      const dt = new Date(Date.now());
      const date = `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`;
      const time = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
      users.push({
        id: socket.id, // 使用者id
        username, // 使用者名稱
        ip: clientIp, // 使用者ip位置
        fullDateTime: dt, // 時間
      });

      // 登入成功
      socket.emit('login_success', {
        id: socket.id, username, date, time,
      });

      // 發送(進入聊天室)廣播訊息
      io.sockets.emit('user_joined', {
        type: 'system', username, date, time, state: 'joined',
      });

      // 更新在線人數
      io.sockets.emit('user_count', users.length);

      // 記錄使用者登入
      console.log(
        `${username}(id= ${socket.id} / ip= ${clientIp})
         joined chat ${date} ${time}`,
      );
    } else {
      // 登入失敗
      socket.emit('login_failed', { err_msg: 'duplicate name' });
    }
  });

  // 離開聊天室
  socket.on('logout', ({ socketId, username }) => {
    const dt = new Date(Date.now());
    const date = `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`;
    const time = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
    // 發送(離開聊天室)廣播訊息
    io.sockets.emit('user_leaved', {
      type: 'system', username, date, time, state: 'leaved',
    });

    // 刪除user 資料
    users.forEach((user, index) => {
      if (user.id === socketId) {
        // 記錄使用者離開
        console.log(
          `${username}(id=${socketId}) leaving chat ${date} ${time}`,
        );
        users.splice(index, 1);
        // 更新在線人數
        io.sockets.emit('user_count', users.length);
      }
    });
  });

  // 傳送訊息
  socket.on('send_message', (data) => {
    io.sockets.emit('receive_message', data);
    console.log(data);
  });

  // 離線
  socket.on('disconnect', () => {
    users.forEach((user, index) => {
      if (user.id === socket.id) {
        const dt = new Date(Date.now());
        const date = `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()}`;
        const time = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
        // 發送(離開聊天室)廣播訊息
        io.sockets.emit('user_leaved', {
          type: 'system', username: user.username, date, time, state: 'leaved',
        });
        console.log(
          `${user.username}(id=${socket.id}) offline ${date} ${time}`,
        );
        users.splice(index, 1);
        // 更新在線人數
        io.sockets.emit('user_count', users.length);
      }
    });
  });
});

server.listen(port, () => {
  console.log('Express server running!');
});
