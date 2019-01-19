import React, { useContext } from 'react';
import { Context } from 'App';

import { GoogleLogin } from 'react-google-login';

import { onLoginFailure, verifyToken } from 'utils';

export default () => {
  const { updateGlobalState } = useContext(Context);

  const success = async user => {
    const tokenIsValid = await verifyToken(user.accessToken);
    if (tokenIsValid) {
      updateGlobalState({ property: 'user', value: user });
    }
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
