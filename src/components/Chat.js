import React, { Suspense, useState, useEffect } from 'react';

import classNames from 'classnames';

import { ReactComponent as MessagesIcon } from 'assets/comments.svg';
import { ReactComponent as StatsIcon } from 'assets/stats.svg';
import { ReactComponent as UsersIcon } from 'assets/users.svg';

const Messages = React.lazy(() => import('components/tabs/Messages'));
const Stats = React.lazy(() => import('components/tabs/Stats'));
const Users = React.lazy(() => import('components/tabs/Users'));

const tabs = [
  { name: 'messages', icon: <MessagesIcon /> },
  { name: 'stats', icon: <StatsIcon /> },
  { name: 'users', icon: <UsersIcon /> }
];

export default () => {
  const defaultTab = tabs[0].name;
  const [selectedTab, setTab] = useState(defaultTab);

  useEffect(
    () => {
      if (!tabContent[selectedTab]) setTab(defaultTab);
    },
    [selectedTab]
  );

  const tabContent = {
    messages: <Messages />,
    stats: <Stats />,
    users: <Users />
  };

  return (
    <div className="chat">
      <div className="tabs">
        {tabs.map(({ name, icon }) => (
          <button
            key={name}
            className={classNames('tab', { active: selectedTab === name })}
            onClick={() => setTab(name)}>
            {icon}
          </button>
        ))}
      </div>
      <Suspense fallback={<section />}>{tabContent[selectedTab]}</Suspense>
    </div>
  );
};
