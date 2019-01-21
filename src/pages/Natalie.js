import { Socket } from 'phoenix';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'App';

import Video from 'components/Video';
import Chat from 'components/Chat';

import { useFetchVideos, useStream } from 'utils';

export default () => {
  const { user } = useContext(Context);
  const [initialized, setInit] = useState(false);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  const [video = {}] = useFetchVideos('gaming', 1);
  const { videoId = null } = video;
  const stream = useStream(videoId, false);
  const { loading, error, streamDispatch } = stream;

  const handleInit = ({ messages: initialMessages }) => {
    setMessages(initialMessages);
  };

  const handleShout = ({ message }) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const sendMessage = messageText => {
    const { accessToken, googleId, profileObj } = user;
    channel.push('shout', {
      accessToken,
      googleId,
      displayName: profileObj.name,
      messageText
    });
  };

  useEffect(() => {
    let socket = new Socket(
      `${process.env.REACT_APP_SOCKET_ADDRESS}/socket`,
      {}
    );
    socket.connect();

    let newChannel = socket.channel('natalie:lobby');

    newChannel.on('initialize', handleInit);
    newChannel.on('shout', handleShout);

    newChannel
      .join()
      .receive('ok', () => setInit(true))
      .receive('error', res => {
        console.log('Error connecting to socket.', res);
      });

    setChannel(newChannel);
  }, []);

  useEffect(() => {
    if (channel && initialized) {
      streamDispatch({ property: 'sendMessage', value: sendMessage });
    }
  }, [channel, initialized]);

  useEffect(() => {
    streamDispatch({
      property: 'chat',
      value: { messages }
    });
  }, [messages]);

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
