import React from "react";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import WatchLaterIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import HistoryIcon from "@mui/icons-material/History";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./menu.css";
const Container = styled.div`
  flex: 1;
  background-color: #181818;
  height: 100vh;
  color: white;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 25px;
  color: red;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid #f5f5f5;
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 300;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Menu = () => {
  // const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="sidebar-items">
      <Link
        to="/"
        className="sidebar-item"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <HomeIcon />
        Home
      </Link>
      <Link
        to="/liked"
        className="sidebar-item"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ThumbUpIcon />
        Liked
      </Link>

      <Link
        to="/playlist"
        className="sidebar-item"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <LibraryAddIcon />
        playlists
      </Link>

      <Link
        to="/watchlater"
        className="sidebar-item"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <WatchLaterIcon />
        watch later
      </Link>
    </div>
  );
};

export default Menu;
