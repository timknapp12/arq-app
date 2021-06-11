import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useMutation, useLazyQuery } from '@apollo/client';
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
import ErrorModal from '../errorModal/ErrorModal';
import TermsAndPrivacy from './TermsAndPrivacy';
import {
  signInWithEmail,
  loginWithFacebook,
  loginWithGoogle,
  getToken,
  signOutOfFirebase,
  checkIfUserIsLoggedIn,
} from '../../utils/firebase/login';
import { LOGIN_USER } from '../../graphql/mutations';
import { GET_USER } from '../../graphql/queries';
import { handleLoginUser, onFaceID } from '../../utils/handleLoginFlow';

const DividerLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

const LoginScreen = ({ navigation }) => {
  initLanguage();
  const { theme, setToken, useBiometrics, setUser } = useContext(AppContext);
  const { email, password, setErrorMessage, errorMessage } = useContext(
    LoginContext,
  );

  const [isFirstAppLoad, setIsFirstAppLoad] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted: (data) => setUser(data),
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: { ambassaderOnly: true },
    onCompleted: (data) => {
      console.log(`if data:`, data?.loginUser);
      const status = data?.loginUser?.loginStatus;
      handleLoginUser(
        status,
        navigation,
        useBiometrics,
        onFaceID,
        isFirstAppLoad,
      );
      // get associate id if it exists
      if (data.associate) {
        console.log(`data.associate`, data.associate.associateId);
        // query treeNodeFor with id
        const id = data.associate.associateId;
        getUser({
          variables: { associateId: id },
        });
      }
    },
    onError: (error) => {
      setIsErrorModalOpen(true);
      setErrorMessage(error.message);
    },
  });

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
    await setIsFirstAppLoad(false);
    await signOutOfFirebase;
    if (!email) {
      return Alert.alert(Localized('Please enter an email address'));
    }
    if (!password) {
      return Alert.alert(Localized('Please enter a password'));
    }
    try {
      await signInWithEmail(email, password, setErrorMessage);
      await getToken(setToken);
      await loginUser();
    } catch (error) {
      console.log(`error`, error.message);
    }
  };

  const loginToFirebaseAndAppWithSocial = async (socialSignIn) => {
    await setIsFirstAppLoad(false);
    await signOutOfFirebase;
    try {
      await socialSignIn();
      await getToken(setToken);
      await setIsFirstAppLoad(false);
      await loginUser();
    } catch (error) {
      console.log(`error.message`, error.message);
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
        <ErrorModal
          visible={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          errorMessage={errorMessage}
        />
      </QLogoScreen>
    </Flexbox>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
