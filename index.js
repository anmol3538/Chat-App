const express = require('express');
const app  = express();
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app);
const io = socketio(server)
io.on('connection', (socket) => {
    console.log('a new client connected', socket.id);
    socket.on('from_client', () => {
        console.log('event coming from client')
    })
    setInterval(() => {
        socket.emit('message Hello from server');
    }, 2000)
})
app.use('/', express.static(__dirname + '/public'));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})