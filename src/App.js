import React, { useEffect, useReducer } from 'react';
import { useSessionStorageState } from 'react-storage-hooks';

import Nav from 'layout/Nav';
import Routes from 'layout/Routes';

import { verifyToken } from 'utils';
import { GenericReducer, initialStreamState } from 'consts';

export const Context = React.createContext({});

export default () => {
  const [localUser] = useSessionStorageState('user', null);
  const [globalState, updateGlobalState] = useReducer(GenericReducer, {
    user: null,
    videoList: [],
    stream: initialStreamState
  });

  useEffect(() => {
    updateGlobalState({
      property: 'user',
      value: verifyToken(localUser.accessToken) ? localUser : null
    });
  }, []);

  return (
    <Context.Provider value={{ ...globalState, updateGlobalState }}>
      <div className="app">
        <Nav />
        <Routes />
      </div>
    </Context.Provider>
  );
};
