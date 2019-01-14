import React from 'react';
import { Link } from '@reach/router';

// import Authorized from 'components/Authroized';

import { mockVideos } from 'consts';
import { normalizeVideos, useFetchVideos } from 'utils';

export default () => {
  let videos = [];
  try {
    videos = useFetchVideos('gaming', 5, normalizeVideos(mockVideos));
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      {/*<Authorized fallback={<div className="notice">Please login.</div>}>*/}
      {/*</Authorized>*/}
      <main role="main" className="grid">
        {videos.map(({ videoId, thumbnails, title }) => (
          <Link key={videoId} to={`stream/${videoId}`} className="thumbnail">
            <img src={thumbnails.medium.url} alt="" />
            <div className="overlay">{title}</div>
          </Link>
        ))}
      </main>
    </>
  );
};
