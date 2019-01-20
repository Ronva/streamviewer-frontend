import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Context } from 'App';
import axios from 'axios';

import { format } from 'date-fns';
import { formatChatMessages, GenericReducer, initialStreamState } from 'consts';

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

export const verifyToken = async accessToken => {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/tokeninfo`,
    {
      params: { access_token: accessToken }
    }
  );
  const { audience, user_id, scope, expires_in } = data;
  return audience && user_id && scope && expires_in;
};

export const onLoginFailure = res => console.log(res);

export const normalizeVideos = videos =>
  videos.map(item => ({
    ...item.snippet,
    videoId: item.id.videoId,
    thumbnail: item.snippet.thumbnails.medium.url
  }));

export const formatStats = stats => {
  const {
    liveStreamingDetails: { concurrentViewers, actualStartTime },
    statistics: { dislikeCount, viewCount, likeCount }
  } = stats;

  return {
    Viewers: concurrentViewers,
    'Start time': format(actualStartTime, 'MMM Do YYYY, h:mma'),
    Likes: likeCount,
    Dislikes: dislikeCount,
    'Total views': viewCount
  };
};

export const useFetchVideos = (query, maxResults, initial = []) => {
  const { user } = useContext(Context);
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
      user ? fetchVideos() : setVideos(initial);
    },
    [user, query]
  );

  return videos;
};

export const useStream = (id, withChat = true) => {
  const { updateGlobalState } = useContext(Context);
  const [state, dispatch] = useReducer(GenericReducer, initialStreamState);
  const { error, videoInfo, isOffline, chat } = state;

  const fetchChatReady = !error && videoInfo && !isOffline && withChat;
  let chatTimeout = null;

  const fetchVideoInfo = async () => {
    const { data } = await fetchFromApi('videos', {
      id,
      part: 'snippet,contentDetails,statistics,liveStreamingDetails',
      key: process.env.REACT_APP_YOUTUBE_KEY
    });
    const { items, pageInfo } = data;
    if (pageInfo.totalResults === 0) {
      dispatch({
        property: 'error',
        value: <span className="notice">Video not found</span>
      });
    } else {
      const [info] = items;
      dispatch({ property: 'videoInfo', value: info });
    }
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
          dispatch({ property: 'isOffline', value: true });
        } else {
          const { pollingIntervalMillis } = newChat;
          const messages = formatChatMessages([
            ...chat.messages,
            ...newChat.items
          ]);
          await dispatch({
            property: 'chat',
            value: {
              scrollInterval: pollingIntervalMillis / newChat.items.length,
              messages
            }
          });
          chatTimeout = setTimeout(
            () => fetchChat(newChat.nextPageToken),
            pollingIntervalMillis
          );
        }
      } else {
        dispatch({ property: 'isOffline', value: true });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        property: 'error',
        value: <span className="notice">Error fetching chat</span>
      });
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
      if (videoInfo) {
        dispatch({
          property: 'stats',
          value: formatStats(videoInfo)
        });
      }
      if (fetchChatReady) fetchChat();
      dispatch({ property: 'loading', value: false });

      return () => {
        clearTimeout(chatTimeout);
      };
    },
    [videoInfo]
  );

  useEffect(
    () => {
      updateGlobalState({
        property: 'stream',
        value: state
      });
    },
    [state]
  );

  return { ...state, streamDispatch: dispatch };
};
