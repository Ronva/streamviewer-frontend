import { useContext, useEffect, useState } from 'react';
import { Context } from 'App';
import axios from 'axios';

import { format } from 'date-fns';
import { initialChatState } from 'consts';

export const fetchFromApi = async (endpoint, params = {}) =>
  await axios.get(`https://www.googleapis.com/youtube/v3/${endpoint}`, {
    params
  });

export const postToApi = async (endpoint, data = {}, config = {}) =>
  await axios.post(
    `https://www.googleapis.com/youtube/v3/${endpoint}`,
    data,
    config
  );

export const onLoginSuccess = async ({ accessToken }) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/tokeninfo`,
    {
      params: {
        access_token: accessToken
      }
    }
  );
  const { audience, user_id, scope, expires_in } = data;

  if (audience && user_id && scope && expires_in) {
    return accessToken;
  }
};

export const onLoginFailure = res => console.log(res);

export const normalizeVideos = videos =>
  videos.map(item => ({
    videoId: item.id.videoId,
    ...item.snippet
  }));

export const formatStats = stats => {
  const {
    liveStreamingDetails: { concurrentViewers, actualStartTime },
    statistics: { dislikeCount, viewCount, likeCount }
  } = stats;

  return {
    Viewers: concurrentViewers,
    'Start time': format(actualStartTime, 'MMM Do, H:mm'),
    Likes: likeCount,
    Dislikes: dislikeCount,
    'Total views': viewCount
  };
};

export const useFetchVideos = (query, maxResults, initial = []) => {
  const { token } = useContext(Context);
  const [videos, setVideos] = useState(initial);

  const fetchVideos = async () => {
    const { data } = await fetchFromApi('search', {
      q: query,
      maxResults,
      part: 'snippet',
      eventType: 'live',
      type: 'video',
      order: 'viewCount',
      videoEmbeddable: true,
      key: process.env.REACT_APP_YOUTUBE_KEY
    });

    const videos = normalizeVideos(data.items);
    setVideos(videos);
  };

  useEffect(
    () => {
      token ? fetchVideos() : setVideos(initial);
    },
    [token, query]
  );

  return videos;
};

export const useStream = (id, withChat = true) => {
  const [loading, setLoading] = useState('Loading.');
  const [error, setError] = useState(null);
  const [isOffline, setOffline] = useState(false);
  const [videoInfo, setInfo] = useState(null);
  const [chat, setChat] = useState(initialChatState);

  const fetchChatReady = !error && videoInfo && !isOffline && withChat;
  let chatTimeout = null;

  const fetchVideoInfo = async () => {
    const { data } = await fetchFromApi('videos', {
      id,
      part: 'snippet,contentDetails,statistics,liveStreamingDetails',
      key: process.env.REACT_APP_YOUTUBE_KEY
    });
    const [info] = data.items;
    setInfo(info);
  };

  const fetchChat = async (nextPageToken = null) => {
    try {
      const { activeLiveChatId } = videoInfo.liveStreamingDetails;
      if (activeLiveChatId) {
        const { data } = await fetchFromApi('liveChat/messages', {
          liveChatId: activeLiveChatId,
          part: 'snippet,authorDetails',
          key: process.env.REACT_APP_YOUTUBE_KEY,
          ...(nextPageToken ? { nextPageToken } : {})
        });
        const { offlineAt, ...newChat } = data;
        if (offlineAt) {
          clearTimeout(chatTimeout);
          setOffline(true);
        } else {
          const {
            items: newItems,
            nextPageToken: newToken,
            pollingIntervalMillis
          } = newChat;
          await setChat({
            scrollInterval: pollingIntervalMillis / newItems.length,
            items: [...chat.items, ...chat.newItems],
            newItems
          });
          chatTimeout = setTimeout(
            () => fetchChat(newToken),
            pollingIntervalMillis
          );
        }
      } else {
        setOffline(true);
      }
    } catch (e) {
      console.log(e);
      setError('Error fetching chat.');
    }
  };

  useEffect(
    () => {
      id && fetchVideoInfo();
    },
    [id]
  );

  useEffect(
    () => {
      if (fetchChatReady) fetchChat();
      setLoading(false);
      return () => {
        clearTimeout(chatTimeout);
      };
    },
    [videoInfo]
  );

  return { loading, error, isOffline, setOffline, videoInfo, chat };
};
