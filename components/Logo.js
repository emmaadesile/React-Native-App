import React from 'react';
import styled from 'styled-components';

const Logo = ({ image, title }) => (
  <Container>
    <Image source={image} />
    <Title>{title}</Title>
  </Container>
);

const Container = styled.View`
  flex-direction: row;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  align-items: center;
  height: 60px;
  padding: 12px 16px 12px;
  margin: 0 8px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 7px;
`;

export default Logo;
