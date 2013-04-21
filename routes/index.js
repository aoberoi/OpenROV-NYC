/*
 * Global Routing
 */

function index(req, res) {
  res.render('index', { title : 'Express', description: '' });
}

function control(req, res) {
  res.render('control', { title: 'OpenROV Remote Control', description: '' });
}

module.exports = function(app) {
  app.get('/', index);

  app.get('/control', control);

  // Mount a resource
  require('./resource').mount(app, '/resources');
};
