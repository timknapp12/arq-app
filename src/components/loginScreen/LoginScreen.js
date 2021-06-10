import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';
import { TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import {
  Flexbox,
  H6,
  PrimaryButton,
  Link,
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
  loginWithFacebook,
  loginWithGoogle,
  getToken,
  checkIfUserIsLoggedIn,
} from '../../utils/firebase/login';
import { LOGIN_USER } from '../../graphql/mutations';
import { handleLoginUser, onFaceID } from '../../utils/handleLoginFlow';

const DividerLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

const LoginScreen = ({ navigation }) => {
  initLanguage();
  const { theme, setToken, useBiometrics } = useContext(AppContext);
  const { email, password, setErrorMessage } = useContext(LoginContext);
  const [isFirstAppLoad, setIsFirstAppLoad] = useState(true);
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const [googleRequest, promptAsync] = loginWithGoogle();

  useEffect(() => {
    checkIfUserIsLoggedIn(
      setToken,
      loginUser,
      isFirstAppLoad,
      setIsFirstAppLoad,
      navigation,
    );
  }, []);

  const onFindOutMore = () => {
    Linking.openURL('https://qsciences.com');
  };

  const isButtonDisabled = !email || !password;

  const onSubmit = async () => {
    setIsFirstAppLoad(false);
    if (!email) {
      return Alert.alert(Localized('Please enter an email address'));
    }
    if (!password) {
      return Alert.alert(Localized('Please enter a password'));
    }
    try {
      await signInWithEmail(email, password, setErrorMessage);
      await getToken(setToken);
      await loginUser({
        variables: { ambassaderOnly: true },
      });
    } catch (error) {
      console.log(`error`, error.message);
    }
  };

  const loginToFirebaseAndAppWithSocial = async (socialSignIn) => {
    setIsFirstAppLoad(false);
    try {
      await socialSignIn();
      await getToken(setToken);
      await setIsFirstAppLoad(false);
      await loginUser({
        variables: { ambassaderOnly: true },
      });
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.log(`error.message`, error.message);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(`if data:`, data?.loginUser);
      const status = data?.loginUser?.loginStatus;
      handleLoginUser(
        status,
        navigation,
        useBiometrics,
        onFaceID,
        isFirstAppLoad,
      );
    }
  }, [data]);

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
              navigateToPasswordRecovery={() =>
                navigation.navigate('Password Recovery Screen')
              }
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

          <DividerLine />
          <Flexbox width="85%">
            <GoogleLoginButton
              disabled={!googleRequest}
              onPress={() => loginToFirebaseAndAppWithSocial(promptAsync)}
              style={{ marginBottom: 8 }}>
              {Localized('Sign in with Google')}
            </GoogleLoginButton>
            <FacebookLoginButton
              onPress={() =>
                loginToFirebaseAndAppWithSocial(loginWithFacebook)
              }>
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
