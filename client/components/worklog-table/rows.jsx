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

export const getWorkLogRow = curry((
  { nameClass, totalClass },
  {
    createOnCellClick,
    onRemove,
    onNameClick,
  },
  { name, days, total }
) => (
  <div
    className="lw-table-row"
    key={ name }
  >
    <div
      className="lw-table-row__header"
      onClick={ () => { onNameClick(name); } }
    >
      <span className={ nameClass }>
        { name }
        <Glyphicon
          glyph="remove"
          onClick={ (event) => {
            event.stopPropagation();
            onRemove(name);
          } }
        />
      </span>
      <span className={ totalClass }>
        { `Total: ${ total }` }
      </span>
    </div>
    <div className="lw-table-row__content">
      { days.map(getLogCell({ onClick: createOnCellClick(name) })) }
    </div>
  </div>
));
