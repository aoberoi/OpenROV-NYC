/*
 * main.js
 *
 * Bootstraps the application
 */

OpenROV.start = function() {
  // TODO: connect to socket server for controller communications
  // TODO: another socket connection for video frame updates

  // HACK
  this.controllerChosen(0);
};

OpenROV.chooseController = function() {
  for (var i = 0; i < OpenROV.controllers.length; i++) {
    // TODO: add buttons to a UI dialog that lets user choose a controller, call controllerChosen with i as param
  }
};

OpenROV.controllerChosen = function(i) {
  OpenROV.controllers[i].start();
};

OpenROV.start();
