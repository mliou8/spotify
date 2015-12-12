var whiteboard = window.whiteboard;



// Never seen window.location before?
// This object describes the URL of the page we're on!
console.log(window.location.origin);
var socket = io(window.location.origin);
socket.on('connect', function () {
	console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function(){
	var args = [].slice.call(arguments);
	socket.emit('draw', args);
	// whiteboard.emit('draw')
});

socket.on('updateCanvas', function () {
	var args = Array.prototype.slice.call(arguments)[0];	//the trick was [0]!!!
	var start = args[0];
	var end = args[1];
	var color = args[2];
	console.log("start:" + JSON.stringify(start) + " end:" + JSON.stringify(end));
	whiteboard.draw(start, end, color, false);
})