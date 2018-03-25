import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { getHours } from '../calendar/dates.service';

export const IssueList = ({ items, name, date }) =>
  items && (
    <div>
      <h5>
        { `${ name } on ${ date } was working on issues:` }
      </h5>
      <ListGroup>
        { items.map(({ key, link, summary, timeSpentSeconds }, index) => (
          <ListGroupItem
            header={ `${ key }: ${ getHours(timeSpentSeconds) }h` }
            href={ `https://${ link }` }
            key={ key + index }
            target="_blank"
          >
            { summary }
          </ListGroupItem>
        )) }

      </ListGroup>
    </div>
  );
