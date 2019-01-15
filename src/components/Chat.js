import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import Messages from 'components/tabs/Messages';
import Stats from 'components/tabs/Stats';
import Users from 'components/tabs/Users';

import { ReactComponent as MessagesIcon } from 'assets/comments.svg';
import { ReactComponent as StatsIcon } from 'assets/stats.svg';
import { ReactComponent as UsersIcon } from 'assets/users.svg';

const tabs = [
  { name: 'messages', icon: <MessagesIcon /> },
  { name: 'stats', icon: <StatsIcon /> },
  { name: 'users', icon: <UsersIcon /> }
];

export default ({ sendMessage }) => {
  const defaultTab = tabs[0].name;
  const [selectedTab, setTab] = useState(defaultTab);

  useEffect(
    () => {
      if (!tabContent[selectedTab]) setTab(defaultTab);
    },
    [selectedTab]
  );

  const tabContent = {
    messages: <Messages sendMessage={sendMessage} />,
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
      {tabContent[selectedTab]}
    </div>
  );
};
