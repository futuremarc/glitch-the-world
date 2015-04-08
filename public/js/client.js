$(document).ready(function() {

	var socket = io.connect('http://104.236.250.114:8080');
	var myID;

	socket.on('entrance all', function(data) {
		myID = data.id;
		message = data.message;
		console.log(message + 'Client ' + myID + '.');
	})

	socket.on('serve client 1', function() {
		console.log('serve client 1 recieved');
		scene1();
	})

	var scene1 = function() {
		if ($("#scene-1").is(":hidden")) {
			$("#scene-1").slideDown("slow");
			runScene1 = true;
		} else {
			$("#scene-1").slideUp("slow");
			runScene1 = false;
		}
	}

	var scene4 = function() {
		if ($("#scene-4").is(":hidden")) {
			$("#scene-4").slideDown("slow");
			runScene4 = true;
		} else {
			$("#scene-4").slideUp("slow");
			runScene4 = false;
		}
	}
	

	

})