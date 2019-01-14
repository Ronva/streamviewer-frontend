import React, { useState, useRef, useEffect } from 'react';

export default ({ sendMessage }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    const res = sendMessage(input);
    if (res && !res.error) {
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
    <div className="chatInput">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};
