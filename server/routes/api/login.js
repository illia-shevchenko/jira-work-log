'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

const { equals } = require('ramda');
const { credentials } = require('../../config');

router
  .post('/', (context, next) => {
    context.assert(equals(context.request.body, credentials), 401, 'Wrong credentials');

    context.session.username = credentials.username;
    context.body = '"ok!"';

    next();
  });

/** @type {Router} */
module.exports = router;
