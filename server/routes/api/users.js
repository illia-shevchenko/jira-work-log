'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

router
  .get('/current', (context) => {
    context.body = context.state.user;
  });

/** @type {Router} */
module.exports = router;
