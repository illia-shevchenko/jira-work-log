import { post, get } from './call-api';

export const login = (username, password) =>
  post('login', { username, password });

export const queryUsers = ({ usernames, dateFrom, dateTo }) =>
  get('worklog', { usernames, dateFrom, dateTo });
