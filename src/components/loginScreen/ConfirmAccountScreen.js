import React, { useState } from 'react';
import styled from 'styled-components/native';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, RadioButton, PrimaryButton, Input, H4Book } from '../common';
import { Localized } from '../../translations/Localized';

const Gap = styled.View`
  height: 20px;
`;

const ConfirmAccountScreen = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('password');

  const onSubmit = () => {};
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox align="flex-start">
          <H4Book>{Localized('Back Office User ID')}</H4Book>
          <H4Book>jsmith</H4Book>
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
          <PrimaryButton>{Localized('CONTINUE')}</PrimaryButton>
        </Flexbox>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

export default ConfirmAccountScreen;
