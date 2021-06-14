import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, RadioButton, PrimaryButton, Input, H4Book } from '../common';
import { Localized } from '../../translations/Localized';
import LoginContext from '../../contexts/LoginContext';

const Gap = styled.View`
  height: 20px;
`;

const ConfirmAccountScreen = ({ navigation, route }) => {
  const { directScaleUser } = useContext(LoginContext);
  const {
    emailAddress,
    primaryPhoneNumber,
    secondaryPhoneNumber,
  } = directScaleUser;

  const { username } = route.params;

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [secondPhone, setSecondPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('password');

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const secondPhoneRef = useRef(null);

  const isButtonDisabled =
    (selectedOption === 'password' && !password) ||
    (selectedOption === 'email' && !email) ||
    (selectedOption === 'phone' && !phone);

  const refMap = {
    password: passwordRef,
    email: emailRef,
    phone: phoneRef,
    secondPhone: secondPhoneRef,
  };

  useEffect(() => {
    refMap[selectedOption].current.focus();
  }, [selectedOption]);

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
          <H4Book>{username}</H4Book>
          <Gap />
          <RadioButton
            label="Back Office Password"
            isSelected={selectedOption === 'password'}
            onPress={() => setSelectedOption('password')}
          />
          <Input
            ref={passwordRef}
            testID="confirm-account-password-input"
            value={password}
            onChangeText={(text) => setPassword(text)}
            editable={selectedOption === 'password'}
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          {emailAddress ? (
            <>
              <Gap />
              <RadioButton
                label="Send verification code to email address s******r@*****.biz"
                isSelected={selectedOption === 'email'}
                onPress={() => setSelectedOption('email')}
              />
              <Input
                ref={emailRef}
                testID="confirm-account-email-input"
                value={email}
                onChangeText={(text) => setEmail(text)}
                editable={selectedOption === 'email'}
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="go"
                onSubmitEditing={onSubmit}
              />
            </>
          ) : null}
          {primaryPhoneNumber ? (
            <>
              <Gap />
              <RadioButton
                label="Send verification code to phone number (***) ***- ***23"
                isSelected={selectedOption === 'phone'}
                onPress={() => setSelectedOption('phone')}
              />
              <Input
                ref={phoneRef}
                testID="confirm-account-phone-input"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                editable={selectedOption === 'phone'}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                returnKeyType="go"
                onSubmitEditing={onSubmit}
              />
            </>
          ) : null}
          {secondaryPhoneNumber &&
          primaryPhoneNumber !== secondaryPhoneNumber ? (
            <>
              <Gap />
              <RadioButton
                label="Send verification code to phone number (***) ***- ***23"
                isSelected={selectedOption === 'secondPhone'}
                onPress={() => setSelectedOption('secondPhone')}
              />
              <Input
                ref={secondPhoneRef}
                testID="confirm-account-secondary-phone-input"
                value={secondPhone}
                onChangeText={(text) => setSecondPhone(text)}
                editable={selectedOption === 'secondPhone'}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                returnKeyType="go"
                onSubmitEditing={onSubmit}
              />
            </>
          ) : null}
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
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ConfirmAccountScreen;
