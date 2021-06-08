import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, RadioButton, PrimaryButton, Input, H4Book } from '../common';
import { Localized } from '../../translations/Localized';

const Gap = styled.View`
  height: 20px;
`;

const ConfirmAccountScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('password');

  // TODO - get real associate Id from query
  const associateId = 'jsmith';

  const isButtonDisabled =
    (selectedOption === 'password' && !password) ||
    (selectedOption === 'email' && !email) ||
    (selectedOption === 'phone' && !phone);

  const onSubmit = () => {
    if (selectedOption === 'password' && !password) {
      return Alert.alert(Localized('Please enter current password'));
    }
    if (selectedOption === 'email' && !email) {
      return Alert.alert(Localized('Please enter a valid email address'));
    }
    if (selectedOption === 'phone' && !phone) {
      return Alert.alert(Localized('Please enter a valid phone number'));
    }
    navigation.navigate('Verification Code Screen');
  };
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox align="flex-start">
          <H4Book>{Localized('Back Office User ID')}</H4Book>
          <H4Book>{associateId}</H4Book>
          <Gap />
          <RadioButton
            label="Back Office Password"
            isSelected={selectedOption === 'password'}
            onPress={() => setSelectedOption('password')}
          />
          <Input
            autoFocus
            testID="confirm-account-password-input"
            value={password}
            onChangeText={(text) => setPassword(text)}
            editable={selectedOption === 'password'}
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          <Gap />
          <RadioButton
            label="Send verification code to email address s******r@*****.biz"
            isSelected={selectedOption === 'email'}
            onPress={() => setSelectedOption('email')}
          />
          <Input
            testID="confirm-account-email-input"
            value={email}
            onChangeText={(text) => setEmail(text)}
            editable={selectedOption === 'email'}
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          <Gap />
          <RadioButton
            label="Send verification code to phone number (***) ***- ***23"
            isSelected={selectedOption === 'phone'}
            onPress={() => setSelectedOption('phone')}
          />
          <Input
            testID="confirm-account-phone-input"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            editable={selectedOption === 'phone'}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
        </Flexbox>
        <Flexbox width="85%" height="60px">
          <PrimaryButton disabled={isButtonDisabled} onPress={onSubmit}>
            {Localized('CONTINUE')}
          </PrimaryButton>
        </Flexbox>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

ConfirmAccountScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ConfirmAccountScreen;
