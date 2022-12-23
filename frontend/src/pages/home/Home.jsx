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
const Home = ({ children }) => {
  return (
    <div className="home-container">
      <div className="sidebar">
        <Menu />
      </div>
      <div className="home-content">
        {/* videos */}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Home;
