import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import { Icon } from 'expo';
import ProjectsScreen from '../screens/ProjectsScreen';
import CoursesScreen from '../screens/CoursesScreen';

const colors = {
  activeColor: '#4775f2',
  inactiveColor: '#b8bece'
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen
  },
  {
    mode: 'modal'
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === 'Section') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        name="ios-home"
        size={24}
        color={focused ? colors.activeColor : colors.inactiveColor}
      />
    )
  };
};

const CoursesStack = createStackNavigator({
  Courses: CoursesScreen
});

CoursesStack.navigationOptions = {
  tabBarLabel: 'Courses',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-albums"
      size={24}
      color={focused ? colors.activeColor : colors.inactiveColor}
    />
  )
};

const ProjectStack = createStackNavigator({
  Projects: ProjectsScreen
});

ProjectStack.navigationOptions = {
  tabBarLabel: 'Projects',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-folder"
      size={24}
      color={focused ? colors.activeColor : colors.inactiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectStack
});

export default TabNavigator;
