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
    dispatch.calendar.incrementRange(1);
    load();
  },
  goToPrev() {
    dispatch.calendar.incrementRange(-1);
    load();
  },
  goToThis() {
    dispatch.calendar.setToday();
    load();
  },
  setRangeType(type) {
    dispatch.calendar.setRangeType(type);
    load();
  },
});

export const Calendar = connect(mapState, mapDispatch)(CalendarComponent);
