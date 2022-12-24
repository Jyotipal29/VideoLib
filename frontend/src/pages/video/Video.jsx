import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import "./video.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import uuid from "react-uuid";
import { useLocation, useParams } from "react-router-dom";

import { useVideo } from "../../context/videoContext/videoContext";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import { useUser } from "../../context/userContext/userContext";
import Model from "../../components/modal/Model";
import { usePlaylist } from "../../context/playlistContext/playlistContext";
import PlaylistCheckBox from "../../components/checkBox/playlistCheckBox";
import Home from "../home/Home";

const Video = () => {
  const { id: videoId } = useParams();
  const [showModel, setShowModel] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playlistName, setPlaylistName] = useState(" ");
  const { playlists, playlistDispatch } = usePlaylist();
  const [liking, setLiking] = useState(false);
  // Need to store video locally to avoid iframe hiding when state change.
  // TODO: Move video from global state to local state to solve the above issue
  const [currentVideo, setCurrentVideo] = useState(null);
  const createNewPlaylist = async ({ name, video }) => {
    try {
      playlistDispatch({
        type: "CREATE_PLAYLIST",
        playlist: {
          id: uuid(),
          name,
          videos: [video],
        },
      });
      // console.log(data, "playlist payload data");
      localStorage.setItem("playlist", JSON.stringify(playlists));
      console.log("added to the playlist");
      toast.success("playlist created");
      setShowModel(false);
      setPlaylistName(" ");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const {
    videoState: { video, watchLater },
    videoDispatch,
  } = useVideo();
  const {
    state: { user, likedVideos },
    token,
    dispatch,
  } = useUser();
  console.log(video, "videos");
  const path = useLocation().pathname.split("/")[2];
  console.log(path, "path");
  const fetchVideo = async () => {
    const { data: video } = await axios.get(`${api}videos/find/${videoId}`);
    videoDispatch({ type: "GET_VIDEO", payload: video });
    setCurrentVideo(video);
  };
  useEffect(() => {
    fetchVideo();
  }, []);
  console.log(video, "manali");

  const likeHandler = async (id) => {
    setLiking(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
    };
    try {
      const { data: video } = await axios.put(
        `${api}videos/like/${id}`,
        {},
        config
      );
      console.log(video, "like payload data");
      videoDispatch({
        type: "GET_VIDEO",
        payload: video,
      });
      toast.success("video liked");
    } catch (e) {
      toast.error("like failed"); // Need to do this to be sure request was successful or not
      console.log("like failed", e);
    } finally {
      setLiking(false);
    }
  };
  console.log(likedVideos, "likedVideos");

  const watchLaterHandler = async ({
    _id,
    title,
    videoUrl,
    thumbnailUrl,
    creator,
  }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${api}wl/add`,
        {
          watchLaterItems: {
            video: _id,
            title,
            videoUrl,
            thumbnailUrl,
            creator,
          },
        },
        config
      );
      videoDispatch({ type: "ADD_WATCHLATER", payload: data });
      toast.success("saved to watchlater");
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <Home>
      {video && (
        <div className="single-video-container">
          <div className="single-video-fram">
            <iframe
              width="100%"
              height="500"
              title="youtube video"
              src={currentVideo?.videoUrl ?? ""}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="single-video-title">{currentVideo?.title ?? "N/A"}</h2>
          <div>
            <div className="single-video-btns">
              <button
                className="video-action"
                onClick={() => likeHandler(video._id)}
              >
                <ThumbUpOutlinedIcon />
                <small>
                  {liking ? "liking..." : "like"}
                  {video?.totalLikes || ""}
                </small>
              </button>
              {/* <Button onClick={() => dislikeHandler(video._id)}>
                <ThumbDownOffAltOutlinedIcon />
              </Button> */}

              <button
                className="video-action"
                onClick={() => setShowModel(true)}
              >
                <LibraryAddIcon />
                <small>playlist</small>
              </button>
              <button
                className="video-action"
                onClick={() => watchLaterHandler(video)}
              >
                <AddTaskOutlinedIcon />
                <small>Watchlater</small>
              </button>
            </div>
            <Model showModel={showModel} setShowModel={setShowModel}>
              <div>
                add to
                <ul>
                  {playlists.map(({ id, ...rest }) => (
                    <li key={id}>
                      <PlaylistCheckBox
                        playlistId={id}
                        video={video}
                        {...rest}
                      />
                    </li>
                  ))}
                </ul>
                <label>
                  <input
                    type="checkbox"
                    checked={showNameInput}
                    onChange={() => setShowNameInput((prev) => !prev)}
                  />
                  Create New Playlist
                </label>
                {showNameInput && (
                  <div>
                    <label>name</label>
                    <input
                      class="input"
                      type="text"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <button
                      className="btn bg-primary mt-1 mr-1 align-end"
                      onClick={() =>
                        createNewPlaylist({
                          name: playlistName,
                          video,
                        })
                      }
                    >
                      Create
                    </button>
                  </div>
                )}
              </div>
            </Model>
          </div>
        </div>
      )}
      <ToastContainer />
    </Home>
  );
};

export default Video;
