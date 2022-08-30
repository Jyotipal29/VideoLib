import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../constants/api";
import { useVideo } from "../context/videoContext/videoContext";
import cat from "../data";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 10px;
  justify-content: flex-start;
  position: relative;
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

const Filters = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const {
    videoState: { videos, filteredVideos },
    videoDispatch,
  } = useVideo();
  const catHandler = async (value) => {
    if (value === "all") {
      navigate("/");
    }
    const { data } = await axios.get(`${api}videos/tag?tag=${value}`);
    videoDispatch({ type: "FILTER", payload: data });
  };
  return (
    <Container>
      {/* <Wrapper>
        <Link to="/">
          <Button>All</Button>
        </Link>
        {cat &&
          cat.map((item) => {
            return (
              <Link to="/filtered">
                <Button onClick={() => catHandler(item.value)}>
                  {item.value}
                </Button>
              </Link>
            );
          })}
      </Wrapper> */}
    </Container>
  );
};

export default Filters;
