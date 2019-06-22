import React from 'react';
import styled from 'styled-components';
import {
  TouchableOpacity,
  StatusBar,
  WebView,
  Linking,
  ScrollView
} from 'react-native';
import Markdown from 'react-native-showdown';
import { Icon } from 'expo';

class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam('section');

    return (
      <ScrollView>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={section.image} />
            <Title> {section.title}</Title>
            <Caption>{section.caption}</Caption>
          </Cover>
          <Wrapper>
            <Logo source={section.logo} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <TouchableOpacity
            style={{ position: 'absolute', top: 20, right: 20 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <CloseView>
              <Icon.Ionicons
                name="ios-close"
                size={36}
                color="#4775f2"
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {/* <WebView
            source={{ html: section.content + htmlStyles }}
            scalesPageToFit={false}
            scrollEnabled={false}
            onNavigationStateChange={event => {
              if (event.url !== 'about:blank') {
                Linking.openURL(event.url);
              }
            }}
          /> */}
            <Markdown
              body={section.content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const htmlContent = `
  <h2>This is the title</h2>
  <p>This is a <a href='http://designcode.io'>link</a></p>
  <img src="https://cl.ly/8861f359ed6d/download/Wave14.jpg" />
`;

const htmlStyles = `
  * {
    font-family: -apple-system; 
        margin: 0;
        padding: 0;
    font-size: 17px; 
    font-weight: normal; 
    color: #3c4560;
    line-height: 24px;
  }

  h2 {
    font-size: 20px;
    text-transform: uppercase;
    color: #b8bece;
    font-weight: 600;
    margin-top: 50px;
  }

  p {
    margin-top: 20px;
  }

  a {
    color: #4775f2;
    font-weight: 600;
    text-decoration: none;
  }

  strong {
    font-weight: 700;
  }

  pre {
    padding: 20px;
    background: #212C4F;
    overflow: hidden;
    word-wrap: break-word;
    border-radius: 10px;
    margin-top: 20px;
  }

  code {
    color: white;
  }

  img {
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
  }
`;

const Content = styled.View`
  height: 1000px;
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 24px;
  position: absolute;
  top: 78px;
  left: 20px;
  width: 180px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  width: 300px;
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const CloseView = styled.View`
  background: white;
  color: #4775f2;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.15);
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 40;
  left: 20;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 8px;
  color: rgba(255, 255, 255, 0.8);
`;

export default SectionScreen;
