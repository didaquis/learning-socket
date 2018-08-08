const socket = io();

socket.on('connect', () => {
	console.log('Connected with server through Socket.io');
});