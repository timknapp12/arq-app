import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/loginScreen/LoginScreen';
import PasswordRecoveryScreen from '../components/loginScreen/PasswordRecoveryScreen';
import CreateAccountScreen from '../components/loginScreen/CreateAccountScreen';
import EnterIdScreen from '../components/loginScreen/EnterIdScreen';
import ConfirmAccountScreen from '../components/loginScreen/ConfirmAccountScreen';
import VerificationCodeScreen from '../components/loginScreen/VerificationCodeScreen';
import BiometricsScreen from '../components/loginScreen/BiometricsScreen';
import CreateTeamScreen from '../components/loginScreen/CreateTeamScreen';
import RedirectUnauthorizedUserScreen from '../components/loginScreen/RedirectUnauthorizedUserScreen';
import AppStack from './AppStack';
import LoginContext from '../contexts/LoginContext';
import AppContext from '../contexts/AppContext';
import { Localized } from '../translations/Localized';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Login = createStackNavigator();

const LoginStack = () => {
  const { theme } = useContext(AppContext);
  const [email, setEmail] = useState('tim@email.com');
  const [password, setPassword] = useState('test123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const onboardingScreenOptions = {
    title: '',
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: theme.backgroundColor,
      shadowOpacity: 0,
    },
    headerTintColor: theme.primaryTextColor,
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
            title: Localized('Reset password').toUpperCase(),
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
          options={onboardingScreenOptions}
        />
        <Login.Screen
          name="Enter Id Screen"
          component={EnterIdScreen}
          options={onboardingScreenOptions}
        />
        <Login.Screen
          name="Confirm Account Screen"
          component={ConfirmAccountScreen}
          options={onboardingScreenOptions}
        />
        <Login.Screen
          name="Verification Code Screen"
          component={VerificationCodeScreen}
          options={onboardingScreenOptions}
        />
        <Login.Screen
          name="Biometrics Screen"
          component={BiometricsScreen}
          options={onboardingScreenOptions}
        />
        <Login.Screen
          name="Create Team Screen"
          component={CreateTeamScreen}
          options={onboardingScreenOptions}
        />
        <Login.Screen
          name="Redirect Unauthorized User Screen"
          component={RedirectUnauthorizedUserScreen}
          options={onboardingScreenOptions}
        />
        <Login.Screen
          name="App Stack"
          component={AppStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Login.Navigator>
    </LoginContext.Provider>
  );
};

export default LoginStack;
