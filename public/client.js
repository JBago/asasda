var socket = io();
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('bolded chat message', function(msg){
  var li = document.createElement('li');
  li.style.fontWeight = 'bold';
  $('#messages').append($(li).text(msg));
  window.scrollTo(0, document.body.scrollHeight);
});