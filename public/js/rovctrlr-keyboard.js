/*
 * rovctrlr-keyboard.js
 *
 * Implementation for an OpenROV controller on a keyboard
 */

var keyboardController = {
  start: function() {
    console.log('keyboard chosen');
  }
};

OpenROV.controllers.push(keyboardController);

