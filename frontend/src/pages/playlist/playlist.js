import React from "react";
import { usePlaylist } from "../../context/playlistContext/playlistContext";

const Playlist = () => {
  const { playlists, playlistDispatch } = usePlaylist();
  console.log(playlists, "playlists");

  const deletePlaylist = (id) => {
    playlistDispatch({ type: "DELETE_PLAYLIST", playlistId: id });
  };
    const deleteVideoFromPlaylist = ({ _id, id }) => {
      playlistDispatch({
        type: "DELETE_VIDEO_FROM_PLAYLIST",
        videoId: _id,
        playlistId: id,
      });
    };
    return (
      <div style={{ marginTop: "100px" }}>
        {playlists.map(({ id, name, videos }) => {
          console.log(id, "playlist id");

          return (
            <div>
              <h3>{name}</h3>
              <button onClick={() => deletePlaylist(id)}>
                delete playlist
              </button>
              <div
                style={{
                  border: "2px solid black",
                }}
              >
                {videos.map(({ title, videoUrl, creator, _id }) => (
                  <>
                    <div>
                      <iframe
                        width="100%"
                        height="500"
                        title="youtube video"
                        src={videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div>
                      <p>{title}</p>
                      <p>{creator}</p>
                      <button
                        onClick={() => deleteVideoFromPlaylist({ _id, id })}
                      >
                        {" "}
                        delete video
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
};

export default Playlist;
