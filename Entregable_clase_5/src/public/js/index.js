const socket = io();

socket.emit('message', 'Hola mundo!');