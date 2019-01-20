import React from 'react';
import { Router } from '@reach/router';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Stream from 'pages/Stream';
import Natalie from 'pages/Natalie';

const StreamWrapper = ({ children }) => children;

export default () => (
  <Router>
    <Home path="/" />
    <Login path="login" />
    <StreamWrapper path="stream">
      <Stream path=":videoId" />
      <Natalie path="natalie" />
    </StreamWrapper>
  </Router>
);
