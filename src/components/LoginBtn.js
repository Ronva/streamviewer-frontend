import React, { useContext } from 'react';
import { Context } from 'App';

import { GoogleLogin } from 'react-google-login';

import { onLoginFailure, onLoginSuccess } from 'utils';

export default () => {
  const { setToken } = useContext(Context);

  const success = token => {
    const accessToken = onLoginSuccess(token);
    setToken(accessToken);
  };

  return (
    <GoogleLogin
      scope="https://www.googleapis.com/auth/youtube"
      clientId={process.env.REACT_APP_YOUTUBE_ID}
      render={({ onClick }) => <button onClick={onClick}>Login</button>}
      onSuccess={success}
      onFailure={onLoginFailure}
    />
  );
};
