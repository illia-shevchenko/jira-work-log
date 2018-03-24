const { credentials } = require('../../config');

module.exports.auth =
  () =>
    async (context, next) => {
      context.assert(context.session.username === credentials.username, 401);
      await next();
    };
