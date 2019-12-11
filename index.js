var express = require('express')
var socket = require('socket.io')

var app = express()

var server = app.listen(4000, function() {
    console.log('server running successfully')
})

app.use(express.static('public'))

var io = socket(server)

io.on('connection', function(socket) {
    console.log('the socket is now ready to run with id : ', socket.id)

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data)
    })

    socket.on('typing',function(data) {
        socket.broadcast.emit('typing', data)
    })

    socket.on('not-typing',function() {
        socket.broadcast.emit('not-typing')
    })
})