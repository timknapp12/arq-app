import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H6, Flexbox, Link } from '../common';
import { Localized } from '../../translations/Localized';

const CreateAccountAndForgotPassword = ({
  navigateToCreateAccount,
  navigateToPasswordRecovery,
}) => {
  return (
    <Flexbox width="85%" justify="flex-start">
      <Flexbox height="30px" direction="row">
        <H6>{Localized('Forgot your password?')}</H6>
        <TouchableOpacity
          onPress={navigateToPasswordRecovery}
          testID="reset-password-button">
          <Link>{Localized('Reset Password')}</Link>
        </TouchableOpacity>
      </Flexbox>

      <Flexbox height="30px" direction="row">
        <H6>{Localized('First time using the Q app?')}</H6>
        <TouchableOpacity
          onPress={navigateToCreateAccount}
          testID="go-to-signup-screen-button">
          <Link>{Localized('Sign up')}</Link>
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
