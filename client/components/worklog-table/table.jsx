import React from 'react';

import { getDateCells } from './dates';
import { getGroups, getNewGroupRow } from './groups';

import './table.scss';

export const WorkLogTable = ({ children, groups, days, onLogClick, addGroup, removeGroup, removeUser, addUser }) => (
  <div className="lw-table">
    <div className="lw-table__header">
      <div className="lw-table-row">
        <div className="lw-table-row__header">
          { children }
        </div>
        <div className="lw-table-row__content">
          { getDateCells(days) }
        </div>
      </div>
    </div>
    <div className="lw-table__body">
      { [
        ...getGroups({ onCellClick: onLogClick, removeGroup, removeUser, addUser }, groups),
        getNewGroupRow({ addGroup }),
      ] }
    </div>
  </div>
);
