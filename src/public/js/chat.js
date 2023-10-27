const socket = io('/chat');

// Variables
const message = document.getElementById('message');
let user;

// Pedido de email para continuar en el chat
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
    allowEscapeKey: false,
}).then(result => {
    user = result.value;
    socket.emit('newUser', user)
})

// Mensaje de conexion de terceros al chat
socket.on("newUserBroadcast", (user) => {
    Toastify({
      text: `${user} connected`,
      duration: 5000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  });

// Mensaje a enviar al chat
message.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
       if  (message.value.trim().length === 0) return Swal.fire('Error', 'Debes ingresar un mensaje', 'error');
        socket.emit('newMessage', { user, message: message.value });
        message.value = '';
    }
});

// Cuando llega un mensaje por socket lo agregamos al chat
socket.on('messageCreated', (data) => {
    const messageLog = document.getElementById('messageLog');
    const row = `
                    <div>
                        <span class="messageHistory">${data.user}: ${data.message}</span>
                    </div>
                `;

    messageLog.innerHTML += row;
     // Hacer scroll hacia abajo
     messageLog.scrollTop = messageLog.scrollHeight;

});

