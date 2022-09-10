// const toggleLiked = (state, { video, isVideoLiked }) => {
//   const stateCopy = { ...state };
//   if (isVideoLiked) {
//     stateCopy.likedVideos = state.likedVideos.filter(
//       (likedVideo) => likedVideo._id !== video._id
//     );
//   } else {
//     stateCopy.likedVideos = state.likedVideos.concat(video);
//   }
//   return stateCopy;
// };

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LIKE":
      return {
        ...state,
        likedVideos: [action.payload],
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
