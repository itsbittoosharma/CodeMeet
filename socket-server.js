'use strict';

var socketIO = require('socket.io');
var ot = require('ot');
const task = require('./models/task');
var roomList = {};

module.exports = function(server) {

  var str = '//You can write your code here \n\n'
  +'var welcome_Msg="Hello World";';

  var io = socketIO(server);
  io.on('connection', function(socket) {
    socket.on('joinRoom', function(data) {
      if (!roomList[data.room]) {
        var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb) {
          
var self=this;
task.findByIdAndUpdate(data.room,{content:self.document},function(err){
  if(err) return cb(false);
  cb(true);
});


        });
        roomList[data.room] = socketIOServer;
      }
      roomList[data.room].addClient(socket);
      roomList[data.room].setName(socket, data.username);

      socket.room = data.room;
      socket.join(data.room);
    });

    socket.on('chatMessage', function(data) {
      io.to(socket.room).emit('chatMessage', data);
    });

    socket.on('disconnect', function() {
      socket.leave(socket.room);
    });
  })
}
