import React, { useState, useRef, useEffect, useContext } from 'react';
import { Context } from 'App';

import classNames from 'classnames';
import Authorized from 'components/Authroized';

export default () => {
  const { stream } = useContext(Context);
  const { sendMessage } = stream;

  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (input) {
      try {
        sendMessage(input);
        setInput('');
      } catch (e) {
        setInputError(true);
        setTimeout(() => setInputError(false), 2500);

        console.log(e);
        return e;
      }
    }
  };

  useEffect(
    () => {
      inputRef.current && inputRef.current.focus();
    },
    [inputRef]
  );

  return (
    <Authorized>
      <div className="chatInputContainer">
        <input
          ref={inputRef}
          type="text"
          placeholder="Send a message"
          className={classNames('chatInput', { error: inputError })}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className={classNames('chatInputBtn', { error: inputError })}
          onClick={handleSendMessage}>
          {inputError ? 'Error' : 'Send'}
        </button>
      </div>
    </Authorized>
  );
};
