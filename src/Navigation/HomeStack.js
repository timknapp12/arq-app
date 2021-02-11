import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import { white, blue } from '../Styles/colors';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Home = createStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: blue },
        headerTintColor: white,
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Nunito-Regular',
        },
      }}>
      <Home.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Home.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Home.Navigator>
  );
};
export default HomeStack;
