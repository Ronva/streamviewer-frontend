import React, { useReducer } from 'react';

import Nav from 'layout/Nav';
import Routes from 'layout/Routes';

import { GenericReducer, initialStreamState } from 'consts';

export const Context = React.createContext({});

export default () => {
  const [globalState, updateGlobalState] = useReducer(GenericReducer, {
    user: null,
    videoList: [],
    stream: initialStreamState
  });

  return (
    <Context.Provider value={{ ...globalState, updateGlobalState }}>
      <div className="app">
        <Nav />
        <Routes />
      </div>
    </Context.Provider>
  );
};
