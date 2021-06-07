import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
import {
  TouchableOpacity,
  Platform,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Flexbox,
  H4,
  H6,
  PrimaryButton,
  Link,
  TouchIDIcon,
  FaceIDIcon,
  GoogleLoginButton,
  FacebookLoginButton,
} from '../common';
import AppContext from '../../contexts/AppContext';
import { Localized, initLanguage } from '../../translations/Localized';
import { ADD_USER } from '../../graphql/mutations';
import QLogoScreen from './QLogoScreen';
import EmailForm from './EmailForm';
import CreateAccountAndForgotPassword from './CreateAccountAndForgotPassword';
import ErrorModal from '../errorModal/ErrorModal';
import LoadingScreen from '../loadingScreen/LoadingScreen';

const DividerLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

const LoginScreen = () => {
  initLanguage();
  const { setIsSignedIn, theme, setUser, useBiometrics } = useContext(
    AppContext,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveUsername, setSaveUsername] = useState(true);
  const passwordRef = useRef(null);
  const [addUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      // the backend will give a userId of 0 if the credentials fail
      if (data.addUser.user.userId === 0) {
        setIsError(true);
      } else {
        setUser(data);
        setIsError(false);
        setIsSignedIn(true);
      }
    },
    onError: (error) => {
      setIsErrorModalOpen(true);
      setErrorMessage(error);
    },
  });
  const onNext = () => {
    passwordRef.current.focus();
  };

  // username: ShAmb
  // password: asdf1234A
  const onSubmit = () => {
    if (isButtonDisabled) {
      return;
    }
    try {
      addUser({ variables: { usernameIn: username, passwordIn: password } });
    } catch (e) {
      setIsError(true);
    }
    storeUsername();
    storeSaveUsernamePreference();
    Analytics.logEvent('Login_button_tapped', {
      screen: 'Login Screen',
      username: username,
      purpose: 'Login to the app',
    });
  };

  useEffect(() => {
    if (username && password) {
      setIsButtonDisabled(false);
    }
    return () => {
      setIsButtonDisabled(true);
    };
  }, [username, password]);

  const onFindOutMore = () => {
    Linking.openURL('https://qsciences.com');
    Analytics.logEvent('Find_Out_More_Link_tapped', {
      screen: 'Login Screen',
      purpose: 'follow link to find out how to become an ambassador',
    });
  };

  // if user selects checkbox than save username to input value, otherwise save as empty string
  // source for async storage: https://react-native-async-storage.github.io/async-storage/docs/usage/
  const storeUsername = async () => {
    let value = saveUsername ? username : '';
    try {
      await AsyncStorage.setItem('@stored_username', value);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const getStoredUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('@stored_username');
      if (value !== null) {
        return setUsername(value);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  // save to local storage the user preference for saving username
  const storeSaveUsernamePreference = async () => {
    let value = saveUsername ? true : false;
    try {
      await AsyncStorage.setItem(
        '@stored_username_preference',
        JSON.stringify(value),
      );
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const getSaveUsernamePreference = async () => {
    try {
      const value = await AsyncStorage.getItem('@stored_username_preference');
      const jsonValue = JSON.parse(value);
      if (value !== null) {
        return setSaveUsername(jsonValue);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    getStoredUsername();
    getSaveUsernamePreference();
  }, []);

  const onFaceID = async () => {
    try {
      // Authenticate user
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setIsSignedIn(true);
      }
    } catch (error) {
      setIsErrorModalOpen(true);
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    if (useBiometrics) {
      onFaceID();
    }
  }, [useBiometrics]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <ScreenContainer style={{ justifyContent: 'space-between', padding: 20 }}> */}
      <QLogoScreen>
        <Flexbox
          style={{ flex: 1 }}
          width="85%"
          accessibilityLabel="Login Form"
          justify="space-between">
          <EmailForm
            username={username}
            setUsername={setUsername}
            password={password}
            // confirmPassword={confirmPassword}
            // setConfirmPassword={setConfirmPassword}
            setPassword={setPassword}
            passwordRef={passwordRef}
            onNext={onNext}
            onSubmit={onSubmit}
          />

          {/* <Flexbox height="60px" align="flex-start"> */}
          <CreateAccountAndForgotPassword
            isError={isError}
            saveUsername={saveUsername}
            setSaveUsername={setSaveUsername}
          />
          {/* </Flexbox> */}

          <Flexbox style={{ marginBottom: 4 }} width="85%">
            <PrimaryButton
              style={{ marginBottom: 4 }}
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
            <GoogleLoginButton style={{ marginBottom: 8 }}>
              Sign in with Google
            </GoogleLoginButton>
            <FacebookLoginButton>Continue with Facebook</FacebookLoginButton>
          </Flexbox>

          <Flexbox
            accessibilityLabel="Become an Ambassador"
            justify="flex-start"
            padding={20}
            style={{
              marginTop: 8,
            }}>
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
              onPress={onFindOutMore}
              style={{ marginTop: 12 }}>
              <Link>{Localized('Find out more')}</Link>
            </TouchableOpacity>
          </Flexbox>

          <Flexbox
            accessibilityLabel="Terms Privacy Data"
            justify="center"
            direction="row"
            padding={14}>
            <TouchableOpacity testID="terms-button">
              <H4>{Localized('Terms')}</H4>
            </TouchableOpacity>
            <H4 style={{ marginStart: 8 }}>|</H4>
            <TouchableOpacity
              testID="privacy-button"
              style={{ marginStart: 8 }}>
              <H4>{Localized('Privacy')}</H4>
            </TouchableOpacity>
            <H4 style={{ marginStart: 8 }}>|</H4>
            <TouchableOpacity testID="data-button" style={{ marginStart: 8 }}>
              <H4>{Localized('Data')}</H4>
            </TouchableOpacity>
          </Flexbox>
        </Flexbox>
        <ErrorModal
          visible={isErrorModalOpen}
          onClose={() => {
            setErrorMessage('');
            setIsErrorModalOpen(false);
          }}
          errorMessage={errorMessage}
        />
        {/* </ScreenContainer> */}
      </QLogoScreen>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
