const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public' );
const port = process.env.PORT || 3000;
console.log(__dirname + '/../public');
console.log(publicPath);

//create a new express app
var app = express();
var server = http.createServer(app);
//what we get back is our web socket server, in here we can do anything
//we want such as emiting or listening to events, this is how we are going to comminicate with server
//and client
var io = socketIO(server);

//middleware
app.use(express.static(publicPath));

//io.on lets u register an event listener and do
//something when that event happens
//built in event = connection : lets u listen to a new connection
/*
meaning a client connects to the server adn then do somethign when that connection comes in
every time a user gets connected we are going to log connected
*/

/*web sockets are persistent technology menaing that the cleint and the server
keep the connection opn for as long as both of them want to
*/


io.on('connection', (socket)=>{
console.log('New user connected');

//we are going to use emit method on both cleint and server to emit events
//emit= creating events


//emit event from server
// socket.emit('newMessage', {
// from : "rizwan@gmail.com",
// text: "Hey, how are you?",
// creatdAt: 1200
//
// });

//event listener  that is going to listen the event from the client
//socket.io emits only to one connection
// socket.on('createEmail', (newEmail)=>{
//   console.log('createEmail', newEmail);
// });


socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined '));


//event listener that is going to listen to the event from the client
socket.on('createMessage', (message,callback)=>{
  console.log('createMessage', message);
//io.emit emits to all connection, multiple tabs in browser
io.emit('newMessage',  generateMessage(message.from, message.text));
callback('This is from the server');
//socket.broadcast only emits to the other tabs and not on the tab it was generated from
// socket.broadcast.emit('newMessage', {
// from : message.from,
// text: message.text,
// createdAt : new Date().getTime()
// });
});




socket.on('disconnect', function(){
  console.log('Disconnected');
});

});

//we call app.lister
server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
