import React from 'react';
import styled from 'styled-components';

const Course = ({ image, logo, subtitle, title, avatar, caption, author }) => (
  <Container>
    <Cover>
      <Image source={image} />
      <Logo source={logo} resizeMode="contain" />
      <Subtitle>{subtitle}</Subtitle>
      <Title>{title}</Title>
    </Cover>
    <Content>
      <Avatar source={avatar} />
      <Caption>{caption}</Caption>
      <Author>Taught by {author}</Author>
    </Content>
  </Container>
);

export default Course;

const Container = styled.View`
  height: 325px;
  width: 335px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  margin-left: 20px;
  border-radius: 14px;
  overflow: hidden;
  margin: 10px 20px;
  background: white;
`;

const Content = styled.View`
  height: 65px;
  padding-left: 62px;
  justify-content: center;
`;

const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -25px;
  width: 50px;
  height: 50px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 24px;
  color: white;
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 20px;
  width: 170px;
`;

const Subtitle = styled.Text`
  margin-left: 20px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  position: absolute;
  left: 20px;
`;

const Author = styled.Text`
  color: #bbb;
  margin-top: 3px;
  font-size: 13px;
  font-weight: 500;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 14px;
`;
