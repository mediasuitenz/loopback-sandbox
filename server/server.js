var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();


app.use(loopback.context());

app.use(function (req, res, next) {
  var ctx = loopback.getCurrentContext();
  ctx.set('user', { name: 'bob', group: 'MANAGER', department: 1 });
  next();
});

app.start = function() {
  // start the web server
  return app.listen(8000, function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
