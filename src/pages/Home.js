import React, { useEffect, useContext } from 'react';
import { Context } from 'App';

import { Link, navigate } from '@reach/router';
import Authorized from 'components/Authroized';

import { natalie } from 'consts';
import { useFetchVideos } from 'utils';

export default () => {
  const { user } = useContext(Context);
  const videos = useFetchVideos('gaming', 19);

  useEffect(() => {
    !user && navigate('/login');
  }, [user]);

  return (
    <Authorized>
      <main role="main" className="grid">
        {[natalie, ...videos].map(({ videoId, thumbnail, title }) => (
          <Link key={videoId} to={`stream/${videoId}`} className="thumbnail">
            <img src={thumbnail} alt={title} />
            <div className="overlay">{title}</div>
          </Link>
        ))}
      </main>
    </Authorized>
  );
};
