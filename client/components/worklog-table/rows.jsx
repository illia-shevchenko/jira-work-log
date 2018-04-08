import React from 'react';
import { curry } from 'ramda';
import classnames from 'classnames';
import { Glyphicon } from 'react-bootstrap';

const cellBaseClass = 'lw-table-cell';
const getLogCell = curry(({ onClick }, { spent: label, isTooSmall, isTooBig, date, isDayOff }) => {
  const className = classnames(cellBaseClass, `${ cellBaseClass }--hover`, {
    [`${ cellBaseClass }--small`]: isTooSmall,
    [`${ cellBaseClass }--big`]: isTooBig,
    [`${ cellBaseClass }--day-off`]: isDayOff,
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
