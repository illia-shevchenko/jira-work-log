import { connect } from 'react-redux';
import { select } from '@rematch/select';
import { path } from 'ramda';

import { IssueList as IssueListComponent } from '../../components/issue-list';

const selectUserIssues = (state, { name, date }) => path([name, date, 'issues'], select.users.worklog(state)) || [];
const selectGroupIssues = () => [];

const selectIssues = (state) => {
  const { isGroup, date, name } = select.issues.get(state) || {};

  if (!name) {
    return null;
  }

  const selector = isGroup ? selectGroupIssues : selectUserIssues;
  return selector(state, { date, name });
};

const mapProps = (state) =>
  Object.assign(
    {
      items: selectIssues(state),
    },
    select.issues.get(state),
  );

export const IssueList = connect(mapProps)(IssueListComponent);
