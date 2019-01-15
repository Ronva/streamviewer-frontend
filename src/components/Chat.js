import React, { useState, useEffect, useContext } from 'react';
import { Context } from 'App';

import { format } from 'date-fns';
import classNames from 'classnames';
import Authorized from 'components/Authroized';
import Message from 'components/Message';
import ChatInput from 'components/ChatInput';

import { formatChatMessages } from 'consts';
import { ReactComponent as MessagesIcon } from 'assets/comments.svg';
import { ReactComponent as StatsIcon } from 'assets/stats.svg';
import { ReactComponent as UsersIcon } from 'assets/users.svg';

const tabs = [
  { name: 'messages', icon: <MessagesIcon /> },
  { name: 'stats', icon: <StatsIcon /> },
  { name: 'users', icon: <UsersIcon /> }
];

const Messages = React.memo(() => {
  const { stream } = useContext(Context);
  const { items, scrollInterval } = stream.chat;
  return (
    <section className="messages">
      <div className="list">
        {formatChatMessages(items).map(({ id, ...message }, i) => (
          <Message
            key={id}
            content={message}
            scrollInterval={scrollInterval * i}
          />
        ))}
      </div>
    </section>
  );
});

const Stats = () => {
  const { stream } = useContext(Context);
  const { stats } = stream;
  return (
    <>
      <h3 className="title">Statistics</h3>
      <section className="stats">
        <div className="list">
          {Object.entries(stats).map(([label, info]) => (
            <div key={label} className="item">
              <label>{label}:</label> {info}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const Users = React.memo(() => {
  const [title, setTitle] = useState('Users');
  const [selectedUser, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const { stream } = useContext(Context);
  const messages = formatChatMessages(stream.chat.items);

  const users = messages.map(({ displayName }) => displayName);
  const userList = (
    <>
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="list">
        {[...new Set(users)]
          .filter(user => user.toLowerCase().includes(search.toLowerCase()))
          .map(user => (
            <button key={user} className="item" onClick={() => setUser(user)}>
              <label>{user}</label>
            </button>
          ))}
      </div>
    </>
  );
  const userMessages = (
    <>
      <button className="back" onClick={() => setUser(null)}>
        back
      </button>
      <div className="list">
        {selectedUser &&
          messages
            .filter(({ displayName }) => displayName === selectedUser)
            .map(({ id, messageText, publishedAt }) => (
              <div key={id} className="message item">
                <label>{format(publishedAt, 'HH:mm')} </label>
                {messageText}
              </div>
            ))}
      </div>
    </>
  );

  useEffect(
    () => {
      setTitle(selectedUser || 'Users');
    },
    [selectedUser]
  );

  return (
    <>
      <h3 className="title">{title}</h3>
      <section className="users">
        {selectedUser ? userMessages : userList}
      </section>
    </>
  );
});

export default ({ sendMessage }) => {
  const { stream } = useContext(Context);

  const defaultTab = tabs[0].name;
  const [selectedTab, setTab] = useState(defaultTab);

  useEffect(
    () => {
      if (!tabContent[selectedTab]) setTab(defaultTab);
    },
    [selectedTab]
  );

  const offline = <div className="streamOffline">Stream has ended.</div>;
  const input = (
    <Authorized>
      <ChatInput sendMessage={sendMessage} />
    </Authorized>
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
      {tabContent[selectedTab]}
      {stream.isOffline ? offline : input}
    </div>
  );
};
