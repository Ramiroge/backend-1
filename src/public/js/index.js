const socket = io();

socket.emit('mensaje', 'saludos')