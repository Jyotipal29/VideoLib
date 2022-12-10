import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/userContext/userContext";
import { VideoProvider } from "./context/videoContext/videoContext";
import { PlaylistProvider } from "./context/playlistContext/playlistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <VideoProvider>
        <PlaylistProvider>
          <App />
        </PlaylistProvider>
      </VideoProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
