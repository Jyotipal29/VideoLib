import { createContext, useContext, useReducer } from "react";
import { playlistReducer } from "./playlistReducer";
import uuid from "react-uuid";
export const PlaylistContext = createContext();
export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

const initialPlaylist = [
  {
    id: uuid(),
    name: "jyoti",
    videos: [],
  },
];
export const PlaylistProvider = ({ children }) => {
  const [{ playlists }, playlistDispatch] = useReducer(playlistReducer, {
    playlists: initialPlaylist,
  });
  return (
    <PlaylistContext.Provider value={{ playlists, playlistDispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};
