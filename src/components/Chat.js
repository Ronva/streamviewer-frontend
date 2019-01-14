import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import Authorized from 'components/Authroized';
import Message from 'components/Message';
import ChatInput from 'components/ChatInput';

import { formatChatMessages } from 'consts';
import { ReactComponent as Messages } from 'assets/comments.svg';
import { ReactComponent as Stats } from 'assets/stats.svg';
import { ReactComponent as Users } from 'assets/users.svg';

const tabs = [
  { name: 'chat', icon: <Messages /> },
  { name: 'stats', icon: <Stats /> },
  { name: 'users', icon: <Users /> }
];

export default ({ chat = {}, stats, isOffline, sendMessage }) => {
  const defaultTab = tabs[0].name;
  const [selectedTab, setTab] = useState(defaultTab);
  const { items = [], newItems = [] } = chat;

  const messages = formatChatMessages(items).map(({ id, ...message }) => (
    <Message key={id} content={message} />
  ));
  const newMessages = formatChatMessages(newItems).map(
    ({ id, ...message }, i) => (
      <Message
        key={id}
        content={message}
        scrollInterval={chat.scrollInterval * i}
      />
    )
  );
  const offline = <div className="streamOffline">Stream has ended.</div>;
  const input = (
    <Authorized>
      <ChatInput sendMessage={sendMessage} />
    </Authorized>
  );

  const tabContent = {
    chat: (
      <section className="messages">
        {messages}
        {newMessages}
      </section>
    ),
    stats: (
      <section className="stats">
        <h3>Statistics</h3>
        {Object.entries(stats).map(([label, info]) => (
          <div key={label} className="stat">
            <label>{label}:</label> {info}
          </div>
        ))}
      </section>
    ),
    users: (
      <section className="users">
        <h3>Users</h3>
      </section>
    )
  };

  useEffect(
    () => {
      if (!tabContent[selectedTab]) setTab(defaultTab);
    },
    [selectedTab]
  );

  return (
    <div className="chat">
      <div className="tabs">
        {tabs.map(({ name, icon }) => (
          <button
            key={name}
            className={classNames(`${name}Tab`, 'tab', {
              active: selectedTab === name
            })}
            onClick={() => setTab(name)}>
            {icon}
          </button>
        ))}
      </div>
      {tabContent[selectedTab]}
      {isOffline ? offline : input}
    </div>
  );
};
