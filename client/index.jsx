import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import { history } from './components/history';

import 'react-bootstrap';

import { App } from './containers/app';

const RoutedApp = () => (
  <Router history={ history }>
    <App />
  </Router>
);

render(<RoutedApp />, document.getElementById('root'));
