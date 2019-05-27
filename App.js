import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import Card from './components/Card';
import { NotificationIcon } from './components/Icons';
import Logo from './components/Logo';
import Course from './components/Course';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <TitleBar>
              <Avatar source={require('./assets/avatar.jpg')} />
              <Title>Welcome Back,</Title>
              <Name>Emmanuel</Name>
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
              {cards.map((card, index) => (
                <Card
                  key={index}
                  image={card.image}
                  title={card.title}
                  subtitle={card.subtitle}
                  caption={card.caption}
                  logo={card.logo}
                />
              ))}
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            {courses.map((course, index) => (
              <Course
                key={index}
                title={course.title}
                subtitle={course.subtitle}
                image={course.image}
                logo={course.logo}
                author={course.author}
                avatar={course.avatar}
                caption={course.caption}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
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

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
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
    image: require('./assets/logo-framerx.png'),
    name: 'Framer X'
  },
  {
    image: require('./assets/logo-react.png'),
    name: 'React'
  },
  {
    image: require('./assets/logo-figma.png'),
    name: 'Figma'
  },
  {
    image: require('./assets/logo-invision.png'),
    name: 'Invision'
  },
  {
    image: require('./assets/logo-swift.png'),
    name: 'Swift'
  },
  {
    image: require('./assets/logo-sketch.png'),
    name: 'Sketch'
  }
];

const cards = [
  {
    image: require('./assets/background11.jpg'),
    title: 'React Native for Designers',
    subtitle: 'React Native',
    caption: '1 of 12 sections',
    logo: require('./assets/logo-react.png')
  },
  {
    image: require('./assets/background12.jpg'),
    title: 'Styled Components',
    subtitle: 'Styled Components',
    caption: '2 of 12 sections',
    logo: require('./assets/logo-react.png')
  },
  {
    image: require('./assets/background13.jpg'),
    title: 'Props and Icons',
    subtitle: 'React Native',
    caption: '3 of 12 sections',
    logo: require('./assets/logo-react.png')
  },
  {
    image: require('./assets/background2.jpg'),
    title: 'Static Data and Loop',
    subtitle: 'React Native',
    caption: '4 of 12 sections',
    logo: require('./assets/logo-react.png')
  }
];

const courses = [
  {
    title: 'Prototype in Invision Studio',
    subtitle: '10 sections',
    image: require('./assets/background13.jpg'),
    logo: require('./assets/logo-studio.png'),
    author: 'Emamnuel Adesile',
    avatar: require('./assets/avatar.jpg'),
    caption: 'Design an Interactive Prototype'
  },
  {
    title: 'React for Designers',
    subtitle: '12 sections',
    image: require('./assets/background11.jpg'),
    logo: require('./assets/logo-react.png'),
    author: 'Emamnuel Adesile',
    avatar: require('./assets/avatar.jpg'),
    caption: 'Learn to design and code a React site'
  },
  {
    title: 'Framer X',
    subtitle: '13 sections',
    image: require('./assets/background12.jpg'),
    logo: require('./assets/logo-framerx.png'),
    author: 'Emamnuel Adesile',
    avatar: require('./assets/avatar.jpg'),
    caption: 'Learn †ø bring your design to live'
  },
  {
    title: 'Sketch for beginners',
    subtitle: '16 sections',
    image: require('./assets/background14.jpg'),
    logo: require('./assets/logo-studio.png'),
    author: 'Emamnuel Adesile',
    avatar: require('./assets/avatar.jpg'),
    caption: 'Learn sketch from scratch'
  }
];
