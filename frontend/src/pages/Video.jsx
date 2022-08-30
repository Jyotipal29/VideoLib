import React from "react";
import styled from "styled-components";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useLocation } from "react-router-dom";

import { useVideo } from "../context/videoContext/videoContext";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../constants/api";
import { useUser } from "../context/userContext/userContext";
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
  const {
    videoState: { video, likedVideos, watchLater },
    videoDispatch,
  } = useVideo();
  console.log("122", likedVideos);
  const {
    state: { user },
    token,
  } = useUser();
  console.log(user._id);
  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await axios.get(`${api}videos/find/${path}`);
      videoDispatch({ type: "GET_VIDEO", payload: data });
    };
    fetchVideo();
  }, [path]);
  console.log(video);

  const likeHandler = async (id) => {
    console.log(user, "user");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(`${api}users/like/${id}`, {}, config);
    console.log(data);
  };

  const dislikeHandler = () => {};
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
                {video.likes?.includes(user?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{" "}
                {video.likes?.length}
              </Button>
              <Button onClick={dislikeHandler}>
                {video.dislikes?.includes(user?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}{" "}
                Dislike
              </Button>

              <Button onClick={() => watchLaterHandler(video)}>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
          </Details>
        </Content>
      )}
    </Container>
  );
};

export default Video;
