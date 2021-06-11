import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import firebase from 'firebase';
import * as Analytics from 'expo-firebase-analytics';
import {
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  ScreenContainer,
  Flexbox,
  Input,
  H4,
  PrimaryButton,
  AlertText,
  Label,
} from '../../common';
import logo from '../../../../assets/icons/q-sciences-stacked-logo-white.png';
import { Localized, initLanguage } from '../../../translations/Localized';
import AppContext from '../../../contexts/AppContext';

const RecoverPasswordInstructions = styled(H4)`
  text-align: center;
  padding: 0 22px;
  margin: 22px 0;
`;

const PasswordRecoveryScreen = ({ navigation }) => {
  initLanguage();
  const { deviceLanguage } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');

  const isButtonDisabled = !email;

  const auth = firebase.auth();

  const onSendResetPasswordEmail = () => {
    firebase.auth().languageCode = deviceLanguage;
    auth
      .sendPasswordResetEmail(email.trim())
      .then(function () {
        onSuccess();
      })
      .catch(function (error) {
        // An error happened.
        console.log(`error`, error);
        setErrorMessage(error.message);
      });
  };

  const onSuccess = async () => {
    await Alert.alert(
      Localized('Check your email to reset your password and then login'),
    );
    navigation.navigate('Login Screen');
  };

  const onSubmit = async () => {
    if (isButtonDisabled) {
      return;
    }
    await onSendResetPasswordEmail();

    Analytics.logEvent('Recover_password__button_tapped', {
      screen: 'Password Recovery Screen',
      email: email,
      purpose:
        'Enter email address or dist ID to get an email for forgotten password',
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
        }}>
        <Flexbox
          height="60%"
          justify="space-around"
          accessibilityLabel="Password Recovery Form"
          padding={20}>
          <Image
            source={logo}
            style={{ marginBottom: 24, height: 108, width: 160 }}
          />

          <RecoverPasswordInstructions testID="recover-password-instructions">
            {Localized(
              'Enter your email address to recieve an email to reset your password',
            )}
          </RecoverPasswordInstructions>
          <Flexbox align="flex-start" style={{ marginBottom: 22 }}>
            <Label>{Localized('Email Address')}</Label>
            <Input
              auotFocus
              testID="email-input"
              value={email}
              onChangeText={(text) => {
                setErrorMessage('');
                setEmail(text);
              }}
              keyboardType="email-address"
              returnKeyType="done"
              autoCapitalize="none"
            />
            <View style={{ height: 40, width: '100%' }}>
              {errorMessage ? (
                <AlertText
                  style={{
                    textAlign: 'center',
                  }}>
                  {errorMessage}
                </AlertText>
              ) : null}
            </View>
          </Flexbox>

          <Flexbox width="85%">
            <PrimaryButton
              testID="password-recovery-button"
              disabled={isButtonDisabled}
              style={{ marginTop: 12 }}
              onPress={onSubmit}>
              {Localized('Send Email').toUpperCase()}
            </PrimaryButton>
          </Flexbox>
        </Flexbox>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

PasswordRecoveryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PasswordRecoveryScreen;
