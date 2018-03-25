import React, { Component } from 'react';
import { map, curry } from 'ramda';
import classnames from 'classnames';
import { Glyphicon } from 'react-bootstrap';

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

const getWorkLogRow = curry(({ nameClass, totalClass }, { createOnCellClick, onRemove }, worklog) => (
  <div
    className="lw-table-row"
    key={ worklog.name }
  >
    <div className="lw-table-row__header">
      <span className={ nameClass }>
        { worklog.name }
        <Glyphicon
          glyph="remove"
          onClick={ () => onRemove(worklog.name) }
        />
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
const getGroup = curry(({ onCellClick, removeGroup, removeUser }, group) => {
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
              getNewUserRow(),
            ] }
          </div>)
      }
    </div>
  );
});

const getGroups = ({ onCellClick, removeGroup, removeUser }, groups) =>
  groups.map(getGroup({ onCellClick, removeGroup, removeUser }));

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

class GroupInput extends Component {
  static defaultProps() {
    return {
      onSubmit() {},
    };
  }

  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange({ target: { value } }) {
    this.setState({ value });
  }

  onKeyDown({ key }) {
    if (key === 'Enter') {
      this.props.onSubmit(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
      <input
        className="lw-table-group-name-input"
        placeholder="Enter new groups'name"
        value={ this.state.value }
        onChange={ this.onChange }
        onKeyDown={ this.onKeyDown }
      />
    );
  }
}

const getNewGroupRow = ({ addGroup }) => (
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

export const WorkLogTable = ({ children, groups, days, onLogClick, addGroup, removeGroup, removeUser }) => (
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
        ...getGroups({ onCellClick: onLogClick, removeGroup, removeUser }, groups),
        getNewGroupRow({ addGroup }),
      ] }
    </div>
  </div>
);
