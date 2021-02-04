import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Components/HomeScreen';
import ProfileScreen from '../Components/ProfileScreen';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Home = createStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator>
      <Home.Screen name="Home Screen" component={HomeScreen} />
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
