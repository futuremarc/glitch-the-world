$(document).ready(function() {
	var socket = io.connect('http://104.236.250.114:8080');

	socket.on('entrance all', function(data) {
		message = data.message;
		console.log(message + 'Master.');

	})

	nx.onload = function() {
		toggle1.on('*', function(data) {
			console.log('pressed 1');
			socket.emit('action 1');
		})

		toggle2.on('*', function(data) {
			console.log('pressed 2');
            socket.emit('action 2');

		})

		toggle3.on('*', function(data) {
			console.log('pressed 3');
			socket.emit('action 3');
		})

		toggle4.on('*', function(data) {
			console.log('pressed 4');
			socket.emit('action 4');
		})

	}
});