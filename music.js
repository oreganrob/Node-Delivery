var io = require('socket.io').listen(8080);
var fs = require('fs');
var dl  = require('delivery');

function handler (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    res.end('Hello, world!');
}

io.configure('development', function() {
  io.set('log level', 1);

  //io.set('transports', [ 'websocket' ]);
});

io.sockets.on('connection', function (socket) {
    console.log('connection established');
	
	var delivery = dl.listen(socket);
	delivery.on('delivery.connect',function(delivery) {
		delivery.send({
			name: 'test.mp3',
			path : 'test.mp3'
		});

		delivery.on('send.success',function(file){
			console.log('File successfully sent to client!');
		});
	});

    /*var readStream = 
		fs.createReadStream("test.mp3", 
		 {'flags': 'r',
		  'encoding': 'binary', 
		  'mode': 0666, 
		  'bufferSize': 64 * 1024});
	
	readStream.on('data', function(data) {
        console.log(typeof data);
        console.log('sending chunk of data')
        socket.send(data);
    });

    socket.on('disconnect', function () {
        console.log('connection dropped');
    });*/
});

console.log('Server running at http://127.0.0.1:8080/');