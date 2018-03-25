import React from 'react';
import { connect } from 'react-redux';
import { select } from '@rematch/select';
import { dispatch } from '@rematch/core';

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
  addGroup(name) {
    dispatch.groups.add(name);
  },
  removeGroup(name) {
    dispatch.groups.remove(name);
  },
  addUser({ groupName, userName }) {
    dispatch.groups.addUser({ groupName, userName });
    dispatch.users.query();
  },
  removeUser({ groupName, userName }) {
    dispatch.groups.removeUser({ groupName, userName });
  },
});

export const WorkLogTable = connect(mapState, mapDispatch)(WorkLogTableComponent);
