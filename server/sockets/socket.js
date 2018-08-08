const { io } = require('../server');

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