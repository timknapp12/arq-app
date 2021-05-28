import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { Flexbox, PrimaryButton, AlertText } from '../common';
import QLogoScreen from './QLogoScreen';
import EmailForm from './EmailForm';
import { createAccount } from '../../utils/firebase/login';
import LoginContext from '../../contexts/LoginContext';
import { Localized } from '../../translations/Localized';

const CreateAccountScreen = () => {
  const {
    email,
    password,
    confirmPassword,
    setErrorMessage,
    errorMessage,
    clearFields,
  } = useContext(LoginContext);

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
    await createAccount(email, password, setErrorMessage);
    clearFields();
    console.log('login successful');
    // navigation.navigate('Login Screen');
  };
  return (
    <QLogoScreen>
      <Flexbox padding={20} width="95%" style={{ flex: 1 }}>
        <Flexbox justify="flex-start">
          <EmailForm createAccount onSubmit={onSubmit} />
          {errorMessage ? (
            <AlertText
              style={{
                textAlign: 'center',
              }}>
              {errorMessage}
            </AlertText>
          ) : null}
        </Flexbox>
        <PrimaryButton disabled={isButtonDisabled} onPress={onSubmit}>
          {Localized('CONTINUE')}
        </PrimaryButton>
      </Flexbox>
    </QLogoScreen>
  );
};

CreateAccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default CreateAccountScreen;
