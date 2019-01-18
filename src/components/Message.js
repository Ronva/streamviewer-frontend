import React, { useEffect, useRef } from 'react';

export default ({ content, chatPos, scrollInterval = 0 }) => {
  const { displayName, messageText } = content;
  const ref = useRef(null);

  useEffect(() => {
    const { current } = ref;
    // Only scroll into view if user isn't scrolled up
    // to prevent jank while reading previous messages
    if (current.offsetTop - chatPos < 500) {
      setTimeout(current.scrollIntoView(), Math.min(scrollInterval, 250));
    }
  }, []);

  return (
    <div ref={ref} className="message item">
      <label className="author">{displayName} </label>
      {messageText}
    </div>
  );
};
