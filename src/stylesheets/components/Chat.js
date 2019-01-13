import React, { useEffect } from 'react';
import { Socket } from 'phoenix/assets/js/phoenix';

export default () => {
  useEffect(() => {
    const socket = new Socket('/socket', {
      params: { token: window.userToken }
    });
    socket.connect();
    const channel = socket.channel('room:lobby', {});
    channel.join().receive('ok', res => {
      console.log('Joined successfully', res);
    });
  }, []);

  return (
    <div className="chat">
      <></>
    </div>
  );
};
