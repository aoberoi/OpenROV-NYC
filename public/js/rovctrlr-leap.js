/*
 * rovctrlr-leap.js
 *
 * Implementation for an OpenROV controller built on Leap Motion
 */

var LeapController = function(socket) {
  this.socket = socket;
}

LeapController.prototype.start = function() {
  console.log('leap controller start');
  Leap.loop({enableGestures: true}, this.runLoop);
}

LeapController.prototype.stop = function() {
}

LeapController.prototype.runLoop = function(frame) {
  this.nextCommands = {};

  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];
      this.detectThrottle(hand);
      this.detectLift(hand);
      this.detectYaw(hand);

      this.sendCommands();
    }
  }
}

LeapController.prototype.detectLift : function(hand) {
  if (hand.palmPosition[1] < 150) {
    this.nextCommands['lift'] = -1;
  } else if (hand.palmPosition[1] > 300) {
    this.nextCommands['lift'] = 1
  } else {
    this.nextCommands['lift'] = 0;
  }
  //if (this.nextCommands['lift'] != 0) {
  //  console.log(this.nextCommands['lift']);
  //}
  //console.dir(hand.palmPosition);
};

LeapController.prototype.detectThrottle : function(hand) {
  if (hand.palmNormal[2] < -0.5) {
    this.nextCommands['throttle'] = -1;
  } else if (hand.palmNormal[2] > 0.5) {
    this.nextCommands['throttle'] = 1
  } else {
    this.nextCommands['throttle'] = 0;
  }
  //if (this.nextCommands['throttle'] != 0) {
  //  console.log(this.nextCommands['throttle']);
  //}
  //console.dir(hand.palmNormal);
};

LeapController.prototype.detectYaw : function(hand) {
  if (hand.direction[0] < -0.4) {
    this.nextCommands['yaw'] = -1;
  } else if (hand.direction[0] > 0.4) {
    this.nextCommands['yaw'] = 1
  } else {
    this.nextCommands['yaw'] = 0;
  }
  //if (this.nextCommands['yaw'] != 0) {
  //  console.log(this.nextCommands['yaw']);
  //}
  //console.dir(hand.direction);
};

LeapController.prototype.sendCommands : function() {
  // TODO: understand the interval in which it last sent commands
  //console.log('next controls');
  //console.dir(leapController.nextCommands);
  if (this.nextCommands['lift'] != 0 || this.nextCommands['throttle'] != 0 || this.nextCommands['yaw'] != 0) {
    console.log(this.nextCommands);
  }
  this.socket.emit('control_update', this.nextCommands);
};

