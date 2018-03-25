import { pick, converge, constructN, pipe, prop } from 'ramda';
import { getDates } from '../components/calendar/dates.service';

const newDate = constructN(1, Date);
const fromDate = pipe(prop('dateFrom'), newDate);
const toDate = pipe(prop('dateTo'), newDate);

const getWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay() || 7;

  const monday = new Date(today);
  monday.setDate(today.getDate() + 1 - dayOfWeek);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return { dateFrom: monday, dateTo: sunday };
};

export const calendar = {
  state: getWeek(),
  reducers: {
    setThisWeek: getWeek,
    incrementWeek: ({ dateFrom: oldDateFrom, dateTo: oldDateTo }, payload) => {
      const daysToIncrement = payload * 7;
      const dateFrom = new Date(oldDateFrom);
      const dateTo = new Date(oldDateTo);

      dateFrom.setDate(dateFrom.getDate() + daysToIncrement);
      dateTo.setDate(dateTo.getDate() + daysToIncrement);

      return { dateFrom, dateTo };
    },
  },
  selectors: {
    range: pick(['dateFrom', 'dateTo']),
    days: converge(getDates, [fromDate, toDate]),
  },
};
