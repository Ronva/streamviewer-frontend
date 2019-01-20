import React from 'react';

export default ({ videoId }) => (
  <iframe
    className="video"
    title="title"
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    frameBorder="0"
    allowFullScreen
  />
);
