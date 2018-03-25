import { assoc, prop } from 'ramda';
import { select } from '@rematch/select';
import { queryUsers } from '../api/resources';

const normalizeList = (list) => list.reduce((result, item) => assoc(item.username, item.days, result), {});
export const users = {
  state: { map: {}, error: null },
  reducers: {
    setList: (state, list) => ({ map: normalizeList(list), error: null }),
    setError: (state, error) => ({ map: state.map, error }),
    clearError: (state) => ({ map: state.map, error: null }),
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

        const users = await queryUsers({ usernames, dateFrom, dateTo });
        this.setList(users);
      } catch (error) {
        this.setError(error);
      }
    },
  },
  selectors: {
    map: prop('map'),
  },
};
