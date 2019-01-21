import React, { Suspense } from 'react';
import { Router } from '@reach/router';

const Home = React.lazy(() => import('pages/Home'));
const Login = React.lazy(() => import('pages/Login'));
const Stream = React.lazy(() => import('pages/Stream'));
const Natalie = React.lazy(() => import('pages/Natalie'));

const StreamWrapper = ({ children }) => children;

export default () => (
  <Suspense fallback={<></>}>
    <Router>
      <Home path="/" />
      <Login path="login" />
      <StreamWrapper path="stream">
        <Stream path=":videoId" />
        <Natalie path="natalie" />
      </StreamWrapper>
    </Router>
  </Suspense>
);
