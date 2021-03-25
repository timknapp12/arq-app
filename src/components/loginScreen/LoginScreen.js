import React, { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import {
  ScreenContainer,
  Flexbox,
  Input,
  H4,
  H6,
  PrimaryButton,
  AlertText,
  Link,
  Checkmark,
} from '../common';
import {
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AppContext from '../../contexts/AppContext';
import logo from '../../../assets/q-science-stacked-logo-white.png';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, initLanguage } from '../../translations/Localized';
import { ADD_USER } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import ErrorModal from '../errorModal/ErrorModal';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginInstructions = styled(H4)`
  text-align: center;
  padding: 0 18px;
  margin-bottom: 18px;
  font-family: 'Nunito-Light';
`;

const Checkbox = styled.View`
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border-color: ${(props) => props.theme.color};
  border-width: ${(props) => (props.selected ? '0px' : '1px')};
  background-color: ${(props) => (props.selected ? '#006699' : 'transparent')};
`;

const LoginScreen = () => {
  initLanguage();
  const { setIsSignedIn, theme, setUser, useBiometrics } = useContext(
    AppContext,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      <ScreenContainer>
        <Flexbox justify="space-between" height="100%">
          <KeyboardAvoidingView
            style={{
              width: '100%',
              height: '70%',
            }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <Flexbox
              accessibilityLabel="Login Form"
              justify="space-between"
              height="100%"
              padding={20}>
              <Image style={{ marginBottom: 4 }} source={logo} />
              <LoginInstructions testID="login-instructions">
                {Localized(
                  'Log in if you already have a username and password',
                )}
              </LoginInstructions>
              <Flexbox style={{ marginBottom: 8 }}>
                <Input
                  testID="username-input"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  keyboardType="email-address"
                  placeholder={Localized('Username')}
                  placeholderTextColor={theme.disabledTextColor}
                  returnKeyType="next"
                  onSubmitEditing={onNext}
                />
              </Flexbox>

              <Flexbox style={{ marginBottom: 4 }}>
                <Input
                  testID="password-input"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  ref={passwordRef}
                  placeholder={Localized('Password')}
                  placeholderTextColor={theme.disabledTextColor}
                  textContentType="password"
                  returnKeyType="go"
                  onSubmitEditing={onSubmit}
                />
              </Flexbox>

              <Flexbox justify="flex-start" style={{ marginBottom: 8 }}>
                {isError && (
                  <AlertText
                    style={{
                      textAlign: 'center',
                      marginBottom: 12,
                    }}>
                    {Localized(
                      `Sorry, we couldn't log you in. Please re-enter your username and password`,
                    )}
                  </AlertText>
                )}
                <TouchableOpacity
                  style={{ marginBottom: 12 }}
                  // TODO integrate password recovery screen
                  // onPress={() =>
                  //   navigation.navigate('Password Recovery Screen')
                  // }
                  onPress={() =>
                    Linking.openURL('https://office2.myqsciences.com/#/Login')
                  }
                  testID="forgot-password-button">
                  <H6>{Localized('Forgot password?')}</H6>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 4,
                  }}
                  onPress={() => setSaveUsername((state) => !state)}>
                  <Checkbox selected={saveUsername}>
                    {saveUsername && <Checkmark>&#10003;</Checkmark>}
                  </Checkbox>
                  <H6 style={{ marginStart: 12 }}>
                    {Localized('Remember my username')}
                  </H6>
                </TouchableOpacity>
              </Flexbox>

              <Flexbox style={{ marginBottom: 4 }} width="85%">
                <PrimaryButton
                  style={{ marginBottom: 4 }}
                  testID="login-button"
                  disabled={isButtonDisabled}
                  onPress={onSubmit}>
                  {Localized('LOG IN')}
                </PrimaryButton>
              </Flexbox>
            </Flexbox>
          </KeyboardAvoidingView>

          <Flexbox
            accessibilityLabel="Become an Ambassador"
            justify="flex-start"
            padding={20}
            style={{
              marginTop: 8,
            }}>
            <H6 testID="become-ambassador-text" style={{ textAlign: 'center' }}>
              {Localized('Interested in becoming a Q Sciences Ambassador?')}
            </H6>
            <TouchableOpacity
              testID="become-ambassador-link"
              onPress={onFindOutMore}
              style={{ marginTop: 12 }}>
              <Link>{Localized('Find out more')}</Link>
            </TouchableOpacity>
          </Flexbox>

          <KeyboardAvoidingView
            style={{
              width: '100%',
            }}
            behavior={Platform.OS == 'ios' ? null : 'height'}>
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
          </KeyboardAvoidingView>
        </Flexbox>
        <ErrorModal
          visible={isErrorModalOpen}
          onClose={() => {
            setErrorMessage('');
            setIsErrorModalOpen(false);
          }}
          errorMessage={errorMessage}
        />
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
