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
    </nav>
  );
};
