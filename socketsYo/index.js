var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res, next) {
		res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket) {
		console.log('a user connected');
		socket.on('disconnect', function() {
				console.log('a user disconnected');
		});
		socket.on('chat message', function(message) {
				console.log(message);
				io.emit('chat message', message);
		});
});

http.listen(3000, function() {
		console.log('listening on port 3000');
});
