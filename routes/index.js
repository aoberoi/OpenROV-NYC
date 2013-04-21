/*
 * Global Routing
 */

function index(req, res) {
  res.render('index', { title : 'Express', description: '' });
}

function robots(req, res) {
  res.render('robots', {
    title: 'OpenROV Remote Control',
    description: '',
    socketHost: 'localhost',
    socketPort: '8080'
  });
}

function mockrov(req, res) {
  res.render('mockrov', { title: 'Mock ROV', description: '' });
}

module.exports = function(app) {
  app.get('/', index);

  app.get('/robots', robots);

  app.get('/mockrov', mockrov);

  // Mount a resource
  require('./resource').mount(app, '/resources');
};
