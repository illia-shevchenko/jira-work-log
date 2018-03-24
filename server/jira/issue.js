const { jira } = require('../../config');

exports.getLink = (key) => `${ jira.host }/browse/${ key }`;

