import React from 'react';
import { curry } from 'ramda';
import classnames from 'classnames';
import { Glyphicon } from 'react-bootstrap';

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
      { label || '' }
    </div>
  );
});

export const getWorkLogRow = curry(({ nameClass, totalClass }, { createOnCellClick, onRemove }, worklog) => (
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
