const socket = io();

socket.emit('message', 'Hola mundo!');

socket.on('singleSocketResponse', (data) => {
    console.log(data);
});

socket.on('socketBroadcast', (data) => {
    console.log(data);
});