import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
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
import {
  createAccount,
  loginWithFacebook,
  loginWithGoogle,
  getToken,
} from '../../utils/firebase/login';
import LoginContext from '../../contexts/LoginContext';
import AppContext from '../../contexts/AppContext';
import { Localized } from '../../translations/Localized';
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
  const { email, password, confirmPassword, clearFields } = useContext(
    LoginContext,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: { ambassaderOnly: true },
    onCompleted: (data) => {
      setIsErrorModalOpen(false);
      setErrorMessage('');
      clearFields();

      console.log(`if data:`, data?.loginUser);
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
    try {
      await createAccount(email, password, setErrorMessage);
      setTimeout(async () => {
        await getToken().then((result) => setToken(result));
        console.log('setting token in create account with email');
        await loginUser();
      }, 1000);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const [googleRequest, promptAsync] = loginWithGoogle();

  const loginToFirebaseAndAppWithSocial = async (socialSignIn) => {
    await signOutOfFirebase();
    try {
      await socialSignIn();
      await getToken(setToken);
      await loginUser();
    } catch (error) {
      console.log(`error.message`, error.message);
    }
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
      <QLogoScreen style={{ paddingTop: 50 }}>
        <Flexbox
          style={{ flex: 1, paddingTop: 20 }}
          width="85%"
          accessibilityLabel="Sign up Form">
          <SocialSignIn
            title={Localized('Sign up with')}
            googleDisabled={!googleRequest}
            googleSignIn={() => loginToFirebaseAndAppWithSocial(promptAsync)}
            facebookSignIn={() =>
              loginToFirebaseAndAppWithSocial(loginWithFacebook)
            }
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

          <CreateAccountAndForgotPassword
            screen="create account"
            navigateToScreen={() => navigation.navigate('Login Screen')}
            navigateToPasswordRecovery={() =>
              navigation.navigate('Password Recovery Screen')
            }
          />

          <FindOutMore onPress={onFindOutMore} />

          <TermsAndPrivacy navigation={navigation} />

          <ErrorModal
            visible={isErrorModalOpen}
            onClose={() => setIsErrorModalOpen(false)}
            errorMessage={errorMessage}
          />
        </Flexbox>
      </QLogoScreen>
    </Flexbox>
  );
};

CreateAccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default CreateAccountScreen;
