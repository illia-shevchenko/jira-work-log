import React from 'react';
import { toPairs } from 'ramda';

import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { getHours } from '../calendar/dates.service';

import './issue-list.css';

const renderTitle = ({ name, isGroup }) => (
  isGroup
    ? <h5>{ `Group ${ name }:` }</h5>
    : null
);

const renderIssues = (issues) => (
  <ListGroup>
    { issues.map((
      { key, link, summary, timeSpentSeconds },
      index
    ) => (
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
);

const renderWorkLog = ([date, { issues }]) => (
  <React.Fragment key={ date }>
    <Panel.Body>{ `${ date }: ` }</Panel.Body>
    { renderIssues(issues) }
  </React.Fragment>
);

const renderUser = ([user, worklog]) => (
  <Panel key={ user }>
    <Panel.Heading>{ `${ user }:` }</Panel.Heading>
    { toPairs(worklog).map(renderWorkLog) }
  </Panel>
);

const renderUsers = (users) => (
  users
    ? (
      <div>
        { toPairs(users).map(renderUser) }
      </div>
    ) : null
);

export const IssueList = ({ users, name, isGroup }) => (
  <div className="jw-issue-list">
    { renderTitle({ name, isGroup }) }
    { renderUsers(users) }
  </div>
);
