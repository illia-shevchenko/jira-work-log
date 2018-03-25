import { connect } from 'react-redux';
import { dispatch } from '@rematch/core';
import { pipe } from 'ramda';

import { Calendar as CalendarComponent } from '../../components/calendar';

const mapState = (state) => ({
  range: state.calendar,
});

const load = pipe(dispatch.issues.clear, dispatch.users.query);

const mapDispatch = () => ({
  goToNext() {
    dispatch.calendar.incrementWeek(1);
    load();
  },
  goToPrev() {
    dispatch.calendar.incrementWeek(-1);
    load();
  },
  goToThis() {
    dispatch.calendar.setThisWeek();
    load();
  },
});

export const Calendar = connect(mapState, mapDispatch)(CalendarComponent);
