import {
  uniq, pluck, pipe, flatten, identity,
  append, propEq, useWith, findIndex, remove,
  adjust, find, indexOf, evolve,
} from 'ramda';

const matchGroup = propEq('name');
const findGroupIndex = useWith(findIndex, [matchGroup, identity]);
const findGroup = useWith(find, [matchGroup, identity]);

export const groups = {
  state: [],
  reducers: {
    add: (groups, name) => (
      name && !findGroup(name, groups)
        ? append({
          users: [],
          name,
          toAdd: {},
          isOpen: true,
        }, groups)
        : groups
    ),
    remove: (groups, name) => remove(findGroupIndex(name, groups), 1, groups),
    addUser: (groups, { groupName, userName }) => {
      const group = findGroup(groupName, groups);

      return adjust(
        evolve({ users: append(userName) }),
        indexOf(group, groups),
        groups
      );
    },
    removeUser: (groups, { groupName, userName }) => {
      const group = findGroup(groupName, groups);

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
