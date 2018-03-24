const JiraClient = require('jira-connector');
const { jira } = require('../../config');

exports.client = new JiraClient({
  host: jira.host,
  basic_auth: jira.credentials, // eslint-disable-line camelcase
});
