export const playlistReducer = (
  { playlists },
  { type, playlist, playlistId, videoId, video }
) => {
  switch (type) {
    case "CREATE_PLAYLIST":
      return {
        playlists: playlists.concat(playlist),
      };
    case "DELETE_PLAYLIST":
      return {
        playlists: playlists.filter((playlist) => playlist._id !== playlistId),
      };
    case "ADD_TO_PLAYLIST":
      return {
        playlists: playlists.map(({ id, videos, name }) =>
          id !== playlistId
            ? { id, videos, name }
            : { id, name, videos: videos.concat(video) }
        ),
      };
    case "DELETE_VIDEO_FROM_PLAYLIST":
      return {
        playlists: playlists.map(({ id, videos, name }) =>
          id !== playlistId
            ? { id, videos, name }
            : { id, name, videos: videos.filter(({ id }) => id !== videoId) }
        ),
      };

    default:
      return { playlists };
  }
};
