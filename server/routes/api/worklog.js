'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

const worklogService = require('../../jira/worklog');

router
  .get('/', async (context) => {
    const api = context.state.jiraClient.search;
    const {
      usernames = [],
      dateFrom: dateFromString,
      dateTo: dateToString,
    } = context.query;

    const dateFrom = new Date(dateFromString || 0);
    const dateTo = dateToString ? new Date(dateToString) : new Date();

    let searchResult;

    try {
      const requestParams = worklogService.getRequestParams({ usernames, dateFrom, dateTo });
      searchResult = await api.search(requestParams);
      console.log(searchResult);
    } catch (error) {
      context.throw(500, 'Jira error', { isJira: true, original: error });
    }

    context.body = worklogService.fromSearchResult(searchResult.issues, { usernames, dateFrom, dateTo });
  });

/** @type {Router} */
module.exports = router;
