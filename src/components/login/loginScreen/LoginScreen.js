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
import { Platform, Alert, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
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
import { checkIfUserIsLoggedIn } from '../../../utils/firebase/login';
import {
  facebookAppId,
  facebookDisplayName,
} from '../../../../firebase.config';
import { LOGIN_USER } from '../../../graphql/mutations';
import { handleLoginUser } from '../../../utils/handleLoginFlow';

const DividerLine = styled.View`
  height: 1px;
  margin: 0 8px;
  flex: 1;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

const LoginScreen = ({ navigation }) => {
  const { theme, setToken, setAssociateId, setLegacyId, signOutOfFirebase } =
    useContext(AppContext);
  const { email, password, setErrorMessage, errorMessage, clearFields } =
    useContext(LoginContext);

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
    getFirstTimeUseEver();
  }, []);
  // if isFirstTimeUseEver is true and there is no current user, then it should mean that the user has not created an account with firebase on the current device, so we send the user to create account screen
  useEffect(() => {
    if (isFirstTimeUseEver) {
      let authFlag = true;
      firebase.auth().onAuthStateChanged((user) => {
        console.log('AUTH STATE CHANGED CALLED ');
        if (authFlag) {
          authFlag = false;
          if (!user) {
            navigation.navigate('Create Account Screen');
          }
        }
      });
    }
    return () => {
      storeFirstTimeUseEver();
    };
  }, [isFirstTimeUseEver]);

  const [loginUser, { loading: loadingLoginUser }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      setIsLoading(false);
      setIsErrorModalOpen(false);
      setErrorMessage('');
      clearFields();
      if (data.loginArqAmbassador.associate) {
        // set id so treeNodeFor query can be called in dashboard
        const id = data.loginArqAmbassador.associate.associateId;
        setAssociateId(id);
        const legacyId = data.loginArqAmbassador.associate.legacyAssociateId;
        setLegacyId(legacyId);
      }
      const status =
        data?.loginArqAmbassador?.success === true
          ? 'SUCCESS'
          : data?.loginArqAmbassador?.loginResults;
      handleLoginUser(status, navigation);
    },
    onError: (error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    },
  });

  // if the user has a firebase token, then sign in the user automatically
  useEffect(() => {
    const onAppLoad = () => {
      checkIfUserIsLoggedIn(setToken, loginUser, setIsLoading);
    };
    onAppLoad();
    return () => {
      setIsErrorModalOpen(false);
      setErrorMessage('');
    };
  }, []);

  const onFindOutMore = () => {
    WebBrowser.openBrowserAsync('https://qsciences.com');
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
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((userCredential) => {
            var user = userCredential.user;
            user
              .getIdToken(/* forceRefresh */ true)
              .then((idToken) => setToken(idToken))
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
      }}
    >
      <QLogoScreen
        accessibilityLabel="Login Form"
        style={{
          justifyContent: 'space-between',
          height: '100%',
          width: '85%',
        }}
      >
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
                }}
              >
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
            onPress={onSubmit}
          >
            {Localized('Sign In').toUpperCase()}
          </PrimaryButton>
        </Flexbox>

        <Flexbox style={{ minWidth: '85%' }}>
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
};

export default LoginScreen;
