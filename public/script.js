var socket = io();

let startchat = document.getElementById('startchat');

let btn = document.getElementById('btn')
let inputmsg = document.getElementById('newmsg')
let username = document.getElementById('username');
let msglist = document.getElementById('msglist')

    socket.emit('join_room', {
        roomid: startchat.getAttribute('data-roomid')
    })


btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg : inputmsg.value,
        username : username.value,
        roomid: startchat.getAttribute('data-roomid')
    })
}

socket.on('msg_received', (data) => {
    let limsg = document.createElement('li')
    console.log(limsg);
    limsg.innerText = `${data.username}: ${data.msg}`;
    msglist.appendChild(limsg);
})