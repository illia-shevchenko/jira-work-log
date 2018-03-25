import { connect } from 'react-redux';
import { dispatch } from '@rematch/core';

import { Calendar as CalendarComponent } from '../../components/calendar';

const mapState = (state) => ({
  range: state.calendar,
});

const mapDispatch = () => ({
  goToNext() {
    dispatch.calendar.incrementWeek(1);
    dispatch.users.query();
  },
  goToPrev() {
    dispatch.calendar.incrementWeek(-1);
    dispatch.users.query();
  },
  goToThis() {
    dispatch.calendar.setThisWeek();
    dispatch.users.query();
  },
});

export const Calendar = connect(mapState, mapDispatch)(CalendarComponent);
