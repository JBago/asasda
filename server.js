var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  var currentRoom = 'room1';
  socket.join(currentRoom);
  i;
  socket.on('chat message', function(msg){
    io.to(currentRoom).emit('chat message', msg);
    clearInterval(i);
    i;
  });
  socket.on('change room', function(){
    if(currentRoom=='room1'){
      socket.leave(currentRoom);
      io.to(currentRoom).emit('chat message bold', 'User ' + socket.id + ' left the room');
      currentRoom='room2';
      socket.join(currentRoom);
      socket.emit('chat message bold', 'Welcome to ' + currentRoom);
      socket.broadcast.to(currentRoom).emit('chat message bold', 'User ' + socket.id + ' joined the room');
    }
    else if(currentRoom=='room2'){
      socket.leave(currentRoom);
      io.to(currentRoom).emit('chat message bold', 'User ' + socket.id + ' left the room');
      currentRoom='room1';
      socket.join(currentRoom);
      socket.emit('chat message bold', 'Welcome to ' + currentRoom);
      socket.broadcast.to(currentRoom).emit('chat message bold', 'User ' + socket.id + ' joined the room');
    }
  });
  var i = setInterval(function(){
    socket.emit('chat message bold', 'You were kicked out due to inactivity!');
    socket.leave(currentRoom);
  }, 30000);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
