'use strict';

const config = require('./config');
const Koa = require('koa');

/**
 * @type {Application}
 */
const app = new Koa();

app.keys = [config.secret];

const responseTime = require('koa-response-time');
const helmet = require('koa-helmet');
const logger = require('koa-logger');

const bodyParser = require('koa-bodyparser');

/** @type {Router} */
const routes = require('./routes');

if (!config.env.isTest) {
  app.use(responseTime());
  app.use(helmet());
}

app.use(logger());
app.use(bodyParser(config.bodyParser));

app.use(routes.routes());

module.exports = app;
