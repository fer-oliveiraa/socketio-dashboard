const socket = io();

// Dashboard
const totalEl = document.getElementById('total');
const popularEl = document.getElementById('popular');
const rankingEl = document.getElementById('ranking');

socket.on('dashboardData', (data) => {
  totalEl.textContent = data.totalUsers;
  popularEl.textContent = data.mostPopularRoom || '-';

  rankingEl.innerHTML = "";
  data.ranking.forEach((room) => {
    const li = document.createElement("li");
    li.textContent = `${room.room}: ${room.users} usuário(s)`;
    rankingEl.appendChild(li);
  });
});

// Entrar em room
const roomInput = document.getElementById('roomInput');
const joinBtn = document.getElementById('joinBtn');

joinBtn.addEventListener('click', () => {
  const roomName = roomInput.value.trim();
  if (roomName) {
    socket.emit('joinRoom', roomName);
    alert(`Você entrou na room: ${roomName}`);
    roomInput.value = "";
  }
});
