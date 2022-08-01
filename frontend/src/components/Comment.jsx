import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 40;
  color: black;
  margin-left: 5px;
`;
const Text = styled.p`
  font-size: 14px;
  color: black;
`;
const Comment = () => {
  return (
    <Container>
      <Avatar src="https://pbs.twimg.com/profile_images/959291281246642177/52oOzHVF_400x400.jpg" />
      <Details>
        <Name>
          jyoti <Date>29 jan</Date>
        </Name>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          corrupti praesentium vel asperiores voluptatem repudiandae ab? Nam
          esse dignissimos quas.
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
