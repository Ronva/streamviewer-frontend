import React, { useContext, useEffect } from 'react';
import { Context } from 'App';

import Chat from 'components/Chat';

import { postToApi, useStream } from 'utils';

export default ({ streamId }) => {
  const { token, updateGlobalState } = useContext(Context);
  const stream = useStream(streamId);
  const { loading, error, videoInfo } = stream;

  const sendMessage = async input => {
    try {
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
        headers: { Authorization: `Bearer ${token}` }
      };

      await postToApi('liveChat/messages?part=snippet', data, config);
    } catch (e) {
      console.log(e);
      return e;
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
    [stream]
  );

  return (
    <main role="main" className="stream">
      {error || (loading && 'Loading...') || (
        <>
          <iframe
            className="video"
            title="title"
            src={`https://www.youtube.com/embed/${streamId}?enablejsapi=1&autoplay=1`}
            frameBorder="0"
            allowFullScreen
          />
          <Chat sendMessage={sendMessage} />
        </>
      )}
    </main>
  );
};
