var $debug = $('.debug');
function log(msg) {
  $debug.html( $debug.html() + '<p>' + msg + '</p>' );
}

var socket = io.connect('http://localhost:8080/rov');

socket.on('connect', function() {
  log('rov socket connected');
});
