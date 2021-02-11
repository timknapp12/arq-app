import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { ScreenContainer, Flexbox, Input, H4, PrimaryButton } from '../Common';
import AppContext from '../../Contexts/AppContext';
import logo from '../../../assets/q-sciences-logo-white.png';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, init } from '../../Translations/Localized';

const RecoverPasswordInstructions = styled(H4)`
  text-align: center;
  padding: 0 22px;
  margin: 22px 0;
`;

const PasswordRecoveryScreen = ({ navigation }) => {
  init();
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
    Analytics.logEvent('Login_button_tapped', {
      screen: 'Password Recovery Screen',
      email: email,
      purpose:
        'Enter email address or dist ID to get an email for forgotten password',
    });
  };
  return (
    <ScreenContainer
      style={{
        justifyContent: 'flex-start',
      }}>
      <KeyboardAvoidingView
        style={{
          width: '100%',
          height: '90%',
          justifyContent: 'center',
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Flexbox
          height="100%"
          justify="space-around"
          accessibilityLabel="Password Recovery Form"
          padding={20}>
          <View />
          <Image source={logo} />

          <RecoverPasswordInstructions testID="recover-password-instructions">
            {Localized('recover-password-instructions')}
          </RecoverPasswordInstructions>
          <Flexbox style={{ marginBottom: 22 }}>
            <Input
              testID="email-input"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              placeholder={Localized('email-address-placeholder')}
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
              {Localized('send-email-text')}
            </PrimaryButton>
          </Flexbox>
          <View />
          <View />
          <View />
          <View />
        </Flexbox>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

PasswordRecoveryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PasswordRecoveryScreen;
