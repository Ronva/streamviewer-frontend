import React, { useContext } from 'react';
import { Context } from 'App';

import { GoogleLogin } from 'react-google-login';

import { onLoginFailure, onLoginSuccess } from 'utils';

export default () => {
  const { updateGlobalState } = useContext(Context);

  const success = async token => {
    const accessToken = await onLoginSuccess(token);
    updateGlobalState({ property: 'googleToken', value: accessToken });
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
