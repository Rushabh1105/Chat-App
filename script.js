


const socket = io.connect('http://localhost:3400');

const userName = prompt('Please enter your name')
socket.emit('join', userName);


const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('message-list');
const sendButton = document.getElementById('send-message')


sendButton.addEventListener('click', function(){
    const message = messageInput.value;
    if(message){
        socket.emit('new-message', message);

        const messageElement = document.createElement('div');
        messageElement.innerText = userName+ " : " + message;
        messageList.appendChild(messageElement);
        messageInput.value = "";

    }
})


socket.on('load-messages', (messages) => {
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.innerText = new Date(message.timeStamp).toDateString() + " " + message.userName+ " : " + message.message;
        messageList.appendChild(messageElement);
    })
})


socket.on('broadcast-message', (userMessage) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = userMessage.userName+ " : " + userMessage.message;
    messageList.appendChild(messageElement);
})



