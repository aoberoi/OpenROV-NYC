var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

/*
 * Settings
 */
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/*
 * Middleware
 */
app.use(express.favicon()); // NOTE: before logger for brevity, add your own favicon
// Logging
app.use(express.logger( app.get('env') === 'development' ? 'dev' : 'default' ));
// Set up req.body
app.use(express.bodyParser());
app.use(express.methodOverride());
// Cookies
app.use(express.cookieParser('secret'));
app.use(express.session()); // NOTE: consider using secure cookie if served over tls
// Router
app.use(app.router);
// Static files
app.use(express.static(path.join(__dirname, 'public')));
// Error handling
app.configure('development', function(){
  app.use(express.errorHandler());
});

/*
 * Router
 */
var routes = require('./routes')(app);

/*
 * Server
 */
http.createServer(app).listen(app.get('port'), "127.0.0.1", function(){
  console.log("Express server listening on port " + app.get('port'));
});

/*
 * External interface
 */
module.exports = app;
