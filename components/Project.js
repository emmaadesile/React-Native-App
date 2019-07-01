import React from 'react';
import styled from 'styled-components';
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import * as Icon from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 83;

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openCard: () =>
      dispatch({
        type: 'OPEN_CARD'
      }),
    closeCard: () =>
      dispatch({
        type: 'CLOSE_CARD'
      })
  };
}

class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(10),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(100)
  };

  openCard = () => {
    if (!this.props.canOpen) return;
    Animated.spring(this.state.cardWidth, { toValue: screenWidth }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: screenHeight - tabBarHeight
    }).start();
    Animated.spring(this.state.titleTop, { toValue: 30 }).start();
    Animated.timing(this.state.opacity, { toValue: 1 }).start();

    Animated.timing(this.state.textHeight, { toValue: 1000 }).start();
    StatusBar.setHidden(true);

    this.props.openCard();
  };

  closeCard = () => {
    Animated.spring(this.state.cardWidth, { toValue: 315 }).start();
    Animated.spring(this.state.cardHeight, { toValue: 460 }).start();
    Animated.spring(this.state.titleTop, { toValue: 20 }).start();
    Animated.timing(this.state.opacity, { toValue: 0 }).start();

    Animated.spring(this.state.textHeight, { toValue: 100 }).start();
    StatusBar.setHidden(false);

    this.props.closeCard();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer
          style={{ width: this.state.cardWidth, height: this.state.cardHeight }}
        >
          <Cover>
            <Image source={this.props.image} />
            <AnimatedTitle style={{ top: this.state.titleTop }}>
              {this.props.title}
            </AnimatedTitle>
            <Author>{this.props.author}</Author>
          </Cover>
          <AnimatedText style={{ height: this.state.textHeight }}>
            {this.props.text}
          </AnimatedText>
          <AnimatedGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={{
              position: 'absolute',
              top: 330,
              width: '100%',
              height: this.state.textHeight
            }}
          />
          <TouchableOpacity
            onPress={this.closeCard}
            style={{
              position: 'absolute',
              top: 30,
              right: 0
            }}
          >
            <AnimatedCloseButton style={{ opacity: this.state.opacity }}>
              <Icon.Ionicons name="ios-close" size={40} color="#546bfb" />
            </AnimatedCloseButton>
          </TouchableOpacity>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

const CloseButton = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 21px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseButton = Animated.createAnimatedComponent(CloseButton);

const Container = styled.View`
  width: 315px;
  height: 430px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

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

const AnimatedText = Animated.createAnimatedComponent(Text);

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

const AnimatedTitle = Animated.createAnimatedComponent(Title);

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

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
