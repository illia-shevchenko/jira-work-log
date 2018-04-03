import { connect } from 'react-redux';
import { select } from '@rematch/select';
import { pick, map } from 'ramda';

import { IssueList as IssueListComponent } from '../../components/issue-list';

const selectUserIssues = (state, { name }) => pick([name], select.users.worklog(state)) || {};
const selectGroupIssues = (state, { name }) => {
  const { users } = select.groups.byName(state, name);
  return pick(users, select.users.worklog(state)) || {};
};

const getUsers = (state, { isGroup, date, name }) => {
  const selector = isGroup ? selectGroupIssues : selectUserIssues;
  return selector(state, { date, name });
};

const getOnDates = (state, { date }, users) => {
  const days = date ? [date] : select.calendar.days(state);

  return map(pick(days), users);
};

const mapProps = (state) => {
  const { isGroup, date, name } = select.issues.get(state) || {};

  if (!name) {
    return {};
  }

  const users = getUsers(state, { isGroup, date, name });

  return {
    users: getOnDates(state, { date }, users),
    name: isGroup ? name : null,
    isGroup,
  };
};

export const IssueList = connect(mapProps)(IssueListComponent);
