import React, { useReducer, useEffect } from 'react';
import { SocketProvider } from 'use-phoenix-channel';
// import { navigate } from '@reach/router';

import Nav from 'layout/Nav';
import Routes from 'layout/Routes';

import { GenericReducer } from 'consts';

export const Context = React.createContext({});

export default () => {
  const [globalState, updateGlobalState] = useReducer(GenericReducer, {
    googleToken: null,
    stream: null
  });
  const { googleToken } = globalState;

  useEffect(
    () => {
      // !googleToken && navigate('/login');
    },
    [googleToken]
  );

  return (
    <SocketProvider wsUrl="//localhost:4000/socket">
      <Context.Provider value={{ ...globalState, updateGlobalState }}>
        <div className="app">
          <Nav />
          <Routes />
        </div>
      </Context.Provider>
    </SocketProvider>
  );
};
