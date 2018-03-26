const { getLink } = require('./issue');
const requestParams = {
  fields: ['worklog', 'summary'],
  maxResults: 1000,
};

/**
 * @param {Date} date
 * @returns {string}
 */
const transformDate = (date) => date.toISOString().slice(0, 10);

const wrapName = (name) => `"${ name }"`;

const transformNames = (usernames) => (
  Array.isArray(usernames)
    ? usernames.map(wrapName).join(', ')
    : wrapName(usernames)
);

const getJql = ({ usernames, dateFrom, dateTo }) =>
  [
    `worklogDate >= ${ transformDate(dateFrom) }`,
    `worklogDate <= ${ transformDate(dateTo) }`,
    `worklogAuthor in (${ transformNames(usernames) })`,
  ].join(' AND ');

exports.getRequestParams = (jqlParams) =>
  Object.assign({
    jql: getJql(jqlParams),
  }, requestParams);

const getDateChecker = (dateFrom, dateTo) => {
  const dates = {
    from: new Date(dateFrom),
    to: new Date(dateTo),
  };

  return (date) => date >= dates.from && date <= dates.to;
};

const getUserLogs = (issues, { usernames, dateFrom, dateTo }) => {
  const shouldIncludeDate = getDateChecker(dateFrom, dateTo);
  const shouldIncludeUser = (name) => usernames.includes(name);

  const usersObject = issues.reduce(transformIssues(shouldIncludeUser, shouldIncludeDate), {});

  return Object.keys(usersObject)
    .map((username) => ({ username, days: usersObject[username] }));
};

const transformIssues = (shouldIncludeUser, shouldIncludeDate) =>
  (result, { key, fields: { summary, worklog } }) => {
    const getIssue = (timeSpentSeconds) => ({ key, summary, timeSpentSeconds, link: getLink(key) });

    worklog.worklogs.forEach(({ author: { name }, started, timeSpentSeconds }) => {
      if (!shouldIncludeUser(name)) {
        return;
      }

      const date = new Date(started);

      if (!shouldIncludeDate(date)) {
        return;
      }

      addDateWorklogTo(result, {
        name,
        date: transformDate(date),
        timeSpentSeconds,
        issue: getIssue(timeSpentSeconds),
      });
    });

    return result;
  };

const addDateWorklogTo = (result, { name, date, timeSpentSeconds, issue }) => {
  result[name] = result[name] || {};
  const days = result[name];

  days[date] = days[date] || { timeSpentSeconds: 0, issues: [] };
  const day = days[date];

  day.timeSpentSeconds += timeSpentSeconds;
  day.issues.push(issue);
};

exports.fromSearchResult = getUserLogs;
