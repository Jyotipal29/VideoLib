import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { VideoReducer } from "./videoReducer";
const videoContext = createContext();
export const useVideo = () => {
  return useContext(videoContext);
};

export const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(VideoReducer, {
    videos: [],
    video: [],

    filteredVideos: [],
    watchLater: [],
    searchQuery: "",
  });

  return (
    <videoContext.Provider
      value={{
        videoState,
        videoDispatch,
      }}
    >
      {children}
    </videoContext.Provider>
  );
};
