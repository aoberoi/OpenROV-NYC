/*
 * main.js
 *
 * Bootstraps the application
 */

var OpenROV = (function() {
  var self = {},
      isRovOnline = false;

  self.start = function() {
    // connect to socket server for controller communications, assign to this.ctrlSocket
    self.socket = io.connect('http://' + config.socketHost + ':' + config.socketPort + '/user');
    self.socket.on('rovIsOnline', self.rovPresence);
    self.socket.on('connect', self.connected);
    self.socket.on('disconnect', self.disconnected);
  };

  self.rovPresence = function(state) {
    if (state && !this.isRovOnline) {
      this.controller.start();
    } else if (!state && this.isRovOnline) {
      this.controller.stop();
    }
    this.isRovOnline = state;
  };

  self.connected = function () {
    if (self.controller) {
      self.controller.start();
    }
  }

  self.disconnected = function () {
    if (self.controller) {
      self.controller.stop();
    }
  }

  return OpenROV;
)());
