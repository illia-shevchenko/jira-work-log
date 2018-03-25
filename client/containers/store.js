import { init } from '@rematch/core';
import selectorsPlugin from '@rematch/select';

import * as models from '../models';

export const store = init({
  models,
  plugins: [
    selectorsPlugin(),
  ],
});
