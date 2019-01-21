import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'App';

import { format } from 'date-fns';
import classNames from 'classnames';

import { ReactComponent as Filter } from 'assets/filter.svg';

const UserList = React.memo(({ sortedUsers, setUser }) => {
  return sortedUsers.map(user => (
    <button key={user} className="item" onClick={() => setUser(user)}>
      <label>{user}</label>
    </button>
  ));
});

const UserMessages = React.memo(({ selectedUser, messages }) => {
  return messages
    .filter(({ displayName }) => displayName === selectedUser)
    .map(({ id, messageText, publishedAt }) => (
      <div key={id} className="message item">
        <label className="timestamp">{format(publishedAt, 'HH:mm')} </label>
        {messageText}
      </div>
    ));
});

export default () => {
  const [title, setTitle] = useState('Users');
  const [selectedUser, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('activity');
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSorted] = useState([]);

  const { stream } = useContext(Context);
  const { messages } = stream.chat;

  useEffect(() => {
    const newUsers = messages.reduce((acc, message) => {
      const { displayName: dn, id } = message;
      if (!users[dn]) {
        acc[dn] = {
          ids: !acc[dn] ? [id] : [...acc[dn].ids, id],
          index: Object.keys(users).length + Object.keys(acc).length
        };
      } else {
        const { ids, index } = users[dn];
        acc[dn] = {
          ids: [...ids, id],
          index
        };
      }
      return acc;
    }, {});
    setUsers(newUsers);
  }, [messages]);

  useEffect(() => {
    const newList = Object.keys(users);
    let sorted;
    switch (sort) {
      case 'alphabetic':
        sorted = newList.sort((a, b) => (a > b ? 1 : -1));
        break;
      case '# of messages':
        sorted = newList.sort(
          (a, b) => users[b].ids.length - users[a].ids.length
        );
        break;
      default:
        sorted = newList.sort((a, b) => users[a].index - users[b].index);
        break;
    }

    sorted = sorted.filter(user =>
      user.toLowerCase().includes(search.toLowerCase())
    );
    setSorted(sorted);
  }, [users, sort, search]);

  useEffect(() => {
    setTitle(selectedUser || 'Users');
  }, [selectedUser]);

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
  const userSort = (
    <div className="userSort">
      <label>
        <Filter />
      </label>
      {['activity', 'alphabetic', '# of messages'].map(option => (
        <button
          key={option}
          className={classNames('option', 'plain', { active: option === sort })}
          onClick={() => setSort(option === sort ? 'activity' : option)}>
          {option}
        </button>
      ))}
    </div>
  );

  const listProps = { setUser, sortedUsers };
  const messagesProps = { selectedUser, messages };

  const userList = <UserList {...listProps} />;
  const userMessages = <UserMessages {...messagesProps} />;

  return (
    <>
      <h3 className="title">{title}</h3>
      {!selectedUser && userSort}
      <section className="users">
        {selectedUser ? userMessages : userList}
      </section>
      {selectedUser ? back : userSearch}
    </>
  );
};
