import React from "react";
import { Link } from "react-router-dom";
import { usePlaylist } from "../../context/playlistContext/playlistContext";
import Home from "../home/Home";
import "./playlist.css";
const Playlist = () => {
  const { playlists, playlistDispatch } = usePlaylist();
  // console.log(playlists, "playlists");

  const deletePlaylist = (playlistId) => {
    playlistDispatch({ type: "DELETE_PLAYLIST", playlistId });
  };
  const deleteVideoFromPlaylist = (videoId) => {
    console.log(videoId, "videoid");
    // console.log(playlistId, "the playlistid");
    playlistDispatch({
      type: "DELETE_VIDEO_FROM_PLAYLIST",
      videoId: videoId._id,
      playlistId: videoId.id,
    });
  };
  return (
    <Home>
      <div className="playlist-container">
        {playlists.map(({ id, name, videos }) => {
          console.log(id, "playlist id");

          return (
            <div className="playlist-wrapper">
              <div className="playlist-title">
                <h2>{name}</h2>
                <button onClick={() => deletePlaylist(id)}>x</button>
              </div>

              <div className="pl-video-container">
                {videos.map(
                  ({ title, videoUrl, creator, _id, thumbnailUrl }) => (
                    <Link
                      to={`/videos/${_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="pl-video-card">
                        <img src={thumbnailUrl} />
                        <div>
                          <h3>{title}</h3>
                          <p>{creator}</p>
                          <button
                            onClick={() => deleteVideoFromPlaylist({ _id, id })}
                          >
                            {" "}
                            x
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Home>
  );
};

export default Playlist;
