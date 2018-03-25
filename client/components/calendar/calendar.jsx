import React from 'react';
import { Button } from 'react-bootstrap';

import './calendar.scss';

export const Calendar = ({ goToNext, goToPrev, goToThis }) => (
  <div className="wl-calendar">
    Weeks:
    <Button
      onClick={ goToPrev }
      bsSize="xsmall"
    >
      Previous
    </Button>

    <Button
      bsSize="xsmall"
      onClick={ goToThis }
    >
      Today
    </Button>

    <Button
      bsSize="xsmall"
      onClick={ goToNext }
    >
      Next
    </Button>
  </div>
);
