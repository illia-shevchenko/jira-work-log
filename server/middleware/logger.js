const loggerMiddleware = require('koa-logger');
const logger = require('../logger');

module.exports = () => loggerMiddleware({
  transporter(str) {
    logger.info(str);
  },
});
