import React, { useContext, useEffect } from 'react';
import { Context } from 'App';

import Video from 'components/Video';
import Chat from 'components/Chat';

import { postToApi, useStream } from 'utils';

export default ({ videoId }) => {
  const { user } = useContext(Context);

  const stream = useStream(videoId);
  const { loading, error, videoInfo, streamDispatch } = stream;

  const sendMessage = input => {
    const { activeLiveChatId } = videoInfo.liveStreamingDetails;
    const data = {
      snippet: {
        liveChatId: activeLiveChatId,
        type: 'textMessageEvent',
        textMessageDetails: {
          messageText: input
        }
      }
    };
    const config = {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    };

    postToApi('liveChat/messages?part=snippet', data, config);
  };

  useEffect(() => {
    streamDispatch({
      property: 'sendMessage',
      value: sendMessage
    });
  }, []);

  return (
    <main role="main" className="stream">
      {error || (loading && 'Loading...') || (
        <>
          <Video videoId={videoId} />
          <Chat />
        </>
      )}
    </main>
  );
};
