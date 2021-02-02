import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Components/HomeScreen';
import ProfileScreen from '../Components/ProfileScreen';

const Home = createStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Home.Screen name="LoadingScreen" component={HomeScreen} />
      <Home.Screen
        name="HomeScreen"
        component={ProfileScreen}
        options={{
          title: 'Please Home',
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
    </Home.Navigator>
  );
};
export default HomeStack;
