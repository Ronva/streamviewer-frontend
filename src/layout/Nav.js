import React from 'react';

import Authorized from 'components/Authroized';
import LoginBtn from 'components/LoginBtn';
import LogoutBtn from 'components/LogoutBtn';
import { Link } from '@reach/router';

import { ReactComponent as Logo } from 'assets/logo.svg';

export default () => {
  return (
    <nav>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <Authorized fallback={<LoginBtn />}>
        <LogoutBtn />
      </Authorized>
      {/*{token ? (*/}
      {/*<GoogleLogout*/}
      {/*render={({ onClick }) => <button onClick={onClick}>Logout</button>}*/}
      {/*onLogoutSuccess={handleLogout}*/}
      {/*/>*/}
      {/*) : (*/}
      {/*<GoogleLogin*/}
      {/*scope="https://www.googleapis.com/auth/youtube"*/}
      {/*clientId={process.env.REACT_APP_YOUTUBE_ID}*/}
      {/*render={({ onClick }) => <button onClick={onClick}>Login</button>}*/}
      {/*onSuccess={onLoginSuccess}*/}
      {/*onFailure={onLoginFailure}*/}
      {/*/>*/}
      {/*)}*/}
    </nav>
  );
};
