import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/loginScreen/LoginScreen';
import PasswordRecoveryScreen from '../components/passwordRecoveryScreen/PasswordRecoveryScreen';
import { white, blue } from '../styles/colors';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Login = createStackNavigator();

const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Login.Screen
        name="Login Screen"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerShown: false,
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Login.Screen
        name="Password Recovery Screen"
        component={PasswordRecoveryScreen}
        options={{
          title: 'Password Recovery',
          headerStyle: { backgroundColor: blue },
          headerTintColor: white,
          headerTitleStyle: {
            fontSize: 24,
            opacity: 0.83,
            fontFamily: 'Avenir-Light',
          },
        }}
      />
    </Login.Navigator>
  );
};

export default LoginStack;
