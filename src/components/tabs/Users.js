import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'App';

import { format } from 'date-fns';

import { formatChatMessages } from 'consts';

const UserList = ({ users, setUser, search }) => {
  return [...new Set(users)]
    .filter(user => user.toLowerCase().includes(search.toLowerCase()))
    .map(user => (
      <button key={user} className="item" onClick={() => setUser(user)}>
        <label>{user}</label>
      </button>
    ));
};

const UserMessages = ({ selectedUser, messages }) => {
  return messages
    .filter(({ displayName }) => displayName === selectedUser)
    .map(({ id, messageText, publishedAt }) => (
      <div key={id} className="message item">
        <label className="timestamp">{format(publishedAt, 'HH:mm')} </label>
        {messageText}
      </div>
    ));
};

export default React.memo(() => {
  const [title, setTitle] = useState('Users');
  const [selectedUser, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { stream } = useContext(Context);
  const messages = formatChatMessages(stream.chat.items);

  useEffect(() => {
    const initialUserList = messages.map(({ displayName }) => displayName);
    setUsers(initialUserList);
  }, []);

  useEffect(
    () => {
      const newUsers = messages
        .filter(({ displayName }) => !users.includes(displayName))
        .map(({ displayName }) => displayName);
      setUsers(oldList => [...oldList, ...newUsers]);
    },
    [messages]
  );

  useEffect(
    () => {
      setTitle(selectedUser || 'Users');
    },
    [selectedUser]
  );

  const back = (
    <button className="back" onClick={() => setUser(null)}>
      back
    </button>
  );
  const userSearch = (
    <input
      type="text"
      placeholder="Search users"
      className="userSearch"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );

  const listProps = { setUser, users, search };
  const messagesProps = { selectedUser, messages };

  const userList = <UserList {...listProps} />;
  const userMessages = <UserMessages {...messagesProps} />;

  return (
    <>
      <h3 className="title">{title}</h3>
      {selectedUser ? back : userSearch}
      <section className="users">
        {selectedUser ? userMessages : userList}
      </section>
    </>
  );
});
