import React from 'react';
import { Link } from '@reach/router';

// import Authorized from 'components/Authroized';

import { mockVideos } from 'consts';
import { normalizeVideos, useFetchVideos } from 'utils';

export default () => {
  const videos = useFetchVideos('gaming', 20, normalizeVideos(mockVideos));

  return (
    <main role="main" className="grid">
      {videos.map(({ videoId, thumbnails, title }) => (
        <Link key={videoId} to={`stream/${videoId}`} className="thumbnail">
          <img src={thumbnails.medium.url} alt={title} />
          <div className="overlay">{title}</div>
        </Link>
      ))}
    </main>
  );
};
