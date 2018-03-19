import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'react-bootstrap';

import { App } from './containers/app';

const RoutedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

render(<RoutedApp />, document.getElementById('root'));
