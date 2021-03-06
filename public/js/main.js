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
    self.socket = io.connect('http://' + config.socketHost + ':' + config.socketPort);
    self.socket.on('rovIsOnline', self.rovPresence);
    self.socket.on('connect', self.connected);
    self.socket.on('disconnect', self.disconnected);
    self.socket.on('videoStarted', function(data) {
      console.log(config)
      var address = 'http://' + config.socketHost + ':' + CONFIG.video_port + '/?action=stream';
        $('#video').attr('src', address);
      console.log('video enabled');
    });

    self.chooseController();
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

  self.chooseController = function () {
    $('.ctrl-choose button').click(self.controllerChosen);
    $('.ctrl-choose').show();
  }

  self.controllerChosen = function(e) {
    var $target = $(e.target);
    if ($target.hasClass('leap')) {
      self.controller = new LeapController(self.socket);
    } else if ($target.hasClass('keyboard')) {
      self.controller = new KeyboardController(self.socket);
    }
    $('.ctrl-choose').hide();
    self.controller.start();
  }

  return self;
}());

OpenROV.start();
