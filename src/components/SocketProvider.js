import React, { useEffect } from 'react';
import { Socket } from 'phoenix';

const SocketContext = React.createContext();

export default ({ wsUrl, options, children }) => {
  const socket = new Socket(wsUrl, { params: options });
  useEffect(
    () => {
      socket.connect();
    },
    [options, wsUrl]
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
