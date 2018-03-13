'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

router
  .get('/version', (context) => {
    context.body = '0.0.1';
  });

module.exports = router;
