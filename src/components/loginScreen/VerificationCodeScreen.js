import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { Flexbox, PrimaryButton, Input, Label } from '../common';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Localized } from '../../translations/Localized';

const VerificationCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const onSubmit = () => {
    if (!code) {
      return Alert.alert(Localized('Please enter a verification code'));
    }
    navigation.navigate('Biometrics Screen');
  };
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox align="flex-start">
          <Label>{Localized('Verification Code')}</Label>
          <Input
            autoFocus
            testID="verification-code-input"
            value={code}
            onChangeText={(text) => setCode(text)}
            textContentType="oneTimeCode"
            keyboardType="numeric"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
        </Flexbox>
        <Flexbox width="85%" height="60px">
          <PrimaryButton disabled={!code} onPress={onSubmit}>
            {Localized('CONTINUE')}
          </PrimaryButton>
        </Flexbox>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

VerificationCodeScreen.propTypes = {
  navigation: PropTypes.object,
};

export default VerificationCodeScreen;
