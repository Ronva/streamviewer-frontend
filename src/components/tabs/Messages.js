import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from 'App';

import Message from 'components/Message';
import ChatInput from 'components/ChatInput';

export default () => {
  const { stream } = useContext(Context);
  const { messages, scrollInterval } = stream.chat;

  const [scrollPos, setScrollPos] = useState(0);
  const chatRef = useRef(null);

  const offline = <div className="streamOffline">Stream has ended.</div>;
  const input = <ChatInput />;

  const handleScroll = ({ target }) => setScrollPos(target.scrollTop);

  useEffect(() => {
    const { current } = chatRef;
    current.addEventListener('scroll', handleScroll);
    return () => {
      current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const { current } = chatRef;
    current.scrollTop = current.scrollHeight;
  }, [messages.length !== 0]);

  return (
    <>
      <section ref={chatRef} className="messages">
        {messages.map(({ id, ...message }, i) => (
          <Message
            key={id}
            content={message}
            scrollInterval={scrollInterval * i}
            chatPos={scrollPos}
          />
        ))}
      </section>
      {stream.isOffline ? offline : input}
    </>
  );
};
