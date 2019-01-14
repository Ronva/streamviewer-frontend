import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { Context } from 'App';

export default () => {
  const { setToken } = useContext(Context);

  const handleLogout = () => setToken(null);

  return (
    <GoogleLogout
      render={({ onClick }) => <button onClick={onClick}>Logout</button>}
      onLogoutSuccess={handleLogout}
    />
  );
};
