/*
 * Global Routing
 */

function index(req, res) {
  res.render('index', { title : 'Express' });
}

module.exports = function(app) {
  app.get('/', index);

  // Mount a resource
  require('./resource').mount(app, '/resources');
};
