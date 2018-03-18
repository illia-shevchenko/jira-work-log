'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();
/** @type {Router} */
const login = require('./login');
/** @type {Router} */
const users = require('./users');
/** @type {Router} */
const worklog = require('./worklog');

const { auth } = require('../../middleware/authentication');
router
  .get('/version', auth(), (context) => {
    context.body = '"0.0.1"';
  });

router.use('/login', login.routes());
router.use('/users', auth(), users.routes());
router.use('/worklog', auth(), worklog.routes());

module.exports = router;
