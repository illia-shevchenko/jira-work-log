'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

const { Group } = require('../../models/Group');
const { Category } = require('../../models/Category');

router
  .get('/', async (context) => {
    context.body = await Group.findForUser({ user: context.state.user });
  })
  .get('/:id/categories', async (context) => {
    context.body = await Category.findAllForAGroup();
  });

module.exports = router;
