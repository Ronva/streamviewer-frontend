import React, { useState, useContext, useEffect } from 'react';
import { Context } from 'App';

import Chat from 'components/Chat';

import { postToApi, formatStats, useStream } from 'utils';

export default ({ streamId }) => {
  const { token } = useContext(Context);
  const { loading, error, isOffline, videoInfo, chat } = useStream(streamId);
  const [stats, setStats] = useState({});

  useEffect(
    () => {
      if (!error && videoInfo) setStats(formatStats(videoInfo));
    },
    [videoInfo]
  );

  const sendMessage = async input => {
    try {
      const { activeLiveChatId } = videoInfo.liveStreamingDetails;
      const snippet = {
        liveChatId: activeLiveChatId,
        type: 'textMessageEvent',
        textMessageDetails: {
          messageText: input
        }
      };
      const res = await postToApi(
        'liveChat/messages?part=snippet',
        {
          snippet
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const chatProps = { chat, isOffline, stats, sendMessage };

  return (
    <main role="main" className="stream">
      {error || loading || (
        <>
          <iframe
            className="video"
            title="title"
            src={`https://www.youtube.com/embed/${streamId}?enablejsapi=1&autoplay=1`}
            frameBorder="0"
            allowFullScreen
          />
          <Chat {...chatProps} />
        </>
      )}
    </main>
  );
};
