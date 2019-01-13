import React from 'react';
import { Router } from '@reach/router';

import Home from 'pages/Home';
import Stream from 'pages/Stream';

export default () => (
  <Router>
    <Home path="/" />
    <Stream path="stream/:streamId" />
  </Router>
);
