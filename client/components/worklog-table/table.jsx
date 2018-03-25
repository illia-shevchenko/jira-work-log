import React from 'react';
import { map, curry } from 'ramda';
import classnames from 'classnames';

import './table.scss';

const getLogCell = curry(({ onClick }, { spent: label, isTooSmall, isTooBig, date }) => {
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
});

const getWorkLogRow = curry(({ nameClass, totalClass }, createOnCellClick, worklog) => (
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
      { worklog.days.map(getLogCell({ onClick: createOnCellClick(worklog.name) })) }
    </div>
  </div>
));
const getNewUserRow = () => (
  <div
    className="lw-table-row"
    key="new-user"
  >
    <div className="lw-table-row__header">
      Here will be typeahead
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
const getGroup = curry(({ onCellClick }, group) => (
  <div
    className="lw-table-group"
    key={ group.name }
  >
    <div className="lw-table-group__header">
      { getWorkLogRow(groupHeaderClasses, createOnLogClickMaker(onCellClick, true), group) }
    </div>
    {
      group.isOpen && (
        <div className="lw-table-group__content">
          { [
            ...group.users.map(getWorkLogRow(userClasses, createOnLogClickMaker(onCellClick))),
            getNewUserRow(),
          ] }
        </div>)
    }
  </div>
));

const getGroups = ({ onCellClick }, groups) =>
  groups.map(getGroup({ onCellClick }));

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
      { getGroups({ onCellClick: onLogClick }, groups) }
    </div>
  </div>
);
