import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { types } from './dates.service';
import './calendar.scss';

export const Calendar = ({ goToNext, goToPrev, goToThis, setRangeType, range: { dateFrom, dateTo, type } }) => (
  <div className="wl-calendar">
    <Glyphicon
      onClick={ goToPrev }
      glyph="chevron-left"
    />
    <span>{ dateFrom }</span>
    <span className="wl-calendar__separator">-</span>
    <span>{ dateTo }</span>
    <Glyphicon
      glyph="chevron-right"
      onClick={ goToNext }
    />
    <Button
      bsSize="xsmall"
      bsStyle="warning"
      className="wl-calendar__today"
      onClick={ goToThis }
    >
      Today
    </Button>
    <Button
      className="wl-calendar__type"
      bsSize="xsmall"
      active={ type === types.WEEK }
      onClick={ () => setRangeType(types.WEEK) }
    >
      Week
    </Button>
    <Button
      className="wl-calendar__type"
      bsSize="xsmall"
      active={ type === types.MONTH }
      onClick={ () => setRangeType(types.MONTH) }
    >
      Month
    </Button>
  </div>
);
