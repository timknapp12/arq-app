import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';
import LoadingScreen from '../Components/LoadingScreen';
import LoginScreen from '../Components/LoginScreen';

const Login = createStackNavigator();

const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Login.Screen name="LoadingScreen" component={LoadingScreen} />
      <Login.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Please Login',
          gestureEnabled: false,
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Login.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerTitle: 'Fish Slap App',
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
