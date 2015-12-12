var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

var drawHistory = [];
var hostId;

io.on('connection', function (socket) {
    console.log('A new client has connected!');
    if(!hostId) {
		hostId = socket.id;
    	console.log("HostID: " + hostId);
	}

    //if new user: draw existing canvas:
    drawHistory.forEach(function(drawData){
	    socket.emit('updateCanvas', drawData);
    });

    console.log(socket.id);
    socket.on('disconnect', function () {
    	console.log(socket.id, ' user disconnected');
    	if (socket.id === hostId) {
    		console.log("Host has disconnected. Cleaning the desk");
    		drawHistory = [];
    		hostId = null;
    	}
    });
    socket.on('draw', function (drawData) {
    	drawHistory.push(drawData);
    	console.log(drawData)
    	socket.broadcast.emit('updateCanvas', drawData);
    })

});


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

