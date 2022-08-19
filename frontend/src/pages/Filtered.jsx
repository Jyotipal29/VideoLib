import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { api } from "../constants/api";
import { useUser } from "../context/userContext/userContext";
import { useVideo } from "../context/videoContext/videoContext";
import cat from "../data";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Button = styled.button`
  background-color: transparent;
  padding: 5px 15px;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Filtered = () => {
  const {
    videoState: { videos, filteredVideos },
    videoDispatch,
  } = useVideo();
  console.log(filteredVideos);
  return (
    <Container>
      {filteredVideos &&
        filteredVideos.map((video) => <Card key={video._id} video={video} />)}
    </Container>
  );
};

export default Filtered;
