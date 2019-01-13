import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'App';
import { Link } from '@reach/router';
import axios from 'axios';

import { fetchParams, mockVideos } from 'consts';
import { normalizeVideos } from 'utils';

const testVideos = normalizeVideos(mockVideos);

export default () => {
  const { token } = useContext(Context);
  const [videos, setVideos] = useState(testVideos);

  const fetchVideos = async () => {
    const { data } = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      { params: fetchParams }
    );

    const videos = normalizeVideos(data.items);
    setVideos(videos);
  };

  useEffect(
    () => {
      token ? fetchVideos() : setVideos(testVideos);
    },
    [token]
  );

  return (
    <main className="grid">
      {videos.map(({ videoId, channelId, thumbnails, title }) => (
        <Link key={videoId} to={`stream/${videoId}`} className="thumbnail">
          <img src={thumbnails.medium.url} alt="" />
          <div className="overlay">{title}</div>
        </Link>
      ))}
    </main>
  );
};
