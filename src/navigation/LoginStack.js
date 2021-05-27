import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/loginScreen/LoginScreen';
import PasswordRecoveryScreen from '../components/loginScreen/PasswordRecoveryScreen';
import CreateAccountScreen from '../components/loginScreen/CreateAccountScreen';
import { white, blue } from '../styles/colors';
import LoginContext from '../contexts/LoginContext';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Login = createStackNavigator();

const LoginStack = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isError,
        setIsError,
        isErrorModalOpen,
        setIsErrorModalOpen,
        errorMessage,
        setErrorMessage,
      }}>
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
        <Login.Screen
          name="Create Account Screen"
          component={CreateAccountScreen}
          options={{
            headerShown: false,
            headerLeft: () => {
              return null;
            },
          }}
        />
      </Login.Navigator>
    </LoginContext.Provider>
  );
};

export default LoginStack;
