var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nsp = io.of('/my-room');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

// nsp.on('connection', (socket) => {
//   console.log('connected');
// });
// nsp.emit('hi', 'everyone!');
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
   io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnect');
  })
});



http.listen(3000, () => {console.log('listening on *:3000')});
