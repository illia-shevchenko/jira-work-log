import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { dispatch } from '@rematch/core';

import { WorkLogTable } from './log-work-table';

export class WorkLogComponent extends PureComponent {
  componentWillMount() {
    this.props.load();
  }

  render() {
    return (
      <section>
        Here will be log work page
        <WorkLogTable />
      </section>
    );
  }
}

const mapDispatch = () => ({
  load() {
    dispatch.users.query();
  },
});

export const WorkLog = connect(null, mapDispatch)(WorkLogComponent);
