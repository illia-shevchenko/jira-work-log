import { uniq, pluck, pipe, flatten, identity } from 'ramda';

export const groups = {
  state: [{
    users: ['Maksym_Gichka@epam.com', 'Maxim_Didenko@epam.com'],
    toAdd: {},
    name: 'My group',
    isOpen: true,
  }, {
    users: ['maryna_shcherbak', 'Maksym_Gichka@epam.com'],
    toAdd: {},
    name: 'Their group',
    isOpen: true,
  }],
  selectors: {
    listOfUsers: pipe(pluck('users'), flatten, uniq),
    all: identity,
  },
};
