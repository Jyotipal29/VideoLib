import React from "react";
import { useState } from "react";
import styled from "styled-components";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import uuid from "react-uuid";
import { useLocation } from "react-router-dom";

import { useVideo } from "../../context/videoContext/videoContext";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import { useUser } from "../../context/userContext/userContext";
import Model from "../../components/modal/Model";
import { usePlaylist } from "../../context/playlistContext/playlistContext";
import PlaylistCheckBox from "../../components/checkBox/playlistCheckBox";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const [showModel, setShowModel] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playlistName, setPlaylistName] = useState(" ");
  const { playlists, playlistDispatch } = usePlaylist();
  const createNewPlaylist = ({ name, video }) => {
    playlistDispatch({
      type: "CREATE_PLAYLIST",
      playlist: {
        id: uuid(),
        name,
        videos: [video],
      },
    });
    console.log("added to the playlist");
    setShowModel(false);
    setPlaylistName(" ");
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
  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await axios.get(`${api}videos/find/${path}`);
      videoDispatch({ type: "GET_VIDEO", payload: data });
    };
    fetchVideo();
  }, [path]);
  console.log(video, "manali");

  const likeHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(`${api}videos/like/${id}`, {}, config);
    console.log(data, "like payload data");
    videoDispatch({
      type: "LIKE_VIDEO",
      payload: data,
    });
  };
  console.log(likedVideos, "likedVideos");
  const dislikeHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(`${api}users/dislike/${id}`, {}, config);
    dispatch({
      type: "DISLIKE_VIDEO",
      payload: data.video,
    });
  };

  const watchLaterHandler = async ({
    _id,
    title,
    videoUrl,
    thumbnailUrl,
    creator,
  }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${api}wl/add`,
      {
        watchLaterItems: { video: _id, title, videoUrl, thumbnailUrl, creator },
      },
      config
    );
    videoDispatch({ type: "ADD_WATCHLATER", payload: data });
  };

  return (
    <Container>
      {video && (
        <Content>
          <VideoWrapper>
            <iframe
              width="100%"
              height="500"
              title="youtube video"
              src={video.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </VideoWrapper>
          <Title>{video.title}</Title>
          <Details>
            <Buttons>
              <Button onClick={() => likeHandler(video._id)}>
                <ThumbUpOutlinedIcon />
                like
                {video?.likes?.length}
              </Button>
              {/* <Button onClick={() => dislikeHandler(video._id)}>
                <ThumbDownOffAltOutlinedIcon />
              </Button> */}

              <Button onClick={() => setShowModel(true)}>
                <LibraryAddIcon />
                playlist
              </Button>
              <Button onClick={() => watchLaterHandler(video)}>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
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
          </Details>
        </Content>
      )}
    </Container>
  );
};

export default Video;