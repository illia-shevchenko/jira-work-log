import { init } from '@rematch/core';
import * as models from '../models/index';

export const store = init({
  models,
});
