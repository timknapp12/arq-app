import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useMutation } from '@apollo/client';
import QLogoScreenContainer from './QLogoScreenContainer';
import {
  Flexbox,
  RadioButton,
  PrimaryButton,
  Input,
  H4Book,
  AlertText,
} from '../common';
import { Localized } from '../../translations/Localized';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import LoginContext from '../../contexts/LoginContext';
import AppContext from '../../contexts/AppContext';
import {
  encodeEmail,
  encodePhone,
} from '../../utils/encodeCredentials/encodeCredentials';
import { getToken } from '../../utils/firebase/login';
import { LOGIN_VALIDATION_PROCESS } from '../../graphql/mutations';
import { handleLoginValidationProcess } from '../../utils/handleLoginFlow';

const Gap = styled.View`
  height: 20px;
`;

const ConfirmAccountScreen = ({ navigation, route }) => {
  const { setAssociateId, setLegacyId, setToken } = useContext(AppContext);
  const { directScaleUser } = useContext(LoginContext);
  const { emailAddress, primaryPhoneNumber, secondaryPhoneNumber } =
    directScaleUser;

  const { username } = route.params;

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [secondPhone, setSecondPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('password');
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const secondPhoneRef = useRef(null);

  // this strips out the parantheses and hyphens from the phone numbers but leaves the plus sign for country codes
  const phoneRegex = new RegExp(/[^0-9 +]+/g);

  const method =
    selectedOption === 'password'
      ? 'DIRECT_SCALE'
      : selectedOption === 'email'
      ? 'EMAIL'
      : 'SMS';

  const verificationInfo =
    selectedOption === 'password'
      ? password
      : selectedOption === 'email'
      ? email
      : selectedOption === 'phone'
      ? phone.replace(phoneRegex, '')
      : secondPhone.replace(phoneRegex, '');

  const [validateUser, { loading }] = useMutation(LOGIN_VALIDATION_PROCESS, {
    variables: {
      method: method,
      loginName: username,
      verificationInfo: verificationInfo,
    },
    onError: (error) => setErrorMessage(error.message),
    onCompleted: (data) => {
      console.log(`data`, data);
      const status = data?.loginValidationProcess.status;
      console.log(`status`, status);
      if (data.loginValidationProcess.associate) {
        const id = data.loginValidationProcess.associate.associateId;
        setAssociateId(id);
        const legacyId =
          data.loginValidationProcess.associate.legacyAssociateId;
        setLegacyId(legacyId);
      }
      handleLoginValidationProcess(
        status,
        navigation,
        method,
        username,
        verificationInfo,
        setErrorMessage,
      );
    },
  });

  const isButtonDisabled =
    (selectedOption === 'password' && !password) ||
    (selectedOption === 'email' && !email) ||
    (selectedOption === 'phone' && !phone) ||
    (selectedOption === 'secondPhone' && !secondPhone);

  const refMap = {
    password: passwordRef,
    email: emailRef,
    phone: phoneRef,
    secondPhone: secondPhoneRef,
  };

  useEffect(() => {
    refMap[selectedOption].current.focus();
  }, [selectedOption]);

  const onSubmit = async () => {
    await getToken(setToken);
    if (selectedOption === 'password' && !password) {
      return Alert.alert(Localized('Please enter current password'));
    }
    if (selectedOption === 'email') {
      if (!email) {
        return Alert.alert(Localized('Please enter a valid email address'));
      }
      if (email !== emailAddress) {
        return Alert.alert(
          'The email address you entered does not match the email address we have for you',
        );
      }
    }
    if (selectedOption === 'phone') {
      if (!phone) {
        return Alert.alert(Localized('Please enter a valid phone number'));
      }
      if (
        phone.replace(phoneRegex, '') !==
        primaryPhoneNumber.replace(phoneRegex, '')
      ) {
        return Alert.alert(
          'The phone number you entered does not match the phone number we have for you',
        );
      }
    }
    if (selectedOption === 'secondPhone') {
      if (!secondPhone) {
        return Alert.alert(Localized('Please enter a valid phone number'));
      }
      if (secondPhone !== secondaryPhoneNumber) {
        return Alert.alert(
          'The phone number you entered does not match the phone number we have for you',
        );
      }
    }
    validateUser();
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%' }}
      contentContainerStyle={{ height: '100%', width: '100%' }}
      behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
      <QLogoScreenContainer>
        <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
          <Flexbox align="flex-start">
            <H4Book>{Localized('Back Office Username')}</H4Book>
            <H4Book>{username}</H4Book>
            <Gap />
            <RadioButton
              label="Back Office Password"
              isSelected={selectedOption === 'password'}
              onPress={() => setSelectedOption('password')}
            />
            <Input
              style={{ opacity: selectedOption === 'password' ? 1 : 0.5 }}
              ref={passwordRef}
              testID="confirm-account-password-input"
              value={password}
              onChangeText={(text) => {
                setErrorMessage('');
                setPassword(text);
              }}
              onFocus={() => setSelectedOption('password')}
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={onSubmit}
            />
            {emailAddress ? (
              <>
                <Gap />
                <RadioButton
                  label={`${Localized(
                    'Send verification code to email address',
                  )} ${encodeEmail(emailAddress)}`}
                  isSelected={selectedOption === 'email'}
                  onPress={() => setSelectedOption('email')}
                />
                <Input
                  style={{ opacity: selectedOption === 'email' ? 1 : 0.5 }}
                  ref={emailRef}
                  testID="confirm-account-email-input"
                  value={email}
                  onChangeText={(text) => {
                    setErrorMessage('');
                    setEmail(text);
                  }}
                  onFocus={() => setSelectedOption('email')}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  returnKeyType="go"
                  onSubmitEditing={onSubmit}
                />
              </>
            ) : null}
            {primaryPhoneNumber ? (
              <>
                <Gap />
                <RadioButton
                  label={`${Localized(
                    'Send verification code to phone number',
                  )} ${encodePhone(
                    primaryPhoneNumber.replace(phoneRegex, ''),
                  )}`}
                  isSelected={selectedOption === 'phone'}
                  onPress={() => setSelectedOption('phone')}
                />
                <Input
                  style={{ opacity: selectedOption === 'phone' ? 1 : 0.5 }}
                  ref={phoneRef}
                  testID="confirm-account-phone-input"
                  value={phone}
                  onChangeText={(text) => {
                    setErrorMessage('');
                    setPhone(text);
                  }}
                  onFocus={() => setSelectedOption('phone')}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </>
            ) : null}
            {secondaryPhoneNumber &&
            primaryPhoneNumber !== secondaryPhoneNumber ? (
              <>
                <Gap />
                <RadioButton
                  label={`${Localized(
                    'Send verification code to phone number',
                  )} ${encodePhone(
                    secondaryPhoneNumber.replace(phoneRegex, ''),
                  )}`}
                  isSelected={selectedOption === 'secondPhone'}
                  onPress={() => setSelectedOption('secondPhone')}
                />
                <Input
                  style={{
                    opacity: selectedOption === 'secondPhone' ? 1 : 0.5,
                  }}
                  ref={secondPhoneRef}
                  testID="confirm-account-secondary-phone-input"
                  value={secondPhone}
                  onChangeText={(text) => {
                    setErrorMessage('');
                    setSecondPhone(text);
                  }}
                  onFocus={() => setSelectedOption('secondPhone')}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </>
            ) : null}
            {errorMessage ? (
              <Flexbox>
                <AlertText
                  style={{
                    textAlign: 'center',
                  }}>
                  {errorMessage}
                </AlertText>
              </Flexbox>
            ) : null}
          </Flexbox>
          <Flexbox width="85%" height="60px">
            <PrimaryButton disabled={isButtonDisabled} onPress={onSubmit}>
              {Localized('Continue').toUpperCase()}
            </PrimaryButton>
          </Flexbox>
        </Flexbox>
      </QLogoScreenContainer>
    </KeyboardAvoidingView>
  );
};

ConfirmAccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ConfirmAccountScreen;
