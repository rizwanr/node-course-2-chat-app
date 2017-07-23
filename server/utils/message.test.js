//in order to get assections, you need expect
var expect = require('expect');

//load in the module we are testig
var {generateMessage} = require('./message');
//generateMessage is a function
describe ('generateMessage' , ()=>{
 it('should generate the correct message object', () =>{
 //we are testing the object that comes out of the generaMessage function
 //we create two variables that store the two values we are checking against
 var from = 'Admin';
 var text = 'Welcome to the chat app';
 //now we are going to make the final variable that is going to store the response
//to come from the generaMessage function
 var  message = generateMessage(from, text);
 //final thing that we do is we make assertion about the object that returns

 expect(message.createdAt).toBeA('number');
 expect(message).toInclude({
   from : from,
   test: test,
 });
});
});
