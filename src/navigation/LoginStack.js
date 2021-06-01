import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../components/loginScreen/LoginScreen';
import PasswordRecoveryScreen from '../components/loginScreen/PasswordRecoveryScreen';
import CreateAccountScreen from '../components/loginScreen/CreateAccountScreen';
import LoginContext from '../contexts/LoginContext';
import AppContext from '../contexts/AppContext';
import { Localized } from '../translations/Localized';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Login = createStackNavigator();

const LoginStack = () => {
  const { theme } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const storeKeepLoggedInAsyncStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@keep_me_logged_in', jsonValue);
    } catch (e) {
      console.log(`error in storing async storage:`, e);
    }
  };

  const onKeepLoggedIn = (value) => {
    setKeepLoggedIn(value);
    storeKeepLoggedInAsyncStorage(value);
  };
  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errorMessage,
        setErrorMessage,
        keepLoggedIn,
        setKeepLoggedIn,
        onKeepLoggedIn,
        clearFields,
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
            title: Localized('RECOVER PASSWORD'),
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: theme.backgroundColor },
            headerTintColor: theme.primaryTextColor,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              opacity: 0.83,
              fontFamily: 'Avenir-Light',
              letterSpacing: 1.43,
            },
          }}
        />
        <Login.Screen
          name="Create Account Screen"
          component={CreateAccountScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: theme.backgroundColor,
              shadowOpacity: 0,
            },
            headerTintColor: theme.primaryTextColor,
          }}
        />
      </Login.Navigator>
    </LoginContext.Provider>
  );
};

export default LoginStack;
