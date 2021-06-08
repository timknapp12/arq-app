import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { H6, AlertText, Flexbox } from '../common';
import { Localized } from '../../translations/Localized';
import LoginContext from '../../contexts/LoginContext';

const CreateAccountAndForgotPassword = ({
  navigateToCreateAccount,
  navigateToPasswordRecovery,
}) => {
  const { errorMessage } = useContext(LoginContext);
  return (
    <Flexbox justify="flex-start">
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
      <Flexbox height="30px" direction="row">
        <TouchableOpacity onPress={navigateToCreateAccount}>
          <H6 style={{ textDecorationLine: 'underline' }}>
            {Localized('Create Q account')}
          </H6>
        </TouchableOpacity>
        <TouchableOpacity
          // TODO integrate password recovery screen
          onPress={navigateToPasswordRecovery}
          testID="forgot-password-button">
          <H6>{Localized('Forgot password?')}</H6>
        </TouchableOpacity>
      </Flexbox>
    </Flexbox>
  );
};

CreateAccountAndForgotPassword.propTypes = {
  navigateToCreateAccount: PropTypes.func.isRequired,
  navigateToPasswordRecovery: PropTypes.func.isRequired,
};

export default CreateAccountAndForgotPassword;
