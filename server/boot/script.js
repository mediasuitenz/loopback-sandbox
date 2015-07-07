var loopback = require('loopback');

// Simplified
var roles = {
  MANAGER: 'MANAGER',
  EXEC: 'EXEC',
  OFFICER: 'OFFICER'
};

module.exports = function loadAdditionalScripts(app) {
  var Role = app.models.Role;

  Object.keys(roles).forEach(function (appRole) {
    Role.registerResolver(appRole, function(role, context, cb) {
      return cb(null, loopback.getCurrentContext().get('user').group === roles[appRole]);
    });
  });
};
