# StreamViewer Frontend

StreamViewer is built using React with the new [hooks API](https://reactjs.org/docs/hooks-reference.html). Routing is managed by [Reach Router](https://reach.tech/router). All YouTube API logic is handled on the frontend using Google oAuth 2. Upon login and every time the user chats the Google access token is verified to make sure it is always valid. 

The video query is "gaming" and videos are sorted by views in descending order.

## UI
The website is styled using SCSS and is entirely responsive on modern browsers. Since newer CSS properties such as Grid have been used, there is no guarantee that low usage browsers will display the layout properly at smaller resolutions, although all of the CSS is autoprefixed so coverage should be good. 

The homepage is a simple grid of stream thumbnails, the first of which is always Natalie's stream. Stream titles show on hover. Each thumbnail leads to a route based on that stream's video ID. The only exception to this is Natalie's stream, which leads to /stream/natalie.

![StreamViewer Homepage](https://i.imgur.com/HfT2CrD.jpg)

A stream page consists of two main components, the video and chat area. The video is a simple iframe that embeds the stream using the video ID passed to page through the URL. In the case of Natalie's stream since there's no video ID, first a random video is queried from YouTube (with the same options as the videos on the homepage) before loading the stream.

![Stream Page](https://i.imgur.com/AaHAlkS.jpg)

The chat area is divided into three sections, represented as tabs. The three sections are: messages, statistics and users.

#### Messages
This is the stream's chatroom. Scrolling up a few messages will lock chat scrolling so that the user can read messages without the window jumping around. When chatting in a regular stream messages are sent through the YouTube API and when chatting in Natalie's stream they are sent to the custom [Elixir Phoenix backend](https://github.com/Ronva/streamviewer-backend) which handles the custom chat.
![Messages Tab](https://i.imgur.com/gUhNRDd.png)

#### Statistics
General statistics about the stream.
![Statistics Tab](https://i.imgur.com/hRcRpEq.png)

#### Users
List of all users in chat. Can be sorted by activity, alphabetical order or number of messages in descending order.
![Users Tab](https://i.imgur.com/GdnuUQR.png)

