import React, { useState, useRef, useEffect, useContext } from 'react';
import { Context } from 'App';

import Authorized from 'components/Authroized';

export default () => {
  const { stream } = useContext(Context);
  const { sendMessage } = stream;

  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSendMessage = async () => {
    if (input) {
      await sendMessage(JSON.stringify(input));
      setInput('');
    }
  };

  useEffect(
    () => {
      if (inputRef.current) inputRef.current.focus();
    },
    [inputRef]
  );

  return (
    <Authorized>
      <div className="chatInput">
        <input
          ref={inputRef}
          type="text"
          placeholder="Send a message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </Authorized>
  );
};
