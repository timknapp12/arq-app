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
} from '../Common';
import {
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppContext from '../../Contexts/AppContext';
import logo from '../../../assets/q-sciences-logo-white.png';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, init } from '../../Translations/Localized';

const LoginInstructions = styled(H4)`
  text-align: center;
  padding: 0 22px;
  margin-bottom: 22px;
`;

const LoginScreen = () => {
  init();
  const { setIsSignedIn, theme } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // TODO Replace this with real error handling
  const [isError, setIsError] = useState(false);
  const passwordRef = useRef(null);

  const onNext = () => {
    passwordRef.current.focus();
  };
  const onSubmit = () => {
    setIsSignedIn(true);
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
  return (
    <ScreenContainer>
      <Flexbox justify="space-between" height="100%">
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <Flexbox
            accessibilityLabel="Login Form"
            justify="space-between"
            height="85%"
            padding={20}>
            <TouchableOpacity
              style={{ marginBottom: 10 }}
              onPress={() => setIsError((state) => !state)}>
              <AlertText>Toggle Error</AlertText>
            </TouchableOpacity>
            <Image source={logo} />

            <LoginInstructions testID="login-instructions">
              {Localized('login-instructions')}
            </LoginInstructions>

            <Flexbox style={{ marginBottom: 22 }}>
              <Input
                testID="username-input"
                value={username}
                onChangeText={(text) => setUsername(text)}
                keyboardType="email-address"
                placeholder={Localized('username')}
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
                placeholder={Localized('password')}
                placeholderTextColor={theme.disabledTextColor}
                textContentType="password"
                returnKeyType="go"
                onSubmitEditing={onSubmit}
              />
            </Flexbox>

            <Flexbox height="60px" style={{ marginBottom: 20 }}>
              {isError && (
                <AlertText
                  style={{
                    textAlign: 'center',
                  }}>
                  {Localized('login-error')}
                </AlertText>
              )}
              <TouchableOpacity testID="forgot-password-button">
                <H6>{Localized('forgot-password')}</H6>
              </TouchableOpacity>
            </Flexbox>

            <Flexbox width="85%" accessibilityLabel="Login Button">
              <PrimaryButton
                testID="login-button"
                disabled={isButtonDisabled}
                style={{ marginTop: 12 }}
                onPress={onSubmit}>
                {Localized('login-text')}
              </PrimaryButton>
            </Flexbox>
          </Flexbox>
        </KeyboardAvoidingView>

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
            <TouchableOpacity
              onPress={() => console.log('tapped terms')}
              testID="terms-button">
              <H4>{Localized('terms')}</H4>
            </TouchableOpacity>
            <H4 style={{ marginStart: 8 }}>|</H4>
            <TouchableOpacity
              testID="privacy-button"
              style={{ marginStart: 8 }}>
              <H4>{Localized('privacy')}</H4>
            </TouchableOpacity>
            <H4 style={{ marginStart: 8 }}>|</H4>
            <TouchableOpacity testID="data-button" style={{ marginStart: 8 }}>
              <H4>{Localized('data')}</H4>
            </TouchableOpacity>
          </Flexbox>
        </KeyboardAvoidingView>
      </Flexbox>
    </ScreenContainer>
  );
};

export default LoginScreen;
