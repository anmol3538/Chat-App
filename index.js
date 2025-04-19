const express = require('express');
const app  = express();
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app);
const io = socketio(server)
const connect = require('./config/database-config')
const Chat = require('./models/chat')
io.on('connection', (socket) => {
    console.log('a new client connected', socket.id);

    socket.on('join_room', (data) => {
        socket.join(data.roomid);
    })

    socket.on('msg_send', async (data) => {
        console.log(data);
        const chat = await Chat.create({
            roomid: data.roomid,
            user: data.username,
            content: data.msg
        })
        io.to(data.roomid).emit('msg_received', data);
    })


})
app.set('view engine', 'ejs')

app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomid', async (req, res)=> {
    const chats = await Chat.find({
        roomid: req.params.roomid
    }).select('content user');
    res.render('index', {
        name: 'Anmol',
        roomid: req.params.roomid,
        chats: chats
    });
})




server.listen(3000, async () => {
    console.log('Server is running on port 3000');
    await connect();
    console.log("mongodb connect");
})