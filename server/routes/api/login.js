'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

const { equals } = require('ramda');
const { credentials } = require('../../config');

router
  .post('/', (context, next) => {
    if (equals(context.request.body, credentials)) {
      context.session.username = credentials.username;
      context.body = 'ok!';

      next();
      return;
    }

    context.status = 401;
    context.body = 'Wrong credentials';
  });

/** @type {Router} */
module.exports = router;
