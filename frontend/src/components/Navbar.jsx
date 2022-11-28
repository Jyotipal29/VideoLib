import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useUser } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { useVideo } from "../context/videoContext/videoContext";
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
  justify-content: flex-end;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  width: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
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

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: black;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
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
    <Container>
      <Wrapper>
        <Search>
          <Input
            placeholder="Search"
            onChange={(e) =>
              videoDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
          <SearchIcon />
        </Search>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button>
            <AccountCircleIcon />
            log IN
          </Button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button>
            <AccountCircleIcon />
            register
          </Button>
        </Link>
        {user && <p>{user.name}</p>}

        <Button onClick={logoutHandler}>logout</Button>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
