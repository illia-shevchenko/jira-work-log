import { login as callLogin } from '../api/resources';
import { history } from '../components/history';

export const login = {
  state: {
    error: null,
  },
  reducers: {
    clearError: () => ({ error: null }),
    setError: (state, error) => ({ error }),
  },
  effects: {
    async do({ login, password }) {
      if (!login) {
        return;
      }

      try {
        await callLogin(login, password);

        history.replace('/worklog');
      } catch (error) {
        this.setError(error.toString());
      }
    },
  },
};
