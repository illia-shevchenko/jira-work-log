import { pick, converge, constructN, pipe, prop } from 'ramda';
import { getDates, getRange, getIncrementedRange, types } from '../components/calendar/dates.service';

import { createStorage } from '../containers/persistent-storage';

const storage = createStorage('calendar');

const newDate = constructN(1, Date);
const fromDate = pipe(prop('dateFrom'), newDate);
const toDate = pipe(prop('dateTo'), newDate);

const getCurrentRange = ({ type }) => {
  const { dateFrom, dateTo } = getRange(type);

  return { dateFrom, dateTo, type };
};

export const calendar = {
  state: getCurrentRange({ type: storage.get(types.WEEK) }),
  reducers: {
    setToday: getCurrentRange,
    incrementRange: ({ dateFrom: dateFromOld, type }, delta) => {
      const { dateFrom, dateTo } = getIncrementedRange({ date: dateFromOld, type, delta });

      return { dateFrom, dateTo, type };
    },
    setRangeType: (state, type) => {
      storage.set(type);
      return getCurrentRange({ type });
    },
  },
  selectors: {
    range: pick(['dateFrom', 'dateTo']),
    days: converge(getDates, [fromDate, toDate]),
  },
};
