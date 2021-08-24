import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { useMutation } from '@apollo/client';
import { Alert, Platform, View, Linking } from 'react-native';
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
import { facebookAppId, facebookDisplayName } from '../../../firebase.config';
import { LOGIN_USER } from '../../graphql/mutations';
import { handleLoginUser, onFaceID } from '../../utils/handleLoginFlow';

const DividerLine = styled.View`
  height: 1px;
  margin: 0 8px;
  flex: 1;
  background-color: ${(props) => props.theme.disabledTextColor};
`;

const CreateAccountScreen = ({ navigation }) => {
  const { theme, setToken, signOutOfFirebase } = useContext(AppContext);
  const { email, password, confirmPassword, clearFields } =
    useContext(LoginContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: { ambassadorOnly: true },
    onCompleted: (data) => {
      setIsErrorModalOpen(false);
      setErrorMessage('');
      clearFields();

      const status = data?.loginUser?.loginStatus;
      handleLoginUser(
        status,
        navigation,
        false, //useBiometrics
        onFaceID,
        false, //isFirstAppLoad
      );
    },
    onError: (error) => {
      setIsErrorModalOpen(true);
      setErrorMessage(error.message);
    },
  });

  const onFindOutMore = () => {
    Linking.openURL('https://qsciences.com');
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
      return Alert.alert('Passwords must be matching. Please try again');
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
      }}>
      <QLogoScreen
        accessibilityLabel="Sign up Form"
        style={{
          justifyContent: 'space-between',
          height: '100%',
          width: '85%',
        }}>
        <SocialSignIn
          title={Localized('Sign up with')}
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
          <EmailForm createAccount onSubmit={onSubmit} />
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
            testID="sign-up-button"
            disabled={isButtonDisabled}
            onPress={onSubmit}>
            {Localized('Sign Up').toUpperCase()}
          </PrimaryButton>
        </Flexbox>

        <Flexbox width="85%">
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
