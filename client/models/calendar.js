import { pick, converge, constructN, pipe, prop } from 'ramda';
import { getDates, getRange, getIncrementedRange, types } from '../components/calendar/dates.service';

const newDate = constructN(1, Date);
const fromDate = pipe(prop('dateFrom'), newDate);
const toDate = pipe(prop('dateTo'), newDate);

const getCurrentRange = ({ type }) => {
  const { dateFrom, dateTo } = getRange(type);

  return { dateFrom, dateTo, type };
};

export const calendar = {
  state: getCurrentRange({ type: types.WEEK }),
  reducers: {
    setToday: getCurrentRange,
    incrementRange: ({ dateFrom: dateFromOld, type }, delta) => {
      const { dateFrom, dateTo } = getIncrementedRange({ date: dateFromOld, type, delta });

      return { dateFrom, dateTo, type };
    },
    setRangeType: (state, type) => getCurrentRange({ type }),
  },
  selectors: {
    range: pick(['dateFrom', 'dateTo']),
    days: converge(getDates, [fromDate, toDate]),
  },
};
