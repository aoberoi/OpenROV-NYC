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
    if (this.nextCommands['lift'] != 0) {
      console.log(this.nextCommands['lift']);
    }
    //console.dir(hand.palmPosition);
  },

  detectThrottle : function(hand) {
    //console.log('palm normal');
    //console.dir(hand.palmNormal);
    //if (hand.palmPosition[1] < 150) {
    //  this.nextCommands['lift'] = -1;
    //} else if (hand.palmPosition[1] > 300) {
    //  this.nextCommands['lift'] = 1
    //} else {
    //  this.nextCommands['lift'] = 0;
    //}
  },

  detectYaw : function(hand) {
    //console.log('palm direction');
    //console.dir(hand.direction);
    //if (hand.palmPosition[1] < 150) {
    //  this.nextCommands['lift'] = -1;
    //} else if (hand.palmPosition[1] > 300) {
    //  this.nextCommands['lift'] = 1
    //} else {
    //  this.nextCommands['lift'] = 0;
    //}
  },

  sendCommands : function() {
    // TODO: understand the interval in which it last sent commands
    // TODO: send over leapController.nextCommands
    //console.log('next controls');
    //console.dir(leapController.nextCommands);
  }

};

OpenROV.controllers.push(leapController);
