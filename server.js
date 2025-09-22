const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const connectedSockets = new Set();

io.on('connection', (socket) => {
  connectedSockets.add(socket.id);
  console.log(`Conectou: ${socket.id} - total: ${connectedSockets.size}`);

  // Cliente pode entrar em uma room
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${socket.id} entrou na room ${room}`);
  });

  socket.on('disconnect', () => {
    connectedSockets.delete(socket.id);
    console.log(`Desconectou: ${socket.id} - total: ${connectedSockets.size}`);
  });
});

// Atualizar dashboard a cada 1 segundo
setInterval(() => {
  const totalUsers = connectedSockets.size;

  const rooms = io.sockets.adapter.rooms;
  const roomCounts = [];

  for (const [roomName, members] of rooms) {
    // Ignorar rooms internas (com o mesmo nome que socket.id)
    if (!io.sockets.sockets.get(roomName)) {
      roomCounts.push({ room: roomName, users: members.size });
    }
  }

  // Ordenar ranking (mais cheia → menos cheia)
  roomCounts.sort((a, b) => b.users - a.users);

  const mostPopularRoom = roomCounts.length > 0 ? roomCounts[0].room : null;

  io.emit('dashboardData', {
    totalUsers,
    mostPopularRoom,
    ranking: roomCounts
  });
}, 1000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
