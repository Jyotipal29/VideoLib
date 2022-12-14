import { usePlaylist } from "../../context/playlistContext/playlistContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PlaylistCheckBox = ({ video, playlistId, name, videos }) => {
  //   console.log(playlists, "videos jo aya");
  const { playlists, playlistDispatch } = usePlaylist();
  const [isInPlaylist, setIsInPlaylist] = useState(
    !!videos.find(({ id }) => id === video._id)
  );
  const updatePlaylist = ({ e, playlistId, video }) => {
    const { checked } = e.target;
    checked
      ? playlistDispatch({ type: "ADD_TO_PLAYLIST", playlistId, video })
      : playlistDispatch({
          type: "REMOVE_FROM_PLAYLIST",
          playlistId,
          videoId: video._id,
        });

    setIsInPlaylist((prev) => !prev);
    toast.success("video added in playlist");
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={isInPlaylist}
        onChange={(e) => updatePlaylist({ e, playlistId, video })}
      />
      {name}

      <ToastContainer />
    </div>
  );
};

export default PlaylistCheckBox;
