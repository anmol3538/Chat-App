const mongoose = require("mongoose")

const chatschema = new mongoose.Schema({
    content : {
        type: String, 
    },
    user: {
        type: String, 
    },
    roomid : {
        type: String,
    }
})

const Chat = mongoose.model('Chat', chatschema)
module.exports =Chat;