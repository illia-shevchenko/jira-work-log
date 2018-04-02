import {
  uniq, pluck, pipe, flatten, identity,
  append, propEq, useWith, findIndex, remove,
  adjust, find, indexOf, evolve, map,
  not, flip,
} from 'ramda';
import { createStorage } from '../containers/persistent-storage';

const storage = createStorage('groups');

const matchGroup = propEq('name');
const findGroupIndex = useWith(findIndex, [matchGroup, identity]);
const findGroup = useWith(find, [matchGroup, identity]);

const wrapToPersist = (reducers) => map(
  (reducer) =>
    (...args) => {
      const state = reducer(...args);
      storage.set(state);
      return state;
    }, reducers
);

const adjustGroups = (groups, groupName, getTansformation) => {
  const group = findGroup(groupName, groups);

  return adjust(
    evolve(getTansformation(group)),
    indexOf(group, groups),
    groups,
  );
};

export const groups = {
  state: storage.get([]),
  reducers: wrapToPersist({
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
    addUser: (groups, { groupName, userName }) =>
      adjustGroups(groups, groupName, () => ({ users: append(userName) })),

    removeUser: (groups, { groupName, userName }) =>
      adjustGroups(groups, groupName, (group) => ({ users: remove(indexOf(userName, group.users), 1) })),

    toggle: (groups, groupName) =>
      adjustGroups(groups, groupName, () => ({ isOpen: not })),
  }),
  selectors: {
    listOfUsers: pipe(pluck('users'), flatten, uniq),
    all: identity,
    byName: flip(findGroup),
  },
};
