//method is available becoz we loaded socket.io
//initiating the request from the clent to the server
//open up a websocket and keep it open
var socket = io();

/*listen for connectin, instead of connected it will be connect
socket.on is for listening to a new event
*/
socket.on('connect', function (){
  console.log('connected to Server');

/*emit the createEmail so that server can catch it */
//   socket.emit('createEmail', {
//   to : 'rizwanrenesa@gmail.com',
//   text: 'Hey. this is andrew'
//   });
//
// /* emit the createMessage from the client to the server  */
//  socket.emit('createMessage', {
//    to : 'sazzat@gmail.com',
//    text: 'Hey, this is sazzat'
//  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from servr');
});

//creating a custom event newEmail
//this is going to print New Email in the console every time a new wmail comes to the pipeline
// socket.on('newEmail', function(email){
// console.log('New Email', email);
// })
//
//listening to the message from the server to the client
socket.on('newMessage', function(message){
console.log('newMessage', message);
var li = jQuery('<li></li>');
li.text(`${message.from}: ${message.text}`);

jQuery('#messages').append(li);
});

// /* foal here is to send acknowledgement from the server back to the cleint that we got the data*/
// //data is the  arguement in the callback fucntion
// socket.emit('createMessage', {
// from : 'Frank',
// text : 'Hi'
// }, function(data){
//   console.log('Got it',data);
// });


jQuery('#message-form').on('submit', function(e){
//preventing the default behavior of the submit form
e.preventDefault();
//instead do the socket.emits
socket.emit('createMessage',{
 from : 'User',
 //name=message is the name of the input text
 text: jQuery('[name=message]').val()
}, function(){

});


})
