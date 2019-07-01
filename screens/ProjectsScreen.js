import React from 'react';
import styled from 'styled-components';
import { PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';
import Project from '../components/Project';

function getIndex(index) {
  let nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    opacity: new Animated.Value(0),
    index: 0
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (this.props.action === 'openCard') {
            return false;
          } else {
            return true;
          }
        }
      },

      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();

        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();

        Animated.timing(this.state.opacity, { toValue: 1 }).start();
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        Animated.timing(this.state.opacity, { toValue: 0 }).start();

        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 }
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getIndex(this.state.index) });
          });
        } else {
          new Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
          new Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          new Animated.spring(this.state.translateY, { toValue: 44 }).start();

          new Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          new Animated.spring(this.state.thirdTranslateY, {
            toValue: -50
          }).start();
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <AninatedMask style={{ opacity: this.state.opacity }} />
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
            canOpen={true}
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            text={projects[this.state.index].text}
            author={projects[this.state.index].author}
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
            title={projects[getIndex(this.state.index)].title}
            image={projects[getIndex(this.state.index)].image}
            text={projects[getIndex(this.state.index)].text}
            author={projects[getIndex(this.state.index)].author}
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
          <Project
            title={projects[getIndex(this.state.index + 1)].title}
            image={projects[getIndex(this.state.index + 1)].image}
            text={projects[getIndex(this.state.index + 1)].text}
            author={projects[getIndex(this.state.index + 1)].author}
          />
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
      'The Zeta Project is an animated series that ran from 2001 to 2002. It was a spinoff of the Batman Beyond episode "Zeta". Infiltration Unit Zeta was built by the government to replace. The Zeta Project is an animated series that ran from 2001 to 2002. It was a spinoff of the Batman Beyond episode "Zeta". Infiltration Unit Zeta was built by the government to replace.'
  },
  {
    title: 'Avatar Aang',
    image: require('../assets/background7.jpg'),
    author: 'Mario Balotelli',
    text:
      'The Zeta Project is an animated series that ran from 2001 to 2002. It was a spinoff of the Batman Beyond episode "Zeta". Infiltration Unit Zeta was built by the government to replace.'
  },
  {
    title: 'Roteserie',
    image: require('../assets/background2.jpg'),
    author: 'Sam the Cooking Guy',
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

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;

const AninatedMask = Animated.createAnimatedComponent(Mask);

export default connect(mapStateToProps)(ProjectsScreen);
