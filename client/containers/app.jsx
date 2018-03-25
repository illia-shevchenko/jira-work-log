import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import { WorkLog } from './log-work';
import { Login } from './login';

import './app.scss';

export class App extends Component {
  render() {
    return (
      <main>
        <Provider store={ store }>
          <Switch>
            <Route
              exact
              path="/"
              component={ Login }
            />
            <Route
              exact
              path="/worklog"
              component={ WorkLog }
            />
          </Switch>
        </Provider>
      </main>
    );
  }
}
