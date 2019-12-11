var socket = io.connect('https://chat-app99.herokuapp.com/')


var output = document.querySelector('#output')
var sender = document.querySelector('#sender')
var message = document.querySelector('#message')
var btn = document.querySelector('#send')
var feedback = document.querySelector('#feedback')

// Send button event listener
btn.addEventListener('click', function() {
    socket.emit('chat', {
        sender: sender.value,
        message: message.value
    })
    message.value = ''
})

// Typing... event listener
message.addEventListener('keydown', function() {
    socket.emit('typing', sender.value)
})

message.addEventListener('keyup', function() {
    // socket.emit('not-typing')
    setTimeout(function(){ 
        socket.emit('not-typing') }, 4000);
})


socket.on('chat', function(data) {
    feedback.innerHTML = ''
    output.innerHTML += `<p><strong> ${data.sender} : </strong> ${data.message}</p>`  
})

socket.on('typing', function(data) {
    feedback.innerHTML = `<p><em> ${data} </em> is typing a message...</p>`
})

socket.on('not-typing', function() {
    feedback.innerHTML = ``
})


