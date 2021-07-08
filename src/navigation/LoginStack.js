import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
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
import LoginContext from '../contexts/LoginContext';
import AppContext from '../contexts/AppContext';
import { Localized } from '../translations/Localized';
import {
  GET_RANKS,
  GET_MARKETS,
  GET_USER,
  GET_PROFILE,
} from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';

// source for stack navigator: https://reactnavigation.org/docs/hello-react-navigation
const Login = createStackNavigator();

const LoginStack = () => {
  const { theme, associateId, legacyId, setHasPermissions } =
    useContext(AppContext);
  // TODO: remove creds before build
  const [email, setEmail] = useState('tim@test.com');
  const [password, setPassword] = useState('test123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [directScaleUser, setDirectScaleUser] = useState({
    associateId: null,
    emailAddress: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
  });
  // we only want to use FaceID on the launch or opening of the app to automatically login the user (if there is a token), and not if they navigate back to the login screen
  const [isFirstAppLoad, setIsFirstAppLoad] = useState(true);
  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const { data: ranksData } = useQuery(GET_RANKS);

  const { data: marketsData } = useQuery(GET_MARKETS);

  const [getUser, { data: userData }] = useLazyQuery(GET_USER, {
    variables: { legacyAssociateId: legacyId },
    onCompleted: (data) => {
      if (
        data?.treeNodeFor?.currentAmbassadorMonthlyRecord?.highestRank?.rankId >
        10
      ) {
        setHasPermissions(true);
      }
    },
  });

  const [getProfile, { data: profileData }] = useLazyQuery(GET_PROFILE, {
    variables: { associateId },
  });

  const [updateProfile] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_PROFILE, variables: { associateId } }],
    onCompleted: (data) => {
      if (data.updateAssociate.associateId) {
        getProfile({
          variables: { associateId: data.updateAssociate.associateId },
        });
      }
    },
  });

  useEffect(() => {
    getUser();
  }, [legacyId]);

  useEffect(() => {
    getProfile();
  }, [associateId]);

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
        directScaleUser,
        setDirectScaleUser,
        isFirstAppLoad,
        setIsFirstAppLoad,
        clearFields,
        ranks: ranksData?.ranks,
        markets: marketsData?.activeCountries,
        user: userData?.treeNodeFor,
        userProfile: profileData?.associates?.[0],
        updateProfile,
      }}>
      <Login.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
        }}>
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
    </LoginContext.Provider>
  );
};

export default LoginStack;
