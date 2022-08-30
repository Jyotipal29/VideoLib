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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
display:flex;
`;
// const Wrappe = styled.div``;
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

const Home = () => {
  const {
    state: { user },
  } = useUser();
  const {
    videoState: { videos },
    videoDispatch,
  } = useVideo();
  console.log(videos,"videos")
  const fetchVideos = async({value = null }) =>{
 const {data} = await axios.get(`${api}videos?tag=${value}`);
    return data;
  }
  
  const catHandler = async (value) => {
   
      videoDispatch({type:"GET_VIDEO",payload:(await fetchVideos({value}))})   
  };
  
  

  return (
    <Container>
      <Wrapper>
        
          
        
        {cat &&
          cat.map((item) => {
            return (
             
                <Button onClick={() => catHandler(item.value)}>
                  {item.value}
                </Button>
             
            );
          })}
      </Wrapper>
      {videos && videos.map((video) => <Card key={video._id} video={video} />)}
    </Container>
  );
};;

export default Home;
