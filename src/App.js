import React, { useState, useEffect } from 'react';
import { SocketProvider } from 'use-phoenix-channel';
// import { navigate } from '@reach/router';

import Nav from 'layout/Nav';
import Routes from 'layout/Routes';

export const Context = React.createContext({
  token: null
});

export default () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // navigate('/login');
  }, []);

  return (
    <SocketProvider wsUrl="//localhost:4000/socket" options={{ token }}>
      <Context.Provider value={{ token, setToken }}>
        <div className="app">
          <Nav />
          <Routes />
        </div>
      </Context.Provider>
    </SocketProvider>
  );
};
