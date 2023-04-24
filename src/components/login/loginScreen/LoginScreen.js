import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase';
import * as WebBrowser from 'expo-web-browser';
import { useMutation } from '@apollo/client';
import { Platform, Alert, View } from 'react-native';
import { Flexbox, PrimaryButton, AlertText } from '../../common';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import { Localized } from '../../../translations/Localized';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import QLogoScreen from '../QLogoScreenContainer';
import EmailForm from './EmailForm';
import ForgotPassword from './ForgotPassword';
import FindOutMore from './FindOutMore';
import TermsAndPrivacy from './TermsAndPrivacy';
import ErrorModal from '../../errorModal/ErrorModal';
import { checkIfUserIsLoggedIn } from '../../../utils/firebase/login';
import { LOGIN_USER } from '../../../graphql/mutations';
import { handleLoginUser } from '../../../utils/handleLoginFlow';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const { theme, setToken, setAssociateId, setLegacyId, signOutOfFirebase } =
    useContext(AppContext);
  const {
    email,
    password,
    setErrorMessage,
    errorMessage,
    clearFields,
    setDirectScaleUser,
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
      const username =
        data?.loginArqAmbassador?.associate?.legacyAssociateId ?? '';
      handleLoginUser(status, navigation, username);
      if (status === 'EMAIL_FOUND') {
        setDirectScaleUser(data?.loginArqAmbassador?.associate);
      }
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
      .catch((error) => {
        console.log('error.message', error.message);
        if (
          error.message.includes(
            'There is no user record corresponding to this identifier. The user may have been deleted.',
          )
        ) {
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
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const openTerms = (url) =>
    navigation.navigate('App Stack', {
      screen: 'Resources Asset Screen',
      params: {
        title: Localized('Terms').toUpperCase(),
        url: url,
        contentType: 'pdf',
      },
    });
  const openPrivacy = (url) =>
    navigation.navigate('App Stack', {
      screen: 'Resources Asset Screen',
      params: {
        title: Localized('Privacy').toUpperCase(),
        url: url,
        contentType: 'pdf',
      },
    });

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
        <View style={{ height: 40 }} />

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
          <ForgotPassword
            navigateToPasswordRecovery={() =>
              navigation.navigate('Password Recovery Screen')
            }
          />
        </Flexbox>

        <FindOutMore onPress={onFindOutMore} />

        <TermsAndPrivacy openTerms={openTerms} openPrivacy={openPrivacy} />
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
