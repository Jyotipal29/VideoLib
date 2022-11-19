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
