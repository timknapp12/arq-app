import React, { useContext, useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { ScreenContainer, Flexbox, Input, H4, PrimaryButton } from '../common';
import AppContext from '../../contexts/AppContext';
import logo from '../../../assets/icons/q-sciences-stacked-logo-white.png';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, initLanguage } from '../../translations/Localized';

const RecoverPasswordInstructions = styled(H4)`
  text-align: center;
  padding: 0 22px;
  margin: 22px 0;
`;

const PasswordRecoveryScreen = ({ navigation }) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (email) {
      setIsButtonDisabled(false);
    }
    return () => {
      setIsButtonDisabled(true);
    };
  }, [email]);

  const onSubmit = () => {
    if (isButtonDisabled) {
      return;
    }
    navigation.navigate('Login Screen');
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
          <Image source={logo} />

          <RecoverPasswordInstructions testID="recover-password-instructions">
            {Localized(
              'Enter your email address or ambassador ID to receive a link for log in.',
            )}
          </RecoverPasswordInstructions>
          <Flexbox style={{ marginBottom: 22 }}>
            <Input
              auotFocus
              testID="email-input"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              placeholder={Localized('Email address or ambassador ID')}
              placeholderTextColor={theme.disabledTextColor}
              returnKeyType="go"
              onSubmitEditing={onSubmit}
            />
          </Flexbox>

          <Flexbox width="85%">
            <PrimaryButton
              testID="password-recovery-button"
              disabled={isButtonDisabled}
              style={{ marginTop: 12 }}
              onPress={onSubmit}>
              {Localized('Send Email')}
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
