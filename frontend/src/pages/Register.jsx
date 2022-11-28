import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
import "./register.css";

const Register = () => {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [cnfPassword, setCnfPassword] = useState(" ");
  const [error, setError] = useState(" ");
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
  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(password !== cnfPassword, "check");
    if (password !== cnfPassword) {
      setPassword("");
      setCnfPassword("");
      setTimeout(() => {
        setError(" ");
      }, 5000);
      return setError(" password do not match");
    }
    try {
      const { data } = await axios.post(`${api}auth/register`, {
        name,
        email,
        password,
      });
      // console.log(data);
      if (data) {
        dispatch({ type: "REGISTER", payload: data });
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
      console.log(error.response.data.error, "error");
    }
  };
  return (
    <div className="form-container">
      <form className="form">
        <h2 className="form-heading">Register</h2>
        {error && <span className="error-message">{error}</span>}
        <div className="form-control">
          <small>Name</small>
          <input placeholder="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-control">
          <small>email</small>
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
        <div className="form-control">
          <small> confirm password</small>
          <input
            type="password"
            placeholder=" confirm password"
            onChange={(e) => setCnfPassword(e.target.value)}
          />
        </div>
        <button onClick={registerHandler} className="form-btn">
          Sign up
        </button>
        <button className="form-btn login">
          <Link to="/login"> already have an account ? login</Link>
        </button>
      </form>
    </div>
  );
};

export default Register;
