import React, { useState } from 'react';

import Nav from 'layout/Nav';
import Routes from 'layout/Routes';

export const Context = React.createContext({
  token: null
});

export default () => {
  const [token, setToken] = useState(null);

  return (
    <Context.Provider value={{ token, setToken }}>
      <div className="app">
        <Nav />
        <Routes />
      </div>
    </Context.Provider>
  );
};
