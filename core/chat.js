const socket = io();

// Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let buttonSend = document.getElementById('send-button');
let messageWindow = document.getElementById('messages-window');
let actions = document.getElementById('actions');

buttonSend.addEventListener('click', () => {
    if (username.value == '' || message.value == '') {
        alert("Please insert data");
    }else{
    socket.emit('chat-message', {
        username: username.value,
        message: message.value
    });
}
});

socket.on('chat-message', data => {
    actions.innerHTML = '',
    messageWindow.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});


message.addEventListener('keypress', () => {
    socket.emit('chat-typing', username.value);
});

socket.on('chat-typing', data => {
    actions.innerHTML = `<p> <em>${data} it's typing...</em></p>`;
});
