import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/login/loginScreen/LoginScreen';
import PasswordRecoveryScreen from '../components/login/loginScreen/PasswordRecoveryScreen';
import CreateAccountScreen from '../components/login/CreateAccountScreen';
import EnterIdScreen from '../components/login/EnterIdScreen';
import ConfirmAccountScreen from '../components/login/ConfirmAccountScreen';
import VerificationCodeScreen from '../components/login/VerificationCodeScreen';
import BiometricsScreen from '../components/login/BiometricsScreen';
import CreateTeamScreen from '../components/login/CreateTeamScreen';
import RedirectUnauthorizedUserScreen from '../components/login/RedirectUnauthorizedUserScreen';
import AppStack from './AppStack';
import AppContext from '../contexts/AppContext';
import InitialDataContainer from '../components/login/InitialDataContainer';
import { Localized } from '../translations/Localized';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Login = createStackNavigator();

const LoginStack = () => {
  const { theme } = useContext(AppContext);

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
    <InitialDataContainer>
      <Login.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Login.Screen
          name="Login Screen"
          component={LoginScreen}
          options={{
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
            title: Localized('Reset Password').toUpperCase(),
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
            headerShown: false,
            gestureEnabled: false,
            headerLeft: () => {
              return null;
            },
          }}
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
    </InitialDataContainer>
  );
};

export default LoginStack;
