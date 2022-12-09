import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../constants/api";
import "./card.css";
import { useVideo } from "../../context/videoContext/videoContext";

const Card = ({ video }) => {
  console.log(video, "bidio");
  const clickHandler = () => {};
  return (
    <Link to={`/videos/${video._id}`} style={{ textDecoration: "none" }}>
      <div
        onClick={clickHandler}
        className="video-content
      "
      >
        <img src={video.thumbnailUrl} />
        <div className="video-info">
          <h2 className="video-title">{video.title}</h2>
          <p className="creator-name">{video.creator}</p>
        </div>
      </div>
      {/* <div>
        <h2>jyoti</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
          praesentium animi quasi quia sit mollitia molestiae, qui blanditiis
          aperiam voluptatem.
        </p>
      </div> */}
    </Link>
  );
};

export default Card;
