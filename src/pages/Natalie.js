import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'App';

import Chat from 'components/Chat';

import { useFetchVideos, useStream } from 'utils';

export default () => {
  const { user, socket, updateGlobalState } = useContext(Context);
  const [channel, setChannel] = useState(null);

  const [video = {}] = useFetchVideos('gaming', 1);
  const { videoId = null } = video;
  const stream = useStream(videoId, false);
  const { loading, error, chat, streamDispatch } = stream;

  useEffect(() => {
    const newChannel = socket.channel('natalie:lobby', {});

    newChannel
      .join()
      .receive('ok', () => console.log('Successfully connected to socket.'))
      .receive('error', res => {
        console.log('Error connecting to socket.', res);
      });

    newChannel.on('shout', ({ messages }) => {
      streamDispatch({
        property: 'chat',
        value: {
          messages: [...chat.messages, ...messages]
        }
      });
    });

    setChannel(newChannel);
  }, []);

  const sendMessage = messageText => {
    try {
      const { accessToken, googleId, profileObj } = user;
      const toSend = {
        accessToken,
        googleId,
        messageText,
        displayName: profileObj.name
      };

      channel.push('shout', toSend);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(
    () => {
      updateGlobalState({
        property: 'stream',
        value: { ...stream, sendMessage }
      });
      return () => {
        updateGlobalState({ property: 'stream', value: null });
      };
    },
    [!stream.videoInfo]
  );

  return (
    <main role="main" className="stream">
      {error || loading || (
        <>
          <iframe
            className="video"
            title="title"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`}
            frameBorder="0"
            allowFullScreen
          />
          <Chat />
        </>
      )}
    </main>
  );
};
