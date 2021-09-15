import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { useMutation } from '@apollo/client';
import { Platform, Linking, Alert, View } from 'react-native';
import { Flexbox, H4Secondary, PrimaryButton, AlertText } from '../../common';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import { Localized } from '../../../translations/Localized';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import QLogoScreen from '../QLogoScreenContainer';
import EmailForm from './EmailForm';
import CreateAccountAndForgotPassword from './CreateAccountAndForgotPassword';
import SocialSignIn from './SocialSignIn';
import FindOutMore from './FindOutMore';
import TermsAndPrivacy from './TermsAndPrivacy';
import ErrorModal from '../../errorModal/ErrorModal';
import {
  checkIfUserIsLoggedIn,
  checkForToken,
} from '../../../utils/firebase/login';
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

const LoginScreen = ({
  navigation,
  route = { params: { resetLogin: false } },
}) => {
  const {
    theme,
    token,
    setToken,
    setAssociateId,
    setLegacyId,
    signOutOfFirebase,
  } = useContext(AppContext);
  const {
    email,
    password,
    setErrorMessage,
    errorMessage,
    useBiometrics,
    getBiometrics,
    isFirstAppLoad,
    setIsFirstAppLoad,
    clearFields,
  } = useContext(LoginContext);

  // app starts in loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // if it is the first time to ever use the app, send user to SIGN UP screen
  const [isFirstTimeUseEver, setIsFirstTimeUseEver] = useState(false);
  const storeFirstTimeUseEver = async () => {
    try {
      const jsonValue = JSON.stringify(false);
      await AsyncStorage.setItem('@first_time', jsonValue);
    } catch (e) {
      console.log(`error in storing first time use`, e);
    }
  };

  const getFirstTimeUseEver = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@first_time');
      const result = jsonValue != null ? JSON.parse(jsonValue) : true;
      return setIsFirstTimeUseEver(result);
    } catch (e) {
      console.log(`error in getting first time use`, e);
    }
  };

  useEffect(() => {
    checkForToken(setToken);
    getFirstTimeUseEver();
  }, []);
  // if isFirstTimeUseEver is true and the user has no token, then it should mean that the user has not created an account with firebase on the current device, so we send the user to create account screen
  useEffect(() => {
    if (isFirstTimeUseEver && !token) {
      navigation.navigate('Create Account Screen');
    }
    return () => {
      storeFirstTimeUseEver();
    };
  }, [isFirstTimeUseEver, token]);

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
          route?.params?.resetLogin ?? false, // if this is true then that means the user timed out and was sent back to login screen and will be logged in again automatically if FaceId is turned on
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
  }, [isFirstAppLoad, useBiometrics, route?.params?.resetLogin]);

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

  // login with apple
  // https://medium.com/nerd-for-tech/apple-google-authentication-in-expo-apps-using-firebase-997125440032
  // https://docs.expo.dev/versions/latest/sdk/apple-authentication/
  const signInWithApple = () => {
    const nonce = Math.random().toString(36).substring(2, 10);

    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
      .then((hashedNonce) =>
        AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
          nonce: hashedNonce,
        }),
      )
      .then((appleCredential) => {
        const { identityToken } = appleCredential;
        const provider = new firebase.auth.OAuthProvider('apple.com');
        const credential = provider.credential({
          idToken: identityToken,
          rawNonce: nonce,
        });
        // Successful sign in is handled by firebase.auth().onAuthStateChanged
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((userCredential) => {
            var user = userCredential.user;
            user
              .getIdToken(/* forceRefresh */ true)
              .then(
                (idToken) =>
                  console.log(`idToken`, idToken) || setToken(idToken),
              )
              .then(() => loginUser())
              .then(() => loginAnalytics('apple'))
              .catch((error) => console.log(`error`, error));
          });
      })
      .catch((error) => {
        console.log(`error in apple login:`, error);
      });
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
      <QLogoScreen
        accessibilityLabel="Login Form"
        style={{
          justifyContent: 'space-between',
          height: '100%',
          width: '85%',
        }}>
        <SocialSignIn
          title={Localized('Sign in with')}
          googleSignIn={signInWithGoogleAsync}
          facebookSignIn={loginWithFacebook}
          signInWithApple={signInWithApple}
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

        <Flexbox width="85%">
          <CreateAccountAndForgotPassword
            navigateToScreen={() =>
              navigation.navigate('Create Account Screen')
            }
            navigateToPasswordRecovery={() =>
              navigation.navigate('Password Recovery Screen')
            }
          />
        </Flexbox>

        <FindOutMore onPress={onFindOutMore} />

        <TermsAndPrivacy navigation={navigation} />
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
  route: PropTypes.object,
};

export default LoginScreen;
