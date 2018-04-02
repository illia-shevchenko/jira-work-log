import React from 'react';
import { map } from 'ramda';

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

export const getDateCells = map(getDateCell);
