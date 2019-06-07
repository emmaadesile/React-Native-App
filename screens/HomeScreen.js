import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Card from '../components/Card';
import { NotificationIcon } from '../components/Icons';
import Logo from '../components/Logo';
import Course from '../components/Course';
import Menu from '../components/Menu';
import Avatar from '../components/Avatar';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          url
          width
          height
          size
        }
        image {
          title
          description
          contentType
          fileName
          size
          width
          height
          url
        }
      }
    }
  }
`;

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    fetch('https://uinames.com/api/?ext')
      .then(resp => resp.json())
      .then();
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action === 'openMenu') {
      new Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      new Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle('light-content', true);
    }

    if (this.props.action === 'closeMenu') {
      new Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      new Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();
    }

    StatusBar.setBarStyle('dark-content', true);
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 24
                  }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome Back,</Title>
                <Name>{this.props.name}</Name>
                <NotificationIcon
                  style={{ position: 'absolute', top: 5, right: 20 }}
                />
              </TitleBar>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{
                  flexDirection: 'row',
                  paddingBottom: 20,
                  paddingLeft: 20,
                  paddingTop: 20
                }}
                horizontal={true}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} title={logo.name} image={logo.image} />
                ))}
              </ScrollView>
              <Subtitle>Continue Learning</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;

                    return data.cardsCollection.items.map((card, index) => (
                      <CardsContainer key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.push('Section', {
                              section: card
                            });
                          }}
                        >
                          <Card
                            image={card.image}
                            title={card.title}
                            subtitle={card.subtitle}
                            caption={card.caption}
                            logo={card.logo}
                          />
                        </TouchableOpacity>
                      </CardsContainer>
                    ));
                  }}
                </Query>
              </ScrollView>
              <Subtitle>Popular Courses</Subtitle>
              {courses.map((course, index) => (
                <TouchableOpacity key={index}>
                  <Course
                    title={course.title}
                    subtitle={course.subtitle}
                    image={course.image}
                    logo={course.logo}
                    author={course.author}
                    avatar={course.avatar}
                    caption={course.caption}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

const mapStateToProps = state => ({
  action: state.action,
  name: state.name
});

const mapDispatchToProps = dispatch => ({
  openMenu: () =>
    dispatch({
      type: 'OPEN_MENU'
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const Message = styled.Text`
  color: #b8bece;
  margin: 20px;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = new Animated.createAnimatedComponent(Container);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const logos = [
  {
    image: require('../assets/logo-framerx.png'),
    name: 'Framer X'
  },
  {
    image: require('../assets/logo-react.png'),
    name: 'React'
  },
  {
    image: require('../assets/logo-figma.png'),
    name: 'Figma'
  },
  {
    image: require('../assets/logo-invision.png'),
    name: 'Invision'
  },
  {
    image: require('../assets/logo-swift.png'),
    name: 'Swift'
  },
  {
    image: require('../assets/logo-sketch.png'),
    name: 'Sketch'
  }
];

// const cards = [
//   {
//     image: require('../assets/background11.jpg'),
//     title: 'React Native for Designers',
//     subtitle: 'React Native',
//     caption: '1 of 12 sections',
//     logo: require('../assets/logo-react.png')
//   },
//   {
//     image: require('../assets/background12.jpg'),
//     title: 'Styled Components',
//     subtitle: 'Styled Components',
//     caption: '2 of 12 sections',
//     logo: require('../assets/logo-react.png')
//   },
//   {
//     image: require('../assets/background13.jpg'),
//     title: 'Props and Icons',
//     subtitle: 'React Native',
//     caption: '3 of 12 sections',
//     logo: require('../assets/logo-react.png')
//   },
//   {
//     image: require('../assets/background2.jpg'),
//     title: 'Static Data and Loop',
//     subtitle: 'React Native',
//     caption: '4 of 12 sections',
//     logo: require('../assets/logo-react.png')
//   }
// ];

const courses = [
  {
    title: 'Prototype in Invision Studio',
    subtitle: '10 sections',
    image: require('../assets/background13.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'Emamnuel Adesile',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design an Interactive Prototype'
  },
  {
    title: 'React for Designers',
    subtitle: '12 sections',
    image: require('../assets/background11.jpg'),
    logo: require('../assets/logo-react.png'),
    author: 'Emamnuel Adesile',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Learn to design and code a React site'
  },
  {
    title: 'Framer X',
    subtitle: '13 sections',
    image: require('../assets/background12.jpg'),
    logo: require('../assets/logo-framerx.png'),
    author: 'Emamnuel Adesile',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Learn to bring your design to life'
  },
  {
    title: 'Sketch for beginners',
    subtitle: '16 sections',
    image: require('../assets/background14.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'Emamnuel Adesile',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Learn sketch from scratch'
  }
];
