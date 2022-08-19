export const VideoReducer = (videoState, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        videos: action.payload,
      };
    case "GET_VIDEO":
      return {
        video: action.payload,
      };
    case "FILTER":
      return {
        ...videoState,
        filteredVideos: action.payload,
      };
    case "LIKE":
      return {
        ...videoState,
        likedVideos: action.payload,
      };
    default:
      return videoState;
  }
};
