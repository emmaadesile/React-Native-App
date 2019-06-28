import React from 'react';
import styled from 'styled-components';

class Project extends React.Component {
  render() {
    return (
      <Container>
        <Cover>
          <Image source={this.props.image} />
          <Title>{this.props.title}</Title>
          <Author>{this.props.author}</Author>
        </Cover>
        <Text>{this.props.text}</Text>
      </Container>
    );
  }
}

export default Project;

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 250px;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 24px;
  color: rgba(0, 0, 0, 0.6);
  color: #3c4560;
  line-height: 24px;
`;

const Title = styled.Text`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
  margin: 20px 0 20px 0;
`;

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
`;
