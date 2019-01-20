import { Socket } from 'phoenix';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'App';

import Video from 'components/Video';
import Chat from 'components/Chat';

import { useFetchVideos, useStream } from 'utils';

let socket = new Socket(`${process.env.REACT_APP_SOCKET_ADDRESS}/socket`, {});
socket.connect();
let channel = socket.channel('natalie:lobby');

export default () => {
  const { user } = useContext(Context);
  const [messages, setMessages] = useState(null);

  const [video = {}] = useFetchVideos('gaming', 1);
  const { videoId = null } = video;
  const stream = useStream(videoId, false);
  const { loading, error, streamDispatch } = stream;

  useEffect(() => {
    channel
      .join()
      .receive('ok', () => console.log('Successfully connected to socket.'))
      .receive('error', res => {
        console.log('Error connecting to socket.', res);
      });

    channel.on('shout', ({ message }) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    channel.on('initialize', ({ messages: initialMessages }) => {
      setMessages(initialMessages);
    });
  }, []);

  useEffect(
    () => {
      if (channel && !messages) {
        channel.push('shout', { init: true });
      }
    },
    [channel]
  );

  useEffect(
    () => {
      if (messages) {
        streamDispatch({
          property: 'chat',
          value: { messages }
        });
      }
    },
    [messages]
  );

  const sendMessage = messageText => {
    const { accessToken, googleId, profileObj } = user;
    channel.push('shout', {
      accessToken,
      googleId,
      displayName: profileObj.name,
      messageText
    });
  };

  useEffect(
    () => {
      if (user) {
        streamDispatch({ property: 'sendMessage', value: sendMessage });
      }
    },
    [user]
  );

  return (
    <main role="main" className="stream">
      {error || loading || (
        <>
          <Video videoId={videoId} />
          <Chat />
        </>
      )}
    </main>
  );
};
