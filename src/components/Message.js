import React, { useEffect, useRef } from 'react';

export default ({ content, scrollInterval }) => {
  const { displayName, messageText } = content;
  const ref = useRef(null);

  useEffect(
    () => {
      if (scrollInterval) {
        setTimeout(ref.current.scrollIntoView(), Math.min(scrollInterval, 250));
      }
    },
    [ref]
  );

  return (
    <div ref={ref} className="message item">
      <label className="author">{displayName} </label>
      {messageText}
    </div>
  );
};
