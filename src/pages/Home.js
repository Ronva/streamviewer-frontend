import React, { useEffect, useContext } from 'react';
import { Context } from 'App';

import { Link, navigate } from '@reach/router';

import { mockVideos } from 'consts';
import { normalizeVideos, useFetchVideos } from 'utils';

export default () => {
  const { token } = useContext(Context);
  const videos = useFetchVideos('gaming', 20, normalizeVideos(mockVideos));

  useEffect(
    () => {
      !token && navigate('/login');
    },
    [token]
  );

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
