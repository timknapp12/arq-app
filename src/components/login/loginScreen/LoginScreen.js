import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import { useMutation } from '@apollo/client';
import { Platform, Linking, Alert, View } from 'react-native';
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
import { checkIfUserIsLoggedIn } from '../../../utils/firebase/login';
import {
  facebookAppId,
  facebookDisplayName,
} from '../../../../firebase.config';
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
  const {
    theme,
    setToken,
    useBiometrics,
    getBiometrics,
    setAssociateId,
    setLegacyId,
    signOutOfFirebase,
  } = useContext(AppContext);
  const {
    email,
    password,
    setErrorMessage,
    errorMessage,
    isFirstAppLoad,
    setIsFirstAppLoad,
    clearFields,
  } = useContext(LoginContext);

  // app starts in loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [loginUser, { loading: loadingLoginUser }] = useMutation(LOGIN_USER, {
    variables: { ambassadorOnly: true },
    onCompleted: (data) => {
      setIsLoading(false);
      setIsErrorModalOpen(false);
      setErrorMessage('');
      clearFields();
      // get associate id if it exists
      if (data.loginUser.associate) {
        // set id so treeNodeFor query can be called in dashboard
        const id = data.loginUser.associate.associateId;
        setAssociateId(id);
        const legacyId = data.loginUser.associate.legacyAssociateId;
        setLegacyId(legacyId);
      }
      const status = data?.loginUser?.loginStatus;
      handleLoginUser(
        status,
        navigation,
        useBiometrics,
        onFaceID,
        isFirstAppLoad,
        signOutOfFirebase,
      );
    },
    onError: (error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    const onAppLoad = async () => {
      await getBiometrics();
      if (useBiometrics) {
        checkIfUserIsLoggedIn(
          setToken,
          loginUser,
          isFirstAppLoad,
          setIsFirstAppLoad,
          setIsLoading,
        );
      } else {
        setIsLoading(false);
      }
    };
    onAppLoad();
    return () => {
      setIsErrorModalOpen(false);
      setErrorMessage('');
    };
  }, [isFirstAppLoad, useBiometrics]);

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

  // login with email and password
  const onSubmit = async () => {
    await setIsFirstAppLoad(false);
    await signOutOfFirebase();
    if (!email) {
      return Alert.alert(Localized('Please enter an email address'));
    }
    if (!password) {
      return Alert.alert(Localized('Please enter a password'));
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user
          .getIdToken(/* forceRefresh */ true)
          .then((idToken) => setToken(idToken))
          .then(() => loginUser())
          .then(() => loginAnalytics('email'))
          .catch((error) => console.log(`error`, error));
      })
      .catch((error) => setErrorMessage(error.message));
  };

  // login with google
  // standalone app for google sign in https://docs.expo.io/versions/latest/sdk/google-sign-in/
  // build https://docs.expo.io/distribution/building-standalone-apps/#building-standalone-apps
  const signInWithGoogleAsync = async () => {
    await setIsFirstAppLoad(false);
    await signOutOfFirebase();
    try {
      await GoogleSignIn.initAsync();
    } catch ({ message }) {
      setErrorMessage(message);
    }

    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth.idToken,
          user.auth.accessToken,
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((userCredential) => {
            var user = userCredential.user;
            user
              .getIdToken(/* forceRefresh */ true)
              .then((idToken) => setToken(idToken))
              .then(() => loginUser())
              .then(() => loginAnalytics('google'))
              .catch((error) => console.log(`error`, error));
          })
          .catch(function (error) {
            console.error('Error with Firebase sign in ', error.message);
          });
      } else {
        console.log(`type`, type);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // login with facebook
  // https://docs.expo.io/guides/using-firebase/#user-authentication
  // dev account dashboard https://developers.facebook.com/apps/319892812842607/dashboard/
  // expo docs: https://docs.expo.io/versions/latest/sdk/facebook/
  const loginWithFacebook = async () => {
    await setIsFirstAppLoad(false);
    await signOutOfFirebase();
    await Facebook.initializeAsync({
      appId: facebookAppId,
      appName: facebookDisplayName,
    });

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email', 'public_profile'],
    });

    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      console.log(`credential`, credential);
      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((userCredential) => {
          var user = userCredential.user;
          user
            .getIdToken(/* forceRefresh */ true)
            .then((idToken) => setToken(idToken))
            .then(() => loginUser())
            .then(() => loginAnalytics('facebook'))
            .catch((error) => console.log(`error`, error));
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  if (isLoading || loadingLoginUser) {
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
            googleSignIn={signInWithGoogleAsync}
            facebookSignIn={loginWithFacebook}
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
