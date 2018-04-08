'use strict';

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

const worklogService = require('../../jira/worklog');

const searchIssues = async (api, requestParams) => {
  let foundIssues = [];
  let isFinished = false;

  while (!isFinished) {
    const { issues, startAt, maxResults, total } = await api.search(requestParams);

    foundIssues = foundIssues.concat(issues);
    requestParams.startAt = maxResults + startAt;
    isFinished = requestParams.startAt >= total;

    console.info('One more Jira call: ', { startAt, maxResults, total, isFinished });
  }

  return foundIssues;
};

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

    let requestParams;

    try {
      requestParams = worklogService.getRequestParams({ usernames, dateFrom, dateTo });
    } catch (error) {
      context.throw(500, 'Jira request params generation error', { original: error });
    }

    try {
      const foundIssues = await searchIssues(api, requestParams);
      context.body = worklogService.fromSearchResult(foundIssues, { usernames, dateFrom, dateTo });
    } catch (error) {
      context.throw(500, 'Jira error', { isJira: true, original: error });
    }
  });

/** @type {Router} */
module.exports = router;
