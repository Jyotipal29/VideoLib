import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background-color: white; */

  background-color: 181818;
  padding: 20px 50px;
`;
const Title = styled.h1`
  font-size: 24px;
`;
const Subtitel = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
`;
// const More = styled.div``;
const Register = () => {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
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
    try {
      const { data } = await axios.post(`${api}auth/signup`, {
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={registerHandler}>Sign up</Button>or{" "}
        <Link to="/login">login</Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
