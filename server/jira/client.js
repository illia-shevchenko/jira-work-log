const JiraClient = require('jira-connector');
const { jiraCredentials } = require('../config');

exports.client = new JiraClient({
  host: 'fbc-ss.atlassian.net',
  basic_auth: jiraCredentials, // eslint-disable-line camelcase
});
