'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

router
  .get('/', async (context) => {
    context.status = 501;
  });

module.exports = router;
