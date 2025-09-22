# Painel em Tempo Real com Socket.IO

## Descrição
Este projeto é um **painel em tempo real**, atividade prática da matéria Tópicos Avançados em Desenvolvimento de Sistemas. Mostra informações sobre usuários conectados e rooms ativas usando **Node.js**, **Express** e **Socket.IO**.  
Os dados são atualizados a cada segundo, incluindo o **total de usuários**, a **room mais popular** e o **ranking das rooms**.

Esta atividade foi realizada como parte da matéria **Tópicos Avançados em Desenvolvimento de Sistemas (Optativa VI, Prof. André Luiz)**.

---

## Funcionalidades

- Atualização em tempo real do número de usuários conectados.
- Identificação da **room mais popular**.
- Exibição do **ranking das rooms** (mais cheia → menos cheia).
- Usuário pode **entrar em uma room** pelo frontend sem usar o console do navegador.
- Dashboard responsivo e estilizado.

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- HTML, CSS e JavaScript

---

## Como Executar

1. Clone o repositório:<br>

```
git clone https://github.com/fer-oliveiraa/socketio-dashboard.git
´´´

2. Instale as dependências:<br>

```
npm install express socket.io
´´´

3. Inicie o servidor:<br>
```
node server.js
´´´

4. Abra o navegador em:
```
http://localhost:3000
´´´



