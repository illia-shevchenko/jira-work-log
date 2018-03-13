'use strict';

/** @type {Router} */
const api = require('./api');
const Router = require('koa-router');

/** @type {Router} */
const router = new Router();

router.use('/api', api.routes());

module.exports = router;
