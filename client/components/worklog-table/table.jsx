import React from 'react';
import { map } from 'ramda';
import classnames from 'classnames';

import './table.scss';

const getLogCell = ({ spent: label, isTooSmall, isTooBig, date }, index, onClick) => {
  const className = classnames('lw-table-cell', 'lw-table-cell--hover', {
    'lw-too-small': isTooSmall,
    'lw-too-big': isTooBig,
  });

  return (
    <div
      className={ className }
      key={ date }
      onClick={ () => onClick(date) }
    >
      { label }
    </div>
  );
};

const getWorkLogRow = ({ nameClass, totalClass }, worklog, createOnCellClick) => (
  <div
    className="lw-table-row"
    key={ worklog.name }
  >
    <div className="lw-table-row__header">
      <span className={ nameClass }>
        { worklog.name }
      </span>
      <span className={ totalClass }>
        { `Total: ${ worklog.total }` }
      </span>
    </div>
    <div className="lw-table-row__content">
      { worklog.days.map((day, index) => getLogCell(day, index, createOnCellClick(worklog.name))) }
    </div>
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

const createOnLogClicker = (handler, isGroup) => (name) => (date) => handler({ isGroup, name, date });
const getGroup = (group, onCellClick) => (
  <div
    className="lw-table-group"
    key={ group.name }
  >
    <div className="lw-table-group__header">
      { getWorkLogRow(groupHeaderClasses, group, createOnLogClicker(onCellClick, true)) }
    </div>
    <div className="lw-table-group__content">
      { group.users.map((user) => getWorkLogRow(userClasses, user, createOnLogClicker(onCellClick))) }
    </div>
  </div>
);

const getGroups = (groups, onCellClick) =>
  groups.map((group) => getGroup(group, onCellClick));

const printDate = (date) => {
  const parts = date.split('-');

  return `${ parts[2] }.${ parts[1] }`;
};

const getDateCell = (cellData) => {
  const label = printDate(cellData);

  return (
    <div
      className="lw-table-cell lw-date-cell"
      key={ label }
    >
      { label }
    </div>
  );
};

const getDateCells = map(getDateCell);

export const WorkLogTable = ({ children, groups, days, onLogClick }) => (
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
      { getGroups(groups, onLogClick) }
    </div>
  </div>
);
