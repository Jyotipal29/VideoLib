import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { api } from "../constants/api";
import { useUser } from "../context/userContext/userContext";
import { useVideo } from "../context/videoContext/videoContext";
const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  /* gap: 10px; */
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: black;
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: black;
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: black;
`;
const Button = styled.button``;
const WatchLater = () => {
  const {
    state: { user },
  } = useUser();
  const {
    videoState: { watchLater },
    videoDispatch,
  } = useVideo();
  console.log(watchLater, "watchlater");
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${api}wl/`, config);
      const dataM = data.watchLater[0].watchLaterItems;

      //   console.log(dataM, "data");
      videoDispatch({ type: "GET_WATCHLATER", payload: dataM });
    };
    fetchData();
  }, []);

  const wlDeleteHandler = async (id) => {
    console.log(id, "data");

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`${api}wl/${id}`, config);
    console.log(data, "data");
    videoDispatch({ type: "DELETE_WATCHLATER", payload: data });
  };
  console.log(watchLater, "watchlater");
  //   const item = watchLater.map((i) => i.watchLaterItems);
  //   console.log(item, "item");

  return (
    <>
      {watchLater &&
        watchLater.map((item) => (
          <Container>
            <Image src={item.thumbnailUrl} />
            <Details>
              <Texts>
                <Title>{item.title}</Title>
                <ChannelName>{item.creator}</ChannelName>
              </Texts>
              <Button onClick={() => wlDeleteHandler(item._id)}>
                remove wl
              </Button>
            </Details>
          </Container>
        ))}
    </>
  );
};

export default WatchLater;
