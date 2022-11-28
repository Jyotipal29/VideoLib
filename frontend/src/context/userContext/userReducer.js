export const UserReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_VIDEO":
      // return {
      //   ...state,
      //   likedVideos: [action.payload],
      // };
      const item = action.payload;
      const existItem = state.likedVideos?.find((x) => x._id === item._id);
      const likedVideos = existItem
        ? state.likedVideos?.map((x) => (x._id === existItem._id ? item : x))
        : [...state.likedVideos, item];
      return {
        ...state,
        likedVideos,
      };
    case "DISLIKE_VIDEO":
      return {
        ...state,
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
