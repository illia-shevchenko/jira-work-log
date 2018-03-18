'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();
/** @type {Router} */
const login = require('./login');
/** @type {Router} */
const users = require('./users');

const { auth } = require('../../middleware/authentication');
router
  .get('/version', auth(), (context) => {
    context.body = '"0.0.1"';
  });

router.use('/login', login.routes());
router.use('/users', auth(), users.routes());

module.exports = router;
