import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { Context } from 'App';

export default () => {
  const { updateGlobalState } = useContext(Context);

  const handleLogout = () =>
    updateGlobalState({ property: 'token', value: null });

  return (
    <GoogleLogout
      render={({ onClick }) => <button onClick={onClick}>Logout</button>}
      onLogoutSuccess={handleLogout}
    />
  );
};
