import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from '../Components/LoadingScreen';
import LoginScreen from '../Components/LoginScreen';
import PasswordRecoveryScreen from '../Components/PasswordRecoveryScreen';
import { white, blue } from '../Styles/colors';

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
            fontFamily: 'Nunito-Regular',
          },
        }}
      />
      <Login.Screen name="Loading Screen" component={LoadingScreen} />
    </Login.Navigator>
  );
};

export default LoginStack;
