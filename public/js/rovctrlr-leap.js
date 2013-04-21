/*
 * rovctrlr-leap.js
 *
 * Implementation for an OpenROV controller built on Leap Motion
 */

var leapController = {
  start: function(socket) {
   console.log('leap chosen');
   this.socket = socket;
   Leap.loop({enableGestures: true}, this.runLoop);
  },

  runLoop : function(frame) {
    //console.log('got a frame');

    leapController.nextCommands = {};

    if (frame.hands.length > 0) {
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        leapController.detectThrottle(hand);
        leapController.detectLift(hand);
        leapController.detectYaw(hand);

        leapController.sendCommands();
      }
    }
  },

  detectLift : function(hand) {
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
  },

  detectThrottle : function(hand) {
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
  },

  detectYaw : function(hand) {
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
  },

  sendCommands : function() {
    // TODO: understand the interval in which it last sent commands
    // TODO: send over leapController.nextCommands
    //console.log('next controls');
    //console.dir(leapController.nextCommands);
    if (this.nextCommands['lift'] != 0 || this.nextCommands['throttle'] != 0 || this.nextCommands['yaw'] != 0) {
      console.log(this.nextCommands);
    }
  }

};

OpenROV.controllers.push(leapController);
