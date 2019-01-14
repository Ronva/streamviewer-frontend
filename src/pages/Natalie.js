import React from 'react';

import Chat from 'components/Chat';

import { useFetchVideos, useStream } from 'utils';

export default () => {
  const [video = {}] = useFetchVideos('gaming', 1);
  const { videoId = null } = video;
  const { loading, error, videoInfo } = useStream(videoId, false);

  const sendMessage = () => {
    console.log(videoInfo);
  };

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
          <Chat sendMessage={sendMessage} stats={videoInfo} />
        </>
      )}
    </main>
  );
};
