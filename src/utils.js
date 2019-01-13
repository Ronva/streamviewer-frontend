import axios from 'axios';

export const fetchFromApi = async (endpoint, params = {}) =>
  await axios.get(`https://www.googleapis.com/youtube/v3/${endpoint}`, {
    params
  });

export const normalizeVideos = videos =>
  videos.map(item => ({
    videoId: item.id.videoId,
    ...item.snippet
  }));
