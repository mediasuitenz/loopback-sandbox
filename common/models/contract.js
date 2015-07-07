'use strict';

var loopback = require('loopback');

module.exports = function (Contract) {

  Contract.observe('access', function restrictGroup(ctx, next) {
    var user = loopback.getCurrentContext().get('user');

    console.log('USER IS IN GROUP:', user.group);
    if (user.group !== 'MANAGER') {
      var err = new Error();
      err.status = 401;
      err.message = 'Unauthorized';
      return next(err);
    }
    next();
  });

  Contract.observe('access', function limitDepartment(ctx, next) {
    var user = loopback.getCurrentContext().get('user');

    console.log('USER IS IN DEPT:', user.department);
    // Apply access filters
    // [SNIP]

    next();
  });
};
