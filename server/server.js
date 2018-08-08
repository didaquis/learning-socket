const socketIO = require('socket.io');

const http = require('http');

const express = require('express');
const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


let io = socketIO(server);

io.on('connection', (client) => {
	console.log('Client has connected'); // eslint-disable-line no-console

	client.on('disconnect', () => {
		console.log('Client has disconnected'); // eslint-disable-line no-console
	});

	// Escuchando al frontend (cliente)
	client.on('firstMessage', (data, cb) =>{
		console.log('firstMessage received from client: ', data); // eslint-disable-line no-console

		if (data.user && data.message) {
			cb( {status: 'success'} ); // ejecutamos el callback definido en el lado del cliente, podemos pasarle argumentos
		} else {
			cb( {status: 'failure'} );
		}
	});

	// Mandando contenido al frontend (cliente)
	client.emit('welcomeMessage', {user: 'Server', message: 'Welcome!'});
});


server.listen(port, (err) => {
	if (err) {
		throw new Error(err);
	}
	console.log(`Servidor corriendo en puerto: ${ port }`); // eslint-disable-line no-console
});