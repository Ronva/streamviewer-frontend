import React, { useReducer, useEffect } from 'react';
// import { navigate } from '@reach/router';

import Nav from 'layout/Nav';
import Routes from 'layout/Routes';

import { GenericReducer, initialStreamState } from 'consts';

export const Context = React.createContext({});

export default () => {
  const [globalState, updateGlobalState] = useReducer(GenericReducer, {
    token: null,
    videoList: [],
    stream: initialStreamState
  });
  const { token } = globalState;

  useEffect(
    () => {
      // !token && navigate('/login');
    },
    [token]
  );

  return (
    <Context.Provider value={{ ...globalState, updateGlobalState }}>
      <div className="app">
        <Nav />
        <Routes />
      </div>
    </Context.Provider>
  );
};
