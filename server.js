var io = require('socket.io'),
	connect = require('connect'),
	app = connect().use(connect.static('public')).listen(8080),
	room = io.listen(app);

var ID = 0;

room.sockets.on('connection', function(socket) {

	socket.emit('entrance all', {
		message: 'Welcome to Glitch the World, ',
		id: ID
	});
	ID++;
	
	socket.on('action 1', function(){
		console.log('action 1 recieved');
		room.sockets.emit('serve client 1');
		
	})

	socket.on('action 2', function(){
		console.log('action 2 recieved');

		var s_msg = "<video autoplay><source src='./assets/scene_two.mp4' type='video/mp4'></video>";
		room.sockets.emit('serve screen 2', s_msg);
	})

	socket.on('action 3', function(){
		console.log('action 3 recieved');

		var s_msg = "<video autoplay><source src='./assets/scene_three.mp4' type='video/mp4'></video>";
		room.sockets.emit('serve screen 3', s_msg);
	})

	socket.on('action 4', function(){
		console.log('action 4 recieved');
		room.sockets.emit('serve client 4');
	})

})