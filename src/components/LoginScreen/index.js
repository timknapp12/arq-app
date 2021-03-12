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
} from '../Common';
import {
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AppContext from '../../Contexts/AppContext';
import logo from '../../../assets/q-sciences-logo.png';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, init } from '../../Translations/Localized';
import { ADD_USER } from '../../graphql/Mutations';
import { useMutation } from '@apollo/client';

import LoadingScreen from '../LoadingScreen';

const LoginInstructions = styled(H4)`
  text-align: center;
  padding: 0 22px;
  margin-bottom: 22px;
`;

const LoginScreen = () => {
  init();
  const { setIsSignedIn, theme, setUser } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // TODO Replace this with real error handling
  const [isError, setIsError] = useState(false);
  const passwordRef = useRef(null);
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      if (!data.addUser.user) {
        setIsError(true);
      } else {
        setUser(data);
        setIsError(false);
        setIsSignedIn(true);
      }
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
    addUser({ variables: { usernameIn: username, passwordIn: password } });

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
  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    setIsError(true);
    console.log('error in login:', error);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenContainer>
        <Flexbox justify="space-between" height="100%">
          <KeyboardAvoidingView
            style={{
              width: '100%',
              height: '60%',
            }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <Flexbox
              style={{ marginTop: 20 }}
              accessibilityLabel="Login Form"
              justify="space-between"
              height="100%"
              padding={20}>
              <Image source={logo} />
              <LoginInstructions testID="login-instructions">
                {Localized(
                  'Log in if you already have a username and password',
                )}
              </LoginInstructions>

              <Flexbox style={{ marginBottom: 22 }}>
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

              <Flexbox style={{ marginBottom: 12 }}>
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

              <Flexbox height="60px" style={{ marginBottom: 8 }}>
                {isError && (
                  <AlertText
                    style={{
                      textAlign: 'center',
                    }}>
                    {Localized(
                      `Sorry, we couldn't log you in. Please re-enter your username and password`,
                    )}
                  </AlertText>
                )}
                <TouchableOpacity
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
              </Flexbox>

              <Flexbox width="85%">
                <PrimaryButton
                  testID="login-button"
                  disabled={isButtonDisabled}
                  style={{ marginTop: 12 }}
                  onPress={onSubmit}>
                  {Localized('Log In')}
                </PrimaryButton>
              </Flexbox>
            </Flexbox>
          </KeyboardAvoidingView>

          <Flexbox
            accessibilityLabel="Become an Ambassador"
            justify="flex-start"
            padding={20}
            style={{
              flex: 1,
              marginTop: 20,
            }}>
            <H6 testID="become-ambassador-text" style={{ textAlign: 'center' }}>
              {Localized('Interested in becoming a QSciences Ambassador?')}
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
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
