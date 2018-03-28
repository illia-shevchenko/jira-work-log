'use strict';

const config = require('../config');
const Koa = require('koa');
const session = require('koa-session');
/**
 * @type {Application}
 */
const app = new Koa();

app.keys = [config.secret];

const responseTime = require('koa-response-time');
const helmet = require('koa-helmet');
const logger = require('./middleware/logger');

const bodyParser = require('koa-bodyparser');

/** @type {Router} */
const routes = require('./routes');
const error = require('./middleware/error');
const jiraClient = require('./jira/middleware');

if (!config.env.isTest) {
  app.use(responseTime());
  app.use(helmet());
}

app.use(error());

app.use(session(config.session, app));

app.use(logger());
app.use(bodyParser(config.bodyParser));

app.use(jiraClient());
app.use(routes.routes());

module.exports = app;
