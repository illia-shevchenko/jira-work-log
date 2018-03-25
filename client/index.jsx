import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import { history } from './components/history';

import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { App } from './containers/app';

const RoutedApp = () => (
  <Router history={ history }>
    <App />
  </Router>
);

render(<RoutedApp />, document.getElementById('root'));
