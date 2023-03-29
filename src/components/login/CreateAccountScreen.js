import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { useMutation } from '@apollo/client';
import { Alert, Platform, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Flexbox, PrimaryButton, AlertText, H4Secondary } from '../common';
import QLogoScreen from './QLogoScreenContainer';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import SocialSignIn from './loginScreen/SocialSignIn';
import EmailForm from './loginScreen/EmailForm';
import CreateAccountAndForgotPassword from './loginScreen/CreateAccountAndForgotPassword';
import FindOutMore from './loginScreen/FindOutMore';
import TermsAndPrivacy from './loginScreen/TermsAndPrivacy';
import ErrorModal from '../errorModal/ErrorModal';
import LoginContext from '../../contexts/LoginContext';
import AppContext from '../../contexts/AppContext';
import { Localized } from '../../translations/Localized';
import { LOGIN_USER } from '../../graphql/mutations';
import { handleLoginUser } from '../../utils/handleLoginFlow';
import Constants from 'expo-constants';

const DividerLine = styled.View`
  height: 1px;
  margin: 0 8px;
  flex: 1;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

WebBrowser.maybeCompleteAuthSession();

const CreateAccountScreen = ({ navigation }) => {
  const { theme, setToken, signOutOfFirebase } = useContext(AppContext);
  const { email, password, confirmPassword, clearFields, setDirectScaleUser } =
    useContext(LoginContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      setIsErrorModalOpen(false);
      setErrorMessage('');
      clearFields();

      const status =
        data?.loginArqAmbassador?.success === true
          ? 'SUCCESS'
          : data?.loginArqAmbassador?.loginResults;
      const username =
        data?.loginArqAmbassador?.associate?.legacyAssociateId ?? '';
      handleLoginUser(status, navigation, username);
      if (status === 'EMAIL_FOUND') {
        setDirectScaleUser(data?.loginArqAmbassador?.associate);
      }
    },
    onError: (error) => {
      setIsErrorModalOpen(true);
      setErrorMessage(error.message);
    },
  });

  const onFindOutMore = () => {
    WebBrowser.openBrowserAsync('https://qsciences.com');
  };

  const isButtonDisabled = !email || !password || !confirmPassword;

  const loginAnalytics = (method) => {
    Analytics.logEvent(`login_with_${method}`, {
      screen: 'Login Screen',
      purpose: 'User attempted to login to app',
    });
  };

  const onSubmit = async () => {
    if (!email) {
      return Alert.alert('Please enter an email address');
    }
    if (!password) {
      return Alert.alert('Please enter a password');
    }
    if (!confirmPassword) {
      return Alert.alert('Please re-type a password');
    }
    if (password !== confirmPassword) {
      return Alert.alert(
        Localized(`Passwords don't match Please confirm new password`),
      );
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Constants.manifest.extra.androidClientId,
    iosClientId: Constants.manifest.extra.iosClientId,
    expoClientId:
      '348281014348-96db6n78qgp5fbr1kd7nkld3rimt8flv.apps.googleusercontent.com',
    scopes: ['email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      loginWithGoogle(response);
    }
  }, [response]);

  const loginWithGoogle = async (response) => {
    await signOutOfFirebase();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      null,
      response.authentication.accessToken,
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

  if (loading) {
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
        accessibilityLabel="Sign up Form"
        style={{
          justifyContent: 'space-between',
          height: '100%',
          width: '85%',
        }}
      >
        <SocialSignIn
          title={Localized('Sign up with')}
          googleSignIn={promptAsync}
          request={request}
          signInWithApple={signInWithApple}
        />

        <Flexbox direction="row">
          <DividerLine />
          <H4Secondary>{Localized('or use your email')}</H4Secondary>
          <DividerLine />
        </Flexbox>

        <Flexbox>
          <EmailForm createAccount onSubmit={onSubmit} />
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
            testID="sign-up-button"
            disabled={isButtonDisabled}
            onPress={onSubmit}
          >
            {Localized('Sign Up').toUpperCase()}
          </PrimaryButton>
        </Flexbox>

        <Flexbox style={{ minWidth: '85%' }}>
          <CreateAccountAndForgotPassword
            screen="create account"
            navigateToScreen={() => navigation.navigate('Login Screen')}
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

CreateAccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default CreateAccountScreen;
