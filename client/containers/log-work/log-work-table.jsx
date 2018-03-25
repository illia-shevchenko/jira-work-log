import React from 'react';
import { connect } from 'react-redux';
import { select } from '@rematch/select';

import { WorkLogTable as WorkLogTableComponent } from '../../components/worklog-table';
import { Calendar } from './calendar';
import { get as getGroups } from './log-work.selector';

const mapState = (state) => ({
  children: <Calendar />,
  groups: getGroups(state),
  days: select.calendar.days(state),
});

const mapDispatch = () => ({
  onLogClick(payload) {
    console.info('Clicked: ', payload); // eslint-disable-line no-console
  },
});

export const WorkLogTable = connect(mapState, mapDispatch)(WorkLogTableComponent);
