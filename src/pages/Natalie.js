import { Socket } from 'phoenix';
import React, { useContext, useEffect } from 'react';
import { Context } from 'App';

import Chat from 'components/Chat';

import { useFetchVideos, useStream } from 'utils';

const socket = new Socket('ws://localhost:4000/socket');
socket.connect();
const channel = socket.channel('room:natalie', {});

export default () => {
  const { updateGlobalState } = useContext(Context);

  const [video = {}] = useFetchVideos('gaming', 1);
  const { videoId = null } = video;
  const stream = useStream(videoId, false);
  const { loading, error } = stream;

  const sendMessage = message => {
    channel
      .push('shout', { body: message }, 10000)
      .receive('ok', msg => console.log('created message', msg))
      .receive('error', reasons => console.log('create failed', reasons))
      .receive('timeout', () => console.log('Networking issue...'));
  };

  useEffect(() => {
    channel.on('shout', payload => {
      console.log(payload);
    });
    return () => {};
  }, []);

  useEffect(() => {
    updateGlobalState({ property: 'stream', value: stream });
    return () => {
      updateGlobalState({ property: 'stream', value: null });
    };
  }, []);

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
          <Chat sendMessage={sendMessage} />
        </>
      )}
    </main>
  );
};
