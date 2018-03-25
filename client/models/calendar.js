import { pick, converge, constructN, pipe, prop } from 'ramda';
import { getDates } from '../components/calendar/dates.service';

const newDate = constructN(1, Date);
const fromDate = pipe(prop('dateFrom'), newDate);
const toDate = pipe(prop('dateTo'), newDate);

export const calendar = {
  state: {
    dateFrom: '2018-03-15',
    dateTo: '2018-03-18',
  },
  selectors: {
    range: pick(['dateFrom', 'dateTo']),
    days: converge(getDates, [fromDate, toDate]),
  },
};
