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

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`${socket.id} entrou na room ${room}`);
    });

    socket.on('disconnect', () => {
        connectedSockets.delete(socket.id);
        console.log(`Desconectou: ${socket.id} - total: ${connectedSockets.size}`);
    });
});

setInterval(() => {
    const totalUsers = connectedSockets.size;

    io.emit('dashboardData', {
        totalUsers,
        mostPopularRoom: null
    });
}, 1000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});