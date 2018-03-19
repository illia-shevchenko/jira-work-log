import { post } from './call-api';

export const login = (username, password) =>
  post('login', { username, password });
