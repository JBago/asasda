$(function () {
  var socket = io();
  $('#send').click(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  $('#changeRoom').click(function(){
    socket.emit('change room');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on('chat message bold', function(msg){
    var li = document.createElement('li');
    li.style.fontWeight = 'bold';
    li.style.color = '#0000AA';
    $('#messages').append($(li).text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
});