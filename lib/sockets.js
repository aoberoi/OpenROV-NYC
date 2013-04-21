/*
 * Socket handlers
 */

var rovIsOnline = false;
var rovSocket;
var userSockets;

module.exports = function(socketServer) {
  socketServer.of('/rov').on('connection', function (socket) {
    if (rovSocket !== undefined) return;

    // Capture some state
    rovSocket = socket;
    rovIsOnline = true;

    // Send all ROV messages to all user sockets. Mostly need this for the images
    // Note: this depends on the proxy just sending us messages using .send and not socket.io specific events
    socket.on('message', function (msg) {
      userSockets.send(msg);
    });

    socket.on('disconnect', function() {
      rovIsOnline = false;
      rovSocket = undefined;
      userSockets.emit('rovIsOnline', rovIsOnline);
    });

  });

  userSockets = socketServer.of('/user').on('connection', function (socket) {
    // Propogate the state
    socket.emit('rovIsOnline', rovIsOnline);

    // Send all control updates from users to the ROV
    socket.on('control_update', function(msg) {
      if (rovIsOnline) {
        rovSocket.emit('control_update', msg);
      }
    });
  });
}
