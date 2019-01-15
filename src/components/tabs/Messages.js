import React, { useContext } from 'react';
import { Context } from 'App';

import Message from 'components/Message';
import ChatInput from 'components/ChatInput';

import { formatChatMessages } from 'consts';

export default React.memo(({ sendMessage }) => {
  const { stream } = useContext(Context);
  const { items, scrollInterval } = stream.chat;

  const offline = <div className="streamOffline">Stream has ended.</div>;
  const input = <ChatInput sendMessage={sendMessage} />;

  return (
    <>
      <section className="messages">
        {formatChatMessages(items).map(({ id, ...message }, i) => (
          <Message
            key={id}
            content={message}
            scrollInterval={scrollInterval * i}
          />
        ))}
      </section>
      {stream.isOffline ? offline : input}
    </>
  );
});
