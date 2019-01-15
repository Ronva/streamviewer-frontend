import nataliethumbnail from 'assets/natalie-thumbnail.png';

export const initialStreamState = {
  loading: 'Loading',
  error: null,
  isOffline: false,
  videoInfo: null,
  stats: {},
  chat: {
    items: []
  }
};

export const GenericReducer = (state, { property, value }) => {
  return {
    ...state,
    [property]: value
  };
};

export const formatChatMessages = items =>
  items
    .filter(({ snippet }) => snippet && snippet.textMessageDetails)
    .reduce((acc, { id, authorDetails, snippet }) => {
      const { displayName } = authorDetails;
      const { publishedAt, textMessageDetails } = snippet;
      const { messageText } = textMessageDetails;
      return acc.concat({ id, displayName, messageText, publishedAt });
    }, []);

export const mockVideos = [
  {
    id: { videoId: 'natalie' },
    snippet: {
      title: "Natalie's Stream",
      thumbnails: {
        medium: {
          url: nataliethumbnail
        }
      }
    }
  },
  {
    kind: 'youtube#searchResult',
    etag: '"XI7nbFXulYBIpL0ayR_gDh3eu1k/Opah0Kz6lPMuNoc0d_Hg8nbBGug"',
    id: {
      kind: 'youtube#video',
      videoId: 'sMy5LSONHMg'
    },
    snippet: {
      publishedAt: '2019-01-08T19:32:00.000Z',
      channelId: 'UCJgeIKtSa1MDS2jy8bWJlRA',
      title: 'FREE FIRE: RANKEADA FT. FX GAMING- AS. BLACK444- AS PRINCE',
      description:
        'Support the stream: https://streamlabs.com/coreano0exc ID DA CUBE: 18033046.',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/sMy5LSONHMg/default_live.jpg',
          width: 120,
          height: 90
        },
        medium: {
          url: 'https://i.ytimg.com/vi/sMy5LSONHMg/mqdefault_live.jpg',
          width: 320,
          height: 180
        },
        high: {
          url: 'https://i.ytimg.com/vi/sMy5LSONHMg/hqdefault_live.jpg',
          width: 480,
          height: 360
        }
      },
      channelTitle: 'Coreano0 Tv',
      liveBroadcastContent: 'live'
    }
  },
  {
    kind: 'youtube#searchResult',
    etag: '"XI7nbFXulYBIpL0ayR_gDh3eu1k/o-QWxG09Gc2ryljwKLdq3zaKSHM"',
    id: {
      kind: 'youtube#video',
      videoId: '6KVjo36lrSw'
    },
    snippet: {
      publishedAt: '2018-03-04T10:58:40.000Z',
      channelId: 'UCNqFDjYTexJDET3rPDrmJKg',
      title: '24/7 Lofi Hiphop Radio - Beats to Study/Game/Relax',
      description:
        '24/7 Lofi Hiphop Radio - Beats to Study/Game/Relax ▻ Lofi HipHop Playlist: https://bit.ly/2yZGf41 ○ Follow me on spotify: ...',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/6KVjo36lrSw/default_live.jpg',
          width: 120,
          height: 90
        },
        medium: {
          url: 'https://i.ytimg.com/vi/6KVjo36lrSw/mqdefault_live.jpg',
          width: 320,
          height: 180
        },
        high: {
          url: 'https://i.ytimg.com/vi/6KVjo36lrSw/hqdefault_live.jpg',
          width: 480,
          height: 360
        }
      },
      channelTitle: '7clouds',
      liveBroadcastContent: 'live'
    }
  },
  {
    kind: 'youtube#searchResult',
    etag: '"XI7nbFXulYBIpL0ayR_gDh3eu1k/lJsCYXd6RrPRHvH6lY-jK_oQeno"',
    id: {
      kind: 'youtube#video',
      videoId: 'GVC5adzPpiE'
    },
    snippet: {
      publishedAt: '2017-11-22T15:36:35.000Z',
      channelId: 'UCMwePVHRpDdfeUcwtDZu2Dw',
      title:
        'NCS 24/7 Live Stream 🎵 Gaming Music Radio | NoCopyrightSounds| Dubstep, Trap, EDM, Electro House',
      description:
        "NCS 24/7 Live Stream Gaming Music Radio | NoCopyrightSounds| Dubstep, Trap, EDM, Electro House ✅ Follow Monstafluff's Spotfy Playlists: ...",
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/GVC5adzPpiE/default_live.jpg',
          width: 120,
          height: 90
        },
        medium: {
          url: 'https://i.ytimg.com/vi/GVC5adzPpiE/mqdefault_live.jpg',
          width: 320,
          height: 180
        },
        high: {
          url: 'https://i.ytimg.com/vi/GVC5adzPpiE/hqdefault_live.jpg',
          width: 480,
          height: 360
        }
      },
      channelTitle: 'Monstafluff Music',
      liveBroadcastContent: 'live'
    }
  }
];
