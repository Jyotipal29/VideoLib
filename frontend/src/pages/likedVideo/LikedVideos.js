import React from "react";
import { useUser } from "../../context/userContext/userContext";
import Card from "../../components/videoCrad/Card";
import styled from "styled-components";
const VideosContainer = styled.div``;
const LikedVideos = () => {
  const {
    state: { likedVideos },
  } = useUser();
  console.log(likedVideos, "likedvideo");
  return (
    <div>
      {likedVideos &&
        likedVideos.map((videos) => <Card key={videos._id} video={videos} />)}
    </div>
  );
};

export default LikedVideos;
