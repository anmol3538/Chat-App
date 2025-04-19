var socket = io();

let startchat = document.getElementById('startchat');
let typing = false;
let typingid = 'none';
let btn = document.getElementById('btn')
let inputmsg = document.getElementById('newmsg')
let username = document.getElementById('username');
let msglist = document.getElementById('msglist')
let spantyping = document.getElementById('typing')
spantyping.style.display = 'none';
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

socket.on('someone typing', (data) => {
    spantyping.style.display = 'block';
    setTimeout(() => {
        if(typing) typing = false;
        spantyping.style.display = 'none'
    }, 2000)
})

inputmsg.addEventListener('keypress', function (e){
    typing = true;
    socket.emit('typing', {
        roomid : startchat.getAttribute('data-roomid'),

    })
})