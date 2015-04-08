$(document).ready(function() {
	var socket = io.connect('http://104.236.250.114:8080');

	socket.on('entrance all', function(data) {
		var message = data.message;
		console.log(message + 'Screen.');

	})

	socket.on('serve screen 2', function(data) {
		console.log('serve screen 2 recieved');
		$('#content').html(data);
	})

	socket.on('serve screen 3', function(data) {
		console.log('serve screen 3 recieved');
		$('#content').html(data);
	})
})