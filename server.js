const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    // Oraal group-il join cheyyumbol
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        // Matte ellavareyum vivaram ariyakka
        socket.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId);
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
