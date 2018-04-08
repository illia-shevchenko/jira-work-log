import React from 'react';
import { map } from 'ramda';

import './date.scss';

const months = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec',
];

const getDateCell = (cellData) => {
  const parts = cellData.split('-');

  return (
    <div
      className="lw-table-cell lw-date-cell"
      key={ cellData }
    >
      <div className="lw-date-cell__day">{ parts[2] }</div>
      <div className="lw-date-cell__month">{ months[+parts[1]] }</div>
    </div>
  );
};

export const getDateCells = map(getDateCell);
