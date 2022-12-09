import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../../components/videoCrad/Card";
import { Link } from "react-router-dom";
import { api } from "../../constants/api";
import { useUser } from "../../context/userContext/userContext";
import { useVideo } from "../../context/videoContext/videoContext";
import cat from "../../data";
import "./home.css";
import Menu from "../../components/sidebar/Menu";

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
    <div className="home-container">
      <div className="sidebar">
        <Menu />
      </div>
      <div className="home-content">
        <div className="home-cat-wrapper">
          {cat &&
            cat.map((item) => {
              return (
                <button
                  className="home-cat-chip"
                  key={item.value}
                  onClick={() => setCurrentTag(item.value)}
                >
                  {item.value}
                </button>
              );
            })}
        </div>
        {/* videos */}
        <div className="video-container">
          {
            // videos &&
            filVideos().map((video) => (
              <Card key={video._id} video={video} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
