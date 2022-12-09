import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext/userContext";
import "./register.css";

const SignIn = () => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
    token,
    setToken,
    isAuth,
    setIsAuth,
  } = useUser();
  // console.log(user);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${api}auth/login`, {
        email,
        password,
      });
      // console.log(data);

      const token = data.token;
      if (data) {
        dispatch({ type: "LOGIN", payload: data });

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", token);
        setIsAuth(true);
        setToken(token);
      }

      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
      console.log(error);
    }
  };
  return (
    <div className="form-container">
      <form className="form">
        <h2 className="form-heading">Sign In</h2>
        {error && <span className="error-message">{error}</span>}
        <div className="form-control">
          <smal>email</smal>
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <small>password</small>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="form-btn">
          Sign In
        </button>

        <button className="form-btn">
          <Link to="/register"> dont have an account ? register</Link>
        </button>
      </form>
    </div>
  );
};

export default SignIn;
