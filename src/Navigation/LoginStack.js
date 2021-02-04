import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from '../Components/LoadingScreen';
import LoginScreen from '../Components/LoginScreen';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Login = createStackNavigator();

const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Login.Screen name="Loading Screen" component={LoadingScreen} />
      <Login.Screen
        name="Login Screen"
        component={LoginScreen}
        options={{
          title: 'Please Login',
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
    </Login.Navigator>
  );
};

export default LoginStack;
