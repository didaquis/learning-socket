const socket = io(); // eslint-disable-line no-undef

socket.on('connect', () => {
	console.log('Connected with server through Socket.io'); // eslint-disable-line no-console
});

socket.on('disconnect', () => {
	console.error('Connection with server through Socket.io has been lost'); // eslint-disable-line no-console
});


// Enviar contenido al backend (server)
socket.emit('firstMessage', {user: 'Anonymous', message: 'Hi!'} );

// Escuchar al backend (server)
socket.on('welcomeMessage', (data) => {
	console.log(data); // eslint-disable-line no-console
});