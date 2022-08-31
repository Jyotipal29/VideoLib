import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { api } from "../constants/api";
import { useUser } from "../context/userContext/userContext";
import { useVideo } from "../context/videoContext/videoContext";
import cat from "../data";

const Container = styled.div`
  /* display: flex;
  justify-content: space-between;
  flex-wrap: wrap; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
// const Wrappe = styled.div``;
// const Button = styled.button`
//   background-color: transparent;
//   padding: 5px 15px;
//   border: 1px solid #3ea6ff;
//   color: #3ea6ff;
//   border-radius: 3px;
//   font-weight: 300;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 5px;
// `;
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
const VideosContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
`;
const Home = () => {
  const {
    state: { user },
  } = useUser();
  const {
    videoState: { videos, searchQuery },
    videoDispatch,
  } = useVideo();
  const [currentTag, setCurrentTag] = useState(null);
  console.log(videos, "videos");
  const fetchVideos = async (filter = {}) => {
    let { value = null } = filter;

    value = value === "all" ? null : value;
    const { data } = await axios.get(`${api}videos?tag=${value}`);
    console.log(data, value);
    return data;
  };
  useEffect(() => {
    (async function () {
      videoDispatch({
        type: "GET_VIDEOS",
        payload: await fetchVideos({ value: currentTag }),
      });
    })();
  }, [currentTag, videoDispatch]);
  const filVideos = () => {
    let newVideos = videos;
    if (searchQuery) {
      newVideos = newVideos.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery)
      );
    }
    return newVideos;
  };
  return (
    <Container>
      <Wrapper>
        {cat &&
          cat.map((item) => {
            return (
              <Button
                key={item.value}
                onClick={() => setCurrentTag(item.value)}
              >
                {item.value}
              </Button>
            );
          })}
      </Wrapper>
      <VideosContainer>
        {
          // videos &&
          filVideos().map((video) => (
            <Card key={video._id} video={video} />
          ))
        }
      </VideosContainer>
    </Container>
  );
};;

export default Home;
