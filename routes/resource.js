/*
 * Example Resource
 */

var mountPath;

// Index
// GET /resources
function index(req, res) {
  res.render('resource/index', {
    title: 'Resources'
  });
}

// Show
// GET /resources/:id
function show(req, res) {
  var id = req.params.id;
  res.render('resource/show', {
    title: 'Resources',
    id: id
  });
}

// New
// GET /resources/new
function init(req, res) {
  res.render('resource/init', {
    title: 'Resources',
    id: '',
    action: mountPath,
    method: 'POST'
  });
}

// Create
// POST /resources
function create(req, res) {
  // NOTE: actual creation of model instance goes here
  var id = req.body.id;
  res.redirect(mountPath + '/' + id);
}

// Edit
// GET /resources/:id/edit
function edit(req, res) {
  var id = req.params.id;
  res.render('resource/edit', {
    title: 'Resources',
    id: id,
    action: mountPath + '/' + id,
    method: 'PUT'
  });
}

// Update
// PUT /resources
function update(req, res) {
  // NOTE: actual updating of model instance goes here
  var id = req.body.id;
  res.redirect(mountPath + '/' + id);
}

// Delete
// DELETE /resources/:id
function destroy(req, res) {
  // NOTE: actual deletion of model instance goes here
  res.redirect(mountPath);
}

module.exports.mount = function(app, path) {
  mountPath = path;

  app.get(path, index);
  app.get(path + '/new', init);
  app.get(path + '/:id', show);
  app.get(path + '/:id/edit', edit);
  app.post(path, create);
  app.put(path + '/:id', update);
  app.delete(path + '/:id', destroy);
};
