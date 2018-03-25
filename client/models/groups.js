import {
  uniq, pluck, pipe, flatten, identity,
  append, propEq, useWith, findIndex, remove,
  adjust, find, indexOf, evolve,
} from 'ramda';

const matchGroup = propEq('name');
const findGroupIndex = useWith(findIndex, [matchGroup, identity]);

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
  reducers: {
    add: (groups, name) => (name ? append({ users: [], name, toAdd: {}, isOpen: true }, groups) : groups),
    remove: (groups, name) => remove(findGroupIndex(name, groups), 1, groups),
    addUser: (groups, { groupName, userName }) => {
      const group = find(matchGroup(groupName), groups);

      return adjust(
        evolve({ users: append(userName) }),
        indexOf(group, groups),
        groups
      );
    },
    removeUser: (groups, { groupName, userName }) => {
      const group = find(matchGroup(groupName), groups);

      return adjust(
        evolve({ users: remove(indexOf(userName, group.users), 1) }),
        indexOf(group, groups),
        groups
      );
    },
  },
  selectors: {
    listOfUsers: pipe(pluck('users'), flatten, uniq),
    all: identity,
  },
};
