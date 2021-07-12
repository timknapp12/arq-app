import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H6, Flexbox, Link } from '../../common';
import { Localized } from '../../../translations/Localized';

const CreateAccountAndForgotPassword = ({
  navigateToScreen,
  navigateToPasswordRecovery,
  screen,
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
        <H6>
          {Localized(
            screen === 'create account'
              ? 'Already have an account?'
              : 'First time using ARQ?',
          )}
        </H6>
        <TouchableOpacity
          onPress={navigateToScreen}
          testID="go-to-signup-screen-button">
          <Link>
            {Localized(screen === 'create account' ? 'Sign in' : 'Sign up')}
          </Link>
        </TouchableOpacity>
      </Flexbox>
    </Flexbox>
  );
};

CreateAccountAndForgotPassword.propTypes = {
  navigateToScreen: PropTypes.func.isRequired,
  navigateToPasswordRecovery: PropTypes.func.isRequired,
  screen: PropTypes.string,
};

export default CreateAccountAndForgotPassword;
