import React, { useEffect, useContext } from 'react';
import { Context } from 'App';

import { navigate } from '@reach/router';
import LoginBtn from 'components/LoginBtn';

export default () => {
  const { googleToken } = useContext(Context);
  useEffect(
    () => {
      googleToken && navigate('/');
    },
    [googleToken]
  );

  return (
    <main role="main" className="login">
      <h1>StreamViewer</h1>
      <LoginBtn />
    </main>
  );
};
