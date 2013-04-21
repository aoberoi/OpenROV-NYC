/*
 * rovctrlr-keyboard.js
 *
 * Implementation for an OpenROV controller on a keyboard
 */

function KeyboardController(socket) {
  this.socket = socket;
}

KeyboardController.prototype.start = function() {
  console.log('keyboard chosen');
}

