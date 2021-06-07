import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Analytics from 'expo-firebase-analytics';
import { TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import {
  Flexbox,
  H6,
  PrimaryButton,
  Link,
  TouchIDIcon,
  FaceIDIcon,
  GoogleLoginButton,
  FacebookLoginButton,
} from '../common';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import { Localized, initLanguage } from '../../translations/Localized';
import QLogoScreen from './QLogoScreenContainer';
import EmailForm from './EmailForm';
import CreateAccountAndForgotPassword from './CreateAccountAndForgotPassword';
import TermsAndPrivacy from './TermsAndPrivacy';
import {
  signInWithEmail,
  // signInWithGoogleAsync,
  signOutOfFirebase,
  checkIfLoggedIn,
  loginWithFacebook,
  googleConfig,
} from '../../utils/firebase/login';

const DividerLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

const LoginScreen = ({ navigation }) => {
  initLanguage();
  const {
    theme,
    setIsSignedInToApp,
    // isSignedInToApp,
    useBiometrics,
    keepLoggedIn,
  } = useContext(AppContext);
  const { email, password, setIsErrorModalOpen, setErrorMessage } = useContext(
    LoginContext,
  );

  const initializeAuthStatus = async () => {
    console.log(`keepLoggedIn`, keepLoggedIn);
    if (!keepLoggedIn) {
      // TODO consider whether we need to sign out of firebase, what if they use biometrics??
      return signOutOfFirebase();
    }
    return checkIfLoggedIn(setIsSignedInToApp);
  };

  useEffect(() => {
    initializeAuthStatus();
  }, []);

  const [
    googleRequest,
    googleResponse,
    promptAsync,
  ] = Google.useIdTokenAuthRequest(googleConfig);

  // TODO move this to login.js like Facebook example
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
      console.log(`credential`, credential);
    }
  }, [googleResponse]);

  const onFindOutMore = () => {
    Linking.openURL('https://qsciences.com');
    Analytics.logEvent('Find_Out_More_Link_tapped', {
      screen: 'Login Screen',
      purpose: 'follow link to find out how to become an ambassador',
    });
  };

  const onFaceID = async () => {
    try {
      // Authenticate user
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setIsSignedInToApp(true);
      }
    } catch (error) {
      setIsErrorModalOpen(true);
      setErrorMessage(error);
    }
  };

  // useEffect(() => {
  //   if (isSignedInToApp) {
  //     navigation.navigate('Tabs');
  //   } else {
  //     navigation.navigate('Login Screen');
  //   }
  // }, [isSignedInToApp]);

  useEffect(() => {
    if (useBiometrics) {
      onFaceID();
    }
  }, [useBiometrics]);

  const isButtonDisabled = !email || !password;

  const onSubmit = async () => {
    if (!email) {
      return Alert.alert('Please enter an email address');
    }
    if (!password) {
      return Alert.alert('Please enter a password');
    }
    try {
      await signInWithEmail(email, password, setErrorMessage);
      navigation.navigate('Enter Id Screen');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Flexbox
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 20 : 60,
        backgroundColor: theme.backgroundColor,
      }}>
      <QLogoScreen style={{ paddingTop: 50 }}>
        <Flexbox
          style={{ flex: 1, paddingTop: 20 }}
          width="85%"
          accessibilityLabel="Login Form">
          <Flexbox justify="flex-start">
            <EmailForm onSubmit={onSubmit} />

            <CreateAccountAndForgotPassword
              navigateToCreateAccount={() =>
                navigation.navigate('Create Account Screen')
              }
              navigateToPasswordRecovery={() => {
                navigation.navigate('Password Recovery Screen');
              }}
            />
          </Flexbox>

          <Flexbox width="85%">
            <PrimaryButton
              testID="login-button"
              disabled={isButtonDisabled}
              onPress={onSubmit}>
              {Localized('SIGN IN')}
            </PrimaryButton>
          </Flexbox>
          {useBiometrics && (
            <Flexbox accessibilityLabel="biometrics button">
              <TouchableOpacity testID="biometrics-button" onPress={onFaceID}>
                {Platform.OS === 'ios' ? (
                  <FaceIDIcon fill={theme.highlight} />
                ) : (
                  <TouchIDIcon fill={theme.highlight} />
                )}
              </TouchableOpacity>
            </Flexbox>
          )}

          <DividerLine />
          <Flexbox width="85%">
            <GoogleLoginButton
              disabled={!googleRequest}
              onPress={promptAsync}
              style={{ marginBottom: 8 }}>
              {Localized('Sign in with Google')}
            </GoogleLoginButton>
            <FacebookLoginButton onPress={loginWithFacebook}>
              {Localized('Continue with Facebook')}
            </FacebookLoginButton>
          </Flexbox>

          <Flexbox
            accessibilityLabel="Become an Ambassador"
            padding={10}
            height="90px">
            <H6
              testID="become-ambassador-text"
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir-Book',
                opacity: 1,
              }}>
              {Localized('Interested in becoming a Q Sciences Ambassador?')}
            </H6>
            <TouchableOpacity
              testID="become-ambassador-link"
              onPress={onFindOutMore}>
              <Link>{Localized('Find out more')}</Link>
            </TouchableOpacity>
          </Flexbox>

          <TermsAndPrivacy />
        </Flexbox>
      </QLogoScreen>
    </Flexbox>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
