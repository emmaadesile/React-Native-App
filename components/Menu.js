import React from 'react';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Icon } from 'expo';
import MenuItem from './MenuItem';

const screenHeight = Dimensions.get('window').height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight)
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action === 'openMenu') {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start();
    }

    if (this.props.action === 'closeMenu') {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require('../assets/background2.jpg')} />
          <Title>{this.props.name}</Title>
          <Subtitle>Developer at Design+Radii</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={closeButtonStyles}
        >
          <CloseView>
            <Icon.Ionicons name="ios-close" size={44} color="#546bfb" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              text={item.text}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

const mapStateToProps = state => {
  return { action: state.action, name: state.name };
};

const mapDispatchToProps = dispatch => ({
  closeMenu: () => dispatch({ type: 'CLOSE_MENU' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

// ======================================== Styles
const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 24px;
`;
const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-top: 8px;
`;

const closeButtonStyles = {
  position: 'absolute',
  top: 120,
  left: '50%',
  marginLeft: -22,
  zIndex: 1
};

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10;
  overflow: hidden;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #fff;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;
const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const menuItems = [
  {
    icon: 'ios-settings',
    title: 'Account',
    text: 'settings'
  },
  {
    icon: 'ios-card',
    title: 'Billing',
    text: 'payments'
  },
  {
    icon: 'ios-compass',
    title: 'Learn React',
    text: 'start course'
  },
  {
    icon: 'ios-exit',
    title: 'Logout',
    text: 'see you soon!'
  }
];
