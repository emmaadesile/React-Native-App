import React from 'react';
import styled from 'styled-components';
import { PanResponder, Animated } from 'react-native';
import Project from '../components/Project';

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50)
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();

        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();

        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: this.state.pan.x, y: 1000 }
          }).start();
        } else {
          new Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
          new Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          new Animated.spring(this.state.translateY, { toValue: 44 }).start();

          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <AnimatedContainer
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title={projects[0].title}
            image={projects[0].image}
            text={projects[0].text}
            author={projects[0].author}
          />
        </AnimatedContainer>
        <AnimatedContainer
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: -1,
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Project
            title={projects[1].title}
            image={projects[1].image}
            text={projects[1].text}
            author={projects[1].author}
          />
        </AnimatedContainer>
        <AnimatedContainer
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: -3,
            transform: [
              { scale: this.state.thirdScale },
              { translateY: this.state.thirdTranslateY }
            ]
          }}
        >
          <Project />
        </AnimatedContainer>
      </Container>
    );
  }
}

const projects = [
  {
    title: 'Project Zeta',
    image: require('../assets/background5.jpg'),
    author: 'Zu Lee',
    text:
      'The Zeta Project is an animated series that ran from 2001 to 2002. It was a spinoff of the Batman Beyond episode "Zeta". Infiltration Unit Zeta was built by the government to replace..'
  },
  {
    title: 'Avatar Aang',
    image: require('../assets/background7.jpg'),
    author: 'Mario Balotelli',
    text:
      'The Zeta Project is an animated series that ran from 2001 to 2002. It was a spinoff of the Batman Beyond episode "Zeta". Infiltration Unit Zeta was built by the government to replace.'
  }
];

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;
const Cont = styled.View``;
const AnimatedContainer = Animated.createAnimatedComponent(Cont);

export default ProjectsScreen;
