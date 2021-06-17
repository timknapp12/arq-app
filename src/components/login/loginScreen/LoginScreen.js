import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';
import { Platform, Linking, Alert, View } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import { Flexbox, H4Secondary, PrimaryButton, AlertText } from '../../common';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import { Localized, initLanguage } from '../../../translations/Localized';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import QLogoScreen from '../QLogoScreenContainer';
import EmailForm from './EmailForm';
import CreateAccountAndForgotPassword from './CreateAccountAndForgotPassword';
import SocialSignIn from './SocialSignIn';
import FindOutMore from './FindOutMore';
import TermsAndPrivacy from './TermsAndPrivacy';
import ErrorModal from '../../errorModal/ErrorModal';
import {
  signInWithEmail,
  loginWithFacebook,
  loginWithGoogle,
  getToken,
  signOutOfFirebase,
  checkIfUserIsLoggedIn,
} from '../../../utils/firebase/login';
import { LOGIN_USER } from '../../../graphql/mutations';
import { handleLoginUser, onFaceID } from '../../../utils/handleLoginFlow';

const DividerLine = styled.View`
  height: 1px;
  margin: 0 8px;
  flex: 1;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

const LoginScreen = ({ navigation }) => {
  initLanguage();
  const { theme, setToken, useBiometrics, getBiometrics, setUser } = useContext(
    AppContext,
  );
  const {
    email,
    password,
    setErrorMessage,
    errorMessage,
    isFirstAppLoad,
    setIsFirstAppLoad,
    clearFields,
  } = useContext(LoginContext);

  //TODO - have app start in loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: { ambassaderOnly: true },
    onCompleted: (data) => {
      setIsLoading(false);
      clearFields();
      // get associate id if it exists
      if (data.loginUser.associate) {
        // set id so treeNodeFor query can be called in dashboard
        const id = data.loginUser.associate.associateId;
        setUser({ associateId: id });
      }
      console.log(`if data:`, data?.loginUser);
      const status = data?.loginUser?.loginStatus;
      handleLoginUser(
        status,
        navigation,
        useBiometrics,
        onFaceID,
        isFirstAppLoad,
      );
    },
    onError: (error) => {
      setIsLoading(false);
      setIsErrorModalOpen(true);
      setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    const onAppLoad = async () => {
      await getBiometrics();
      checkIfUserIsLoggedIn(
        setToken,
        loginUser,
        isFirstAppLoad,
        setIsFirstAppLoad,
        navigation,
      );
    };
    onAppLoad();
  }, [isFirstAppLoad]);

  const onFindOutMore = () => {
    Linking.openURL('https://qsciences.com');
  };

  const isButtonDisabled = !email || !password;

  const loginAnalytics = (method) => {
    Analytics.logEvent(`login_with_${method}`, {
      screen: 'Login Screen',
      purpose: 'User attempted to login to app',
    });
  };

  const onSubmit = async () => {
    setIsLoading(true);
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
      loginAnalytics('email');
    } catch (error) {
      console.log(`error`, error.message);
    }
  };

  const [googleRequest, promptAsync] = loginWithGoogle();

  const loginToFirebaseAndAppWithSocial = async (socialSignIn, method) => {
    setIsLoading(true);
    await setIsFirstAppLoad(false);
    await signOutOfFirebase;
    try {
      await socialSignIn();
      await getToken(setToken);
      await loginUser();
      loginAnalytics(method);
    } catch (error) {
      console.log(`error.message`, error.message);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

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
          <SocialSignIn
            title={Localized('Sign in with')}
            googleDisabled={!googleRequest}
            googleSignIn={() =>
              loginToFirebaseAndAppWithSocial(promptAsync, 'google')
            }
            facebookSignIn={() =>
              loginToFirebaseAndAppWithSocial(loginWithFacebook, 'facebook')
            }
          />

          <Flexbox direction="row">
            <DividerLine />
            <H4Secondary>{Localized('or use your email')}</H4Secondary>
            <DividerLine />
          </Flexbox>

          <Flexbox>
            <EmailForm onSubmit={onSubmit} />
            {errorMessage ? (
              <View style={{ height: 36 }}>
                <AlertText
                  style={{
                    textAlign: 'center',
                  }}>
                  {errorMessage}
                </AlertText>
              </View>
            ) : (
              <View style={{ height: 36 }} />
            )}
          </Flexbox>

          <Flexbox width="85%">
            <PrimaryButton
              testID="login-button"
              disabled={isButtonDisabled}
              onPress={onSubmit}>
              {Localized('Sign in').toUpperCase()}
            </PrimaryButton>
          </Flexbox>

          <CreateAccountAndForgotPassword
            navigateToScreen={() =>
              navigation.navigate('Create Account Screen')
            }
            navigateToPasswordRecovery={() =>
              navigation.navigate('Password Recovery Screen')
            }
          />

          <FindOutMore onPress={onFindOutMore} />

          <TermsAndPrivacy navigation={navigation} />
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
