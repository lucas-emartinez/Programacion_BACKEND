const socket = io();

const message = document.getElementById('message');
let user;


Swal.fire({
    title: 'Bienvenido!',
    text: 'Ingresa tu correo electronico para comenzar a chatear',
    input: 'email',
    inputValidator: (value) => {
        if (!value) {
            return 'Debes ingresar tu correo!';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Debes ingresar un correo electrónico válido!';
        }
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value;
})

message.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (message.value.trim().length === 0) return Swal.fire('Error', 'Debes ingresar un mensaje', 'error');
        socket.emit('newMessage', { user, message: message.value });
        message.value = '';
    }
});

socket.on('messages', (messages) => {
    const messageLog = document.getElementById('messageLog');
    const rows = messages.map((data) => {
        return `
                <div>
                    <span class="messageHistory">${data.user}: ${data.message}</span>
                </div>
                `;
    });
    messageLog.innerHTML += rows.join("");
})

socket.on('messageCreated', (data) => {
    console.log(data)
    const messageLog = document.getElementById('messageLog');
    const row = `
                    <div>
                        <span class="messageHistory">${data.user}: ${data.message}</span>
                    </div>
                `;

    messageLog.innerHTML += row;
});