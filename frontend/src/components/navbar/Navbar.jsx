import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useUser } from "../../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { useVideo } from "../../context/videoContext/videoContext";

import "./nav.css";

const Navbar = () => {
  const {
    state: { user },
    dispatch,
    setToken,
    setIsAuth,
  } = useUser();
  const { videoDispatch } = useVideo();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    setToken(" ");
    navigate("/login");
  };
  return (
    <div className="nav-header">
      <div className="nav-logo-container">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 className="nav-logo-text">JyoTube</h1>
        </Link>
      </div>
      <div className="nav-search-container">
        <form className="search-form">
          <input
            placeholder="Search"
            className="search-input"
            onChange={(e) =>
              videoDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
        </form>
        <button className="nav-search-btn">
          <SearchIcon />
        </button>
      </div>
      <div className="nav-profile-container">
        {user ? (
          <>
            <h2 className="nav-user-name">
              {user.name.charAt(0)}
              <AccountCircleIcon />
            </h2>
            <button className="nav-btn">logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="nav-btn">
                <AccountCircleIcon />
                login
              </button>
            </Link>
            {/* <Link to="/register" style={{ textDecoration: "none" }}>
              <button className="nav-btn">
                <AccountCircleIcon />
                register
              </button>
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
