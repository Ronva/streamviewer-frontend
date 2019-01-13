import React, { useContext } from 'react';
import { Context } from 'App';

import axios from 'axios';
import { Link } from '@reach/router';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default () => {
  const { token, setToken } = useContext(Context);

  const onSuccess = async ({ accessToken }) => {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo`,
      {
        params: {
          access_token: accessToken
        }
      }
    );
    const { audience, user_id, scope, expires_in } = data;

    if (audience && user_id && scope && expires_in) {
      setToken(accessToken);
    }
  };

  const onFailure = res => console.log(res);

  const handleLogout = () => setToken(null);

  return (
    <nav>
      <Link to="/" className="logo">
        StreamViewer
      </Link>
      {token ? (
        <GoogleLogout
          render={({ onClick }) => <button onClick={onClick}>Logout</button>}
          onLogoutSuccess={handleLogout}
        />
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_YOUTUBE_ID}
          render={({ onClick }) => <button onClick={onClick}>Login</button>}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      )}
    </nav>
  );
};
