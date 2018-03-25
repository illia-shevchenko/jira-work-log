import { assoc, prop } from 'ramda';
import { select } from '@rematch/select';
import { queryWorklog } from '../api/resources';

const normalizeList = (list) =>
  list.reduce((result, item) =>
    assoc(item.username, item.days, result), {});

export const users = {
  state: { worklog: {}, error: null },
  reducers: {
    setWorklog: (state, list) => ({ worklog: normalizeList(list), error: null }),
    setError: (state, error) => assoc('error', error, state),
    clearError: (state) => assoc('error', null, state),
  },
  effects: {
    async query(payload, rootState) {
      try {
        this.clearError();

        const usernames = select.groups.listOfUsers(rootState);

        if (!usernames.length) {
          return;
        }

        const { dateFrom, dateTo } = select.calendar.range(rootState);

        const worklog = await queryWorklog({ usernames, dateFrom, dateTo });
        this.setWorklog(worklog);
      } catch (error) {
        this.setError(error);
      }
    },
  },
  selectors: {
    worklog: prop('worklog'),
  },
};
