import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';

const MenuItem = ({ icon, title, text }) => (
  <Container>
    <IconView>
      <Icon.Ionicons name={icon} size={28} color="#546bfb" />
    </IconView>
    <Content>
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Content>
  </Container>
);

export default MenuItem;

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
  padding: 10px 0;
  align-items: flex-start;
`;

const Content = styled.View``;

const IconView = styled.View`
  margin-right: 30px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #3c4560;
  font-weight: 600;
`;

const Text = styled.Text`
  color: #3c4560;
  opacity: 0.6;
`;
