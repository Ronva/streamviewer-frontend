import React, { useEffect, useState, useRef } from 'react';

import { fetchFromApi } from 'utils';
import { formatChatMessages } from 'consts';

const initialChat = {
  items: [],
  newItems: []
};

const Message = ({ content, scrollInterval }) => {
  const { displayName, messageText } = content;
  const ref = useRef(null);

  useEffect(
    () => {
      if (scrollInterval) {
        setTimeout(
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
          }),
          scrollInterval
        );
      }
    },
    [ref]
  );

  return (
    <div ref={ref} className="message">
      <span className="author">{displayName}</span>
      {messageText}
    </div>
  );
};

export default ({ streamId }) => {
  const [loading, setLoading] = useState('Loading.');
  const [error, setError] = useState(null);
  const [streamOffline, setStreamOffline] = useState(false);

  const [videoInfo, setInfo] = useState(null);
  const [chat, setChat] = useState(initialChat);

  const fetchChatReady = !error && !!videoInfo && !streamOffline;
  let chatTimeout = null;

  const fetchVideoInfo = async () => {
    try {
      const video = await fetchFromApi('videos', {
        id: streamId,
        part: 'snippet,contentDetails,statistics,liveStreamingDetails',
        key: process.env.REACT_APP_YOUTUBE_KEY
      });
      const [info] = video.data.items;
      setInfo(info);
    } catch (e) {
      console.log(e);
      setError('Error fetching video.');
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
          clearTimeout(chatTimeout);
          setStreamOffline(true);
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
        setStreamOffline(true);
      }
    } catch (e) {
      console.log(e);
      setError('Error fetching chat.');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchVideoInfo();
  }, []);

  useEffect(
    () => {
      if (fetchChatReady) {
        fetchChat();
      }
    },
    [videoInfo]
  );

  const messages =
    chat.items.length > 0
      ? formatChatMessages(chat.items).map(message => (
          <Message content={message} />
        ))
      : null;
  const newMessages =
    chat.newItems.length > 0
      ? formatChatMessages(chat.newItems).map((message, i) => (
          <Message content={message} scrollInterval={chat.scrollInterval * i} />
        ))
      : null;

  return (
    <>
      <button onClick={() => setStreamOffline(!streamOffline)}>
        fetch toggle
      </button>
      <main className="stream">
        {error || loading || (
          <>
            <iframe
              className="video"
              title="title"
              src={`https://www.youtube.com/embed/${streamId}?enablejsapi=1&autoplay=1`}
              frameBorder="0"
              allowFullScreen
            />
            <div className="chat">
              <div className="messages">
                {messages}
                {newMessages}
              </div>
              {streamOffline && (
                <div className="streamOffline">Stream has ended.</div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};
