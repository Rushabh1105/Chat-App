import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import { connect } from './config.js';
import { ChatModel } from './chat.schma.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log('connection is established');

    socket.on('join', (data) => {
        socket.userName = data;
        // Send old messages to clients

        ChatModel.find()
            .sort({timeStamp: 1})
            .limit(50)
            .then(messages => {
                socket.emit('load-messages', messages)
            })
            .catch(err => {
                console.log(err)
            })
        ;
    })
    socket.on('new-message', (message) => {
        let userMessage = {
            userName: socket.userName,
            message: message,
        }
        
        const newChat = new ChatModel({
            userName: socket.userName,
            message: message, 
            timeStamp: new Date()
        });
        newChat.save();
        socket.broadcast.emit('broadcast-message', userMessage);
    })

    socket.on('disconnect', () => {
        console.log('connection is disconected');
    })
});

server.listen(3400, async () => {
    await connect();
    console.log('server started on port')
})
