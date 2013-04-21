/*
 * rovctrlr-leap.js
 *
 * Implementation for an OpenROV controller built on Leap Motion
 */

var leapController = {
  start: function() {
    console.log('leap chosen');
  }
};

OpenROV.controllers.push(leapController);
