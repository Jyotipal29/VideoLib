// import { STATES } from "mongoose";

export const VideoReducer = (videoState, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        ...videoState,
        videos: action.payload,
      };
    case "GET_VIDEO":
      return {
        ...videoState,

        video: action.payload,
      };
    case "GET_WATCHLATER":
      return {
        ...videoState,

        watchLater: action.payload,
      };
    case "ADD_WATCHLATER":
      const item = action.payload;
      const existItem = videoState.watchLater?.find((x) => x._id === item._id);
      const watchLater = existItem
        ? videoState.watchLater?.map((x) =>
            x._id === existItem._id ? item : x
          )
        : [...videoState.watchLater, item];
      return {
        ...videoState,

        watchLater,
      };
    case "DELETE_WATCHLATER":
      return {
        ...videoState,
        watchLater: videoState.watchLater.filter(
          (item) => item._id !== action.payload.video
        ),
      };
    case "FILTER":
      return {
        ...videoState,
        filteredVideos: action.payload,
      };
    case "FILTER_BY_SEARCH":
      return { ...videoState, searchQuery: action.payload };
    case "LIKE":
      let like = (videoState.video.likes.includes(action.payload.id))? (videoState.video.dislikes.splice(videoState.video.dislikes.findIndex(userId =>userId === action.payload.id))):(videoState.video.likes.push(action.payload.id))
      return {
        ...videoState,
        like,
       
      };
     
    default:
      return videoState;
  }
};

// if (!videoState.video.likes.includes(action.payload.id)) {
//   videoState.video.likes.push(action.payload.id);
//   videoState.video.dislikes.splice(
//     videoState.video.dislikes.findIndex(
//       (userId) => userId === action.payload.id
//     ),
//     1
//   );
// }