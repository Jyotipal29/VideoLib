import React from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HomeIcon from "@mui/icons-material/Home";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Link } from "react-router-dom";
import "./menu.css";

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
        <h3>Home</h3>
      </Link>
      <Link
        to="/liked"
        className="sidebar-item"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ThumbUpIcon />
        <h3>Liked</h3>
      </Link>

      <Link
        to="/playlist"
        className="sidebar-item"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <LibraryAddIcon />
        <h3>playlists</h3>
      </Link>

      <Link
        to="/watchlater"
        className="sidebar-item"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <WatchLaterIcon />
        <h3>watch later</h3>
      </Link>
    </div>
  );
};

export default Menu;
