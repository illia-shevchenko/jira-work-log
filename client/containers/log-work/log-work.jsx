import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { dispatch } from '@rematch/core';

import { WorkLogTable } from './log-work-table';
import { IssueList } from './issue-list';

export class WorkLogComponent extends PureComponent {
  componentWillMount() {
    this.props.load();
  }

  render() {
    return (
      <Fragment>
        <section>
          <h3>
            Worklog
          </h3>
          <WorkLogTable />
        </section>
        <section>
          <IssueList />
        </section>
      </Fragment>
    );
  }
}

const mapDispatch = () => ({
  load() {
    dispatch.users.query();
  },
});

export const WorkLog = connect(null, mapDispatch)(WorkLogComponent);
