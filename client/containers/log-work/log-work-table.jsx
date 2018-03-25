import React from 'react';
import { connect } from 'react-redux';
import { select } from '@rematch/select';

import { WorkLogTable as WorkLogTableComponent } from '../../components/worklog-table';
import { Calendar } from '../../components/calendar';
import { get as getGroups } from './log-work.selector';

const mapState = (state) => ({
  children: <Calendar />,
  groups: getGroups(state),
  days: select.calendar.days(state),
});

const mapDispatch = () => ({
  onLogClick() {
  },
});

export const WorkLogTable = connect(mapState, mapDispatch)(WorkLogTableComponent);
