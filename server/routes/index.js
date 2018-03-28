'use strict';

/** @type {Router} */
const api = require('./api');
const Router = require('koa-router');
const send = require('koa-send');

const logger = require('../logger');

const { client: { path, outFile } } = require('../../config');

/** @type {Router} */
const router = new Router();

router.use('/api', api.routes());

logger.info('Start static: ', path);

router.get('*', async (context) => {
  try {
    await send(context, context.path, { index: outFile, root: path });
  } catch (error) {
    if (error.statusCode === 404) {
      await send(context, outFile, { root: path });
    } else {
      throw error;
    }
  }
});

module.exports = router;
