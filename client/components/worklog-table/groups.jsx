import React from 'react';
import { curry, pluck } from 'ramda';

import { AddUser } from './add-user';
import { GroupInput } from './group-input';
import { getWorkLogRow } from './rows';

export const getNewGroupRow = ({ addGroup }) => (
  <div
    className="lw-table-group"
    key="new-group"
  >
    <div className="lw-table-group__header">
      <div className="lw-table-row">
        <div className="lw-table-row__header">
          <GroupInput
            onSubmit={ addGroup }
          />
        </div>
        <div className="lw-table-row__content" />
      </div>
    </div>
  </div>
);

const getNewUserRow = ({ addUserToGroup, existingUsers }) => (
  <div
    className="lw-table-row"
    key="new-user"
  >
    <div className="lw-table-row__header">
      <AddUser
        onSubmit={ addUserToGroup }
        existingUsers={ pluck(['name'], existingUsers) }
      />
    </div>
    <div className="lw-table-row__content" />
  </div>
);

const userClasses = {
  nameClass: 'user-name',
  totalClass: 'user-total',
};

const groupHeaderClasses = {
  nameClass: 'group-name',
  totalClass: 'group-total',
};

const createOnLogClickMaker = (handler, isGroup) => (name) => (date) => handler({ isGroup, name, date });

const getGroup = curry(({ onCellClick, removeGroup, removeUser, addUser }, group) => {
  const groupOptions = {
    createOnCellClick: createOnLogClickMaker(onCellClick, true),
    onRemove: removeGroup,
  };
  const userOptions = {
    createOnCellClick: createOnLogClickMaker(onCellClick),
    onRemove(userName) {
      removeUser({ userName, groupName: group.name });
    },
  };

  const addUserToGroup = (userName) => {
    addUser({ userName, groupName: group.name });
  };

  return (
    <div
      className="lw-table-group"
      key={ group.name }
    >
      <div className="lw-table-group__header">
        { getWorkLogRow(groupHeaderClasses, groupOptions, group) }
      </div>
      {
        group.isOpen && (
          <div className="lw-table-group__content">
            { [
              ...group.users.map(getWorkLogRow(userClasses, userOptions)),
              getNewUserRow({ addUserToGroup, existingUsers: group.users }),
            ] }
          </div>)
      }
    </div>
  );
});

export const getGroups = ({ onCellClick, removeGroup, removeUser, addUser }, groups) =>
  groups.map(getGroup({ onCellClick, removeGroup, removeUser, addUser }));
