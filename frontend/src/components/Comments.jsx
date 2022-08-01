import React, { Component } from "react";
import styled from "styled-components";
import Comment from "./Comment";
const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://pbs.twimg.com/profile_images/959291281246642177/52oOzHVF_400x400.jpg" />
        <Input placeholder="add a comment..." />
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default Comments;
