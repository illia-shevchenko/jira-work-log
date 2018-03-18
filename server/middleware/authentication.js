const { credentials } = require('../config');

module.exports.auth =
  () =>
    (context, next) => {
      if (context.session && context.session.username === credentials.username) {
        next();
        return;
      }

      context.status = 401;
      context.body = 'You have no access here';
    };
