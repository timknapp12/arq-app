import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H6, Flexbox, Link } from '../../common';
import { Localized } from '../../../translations/Localized';

const ForgotPassword = ({ navigateToPasswordRecovery }) => {
  return (
    <>
      <Flexbox style={{ marginBottom: 5 }} direction="row">
        <H6 style={{ marginEnd: 5 }}>{Localized('Forgot your password?')}</H6>
        <TouchableOpacity
          onPress={navigateToPasswordRecovery}
          testID="reset-password-button"
        >
          <Link>{Localized('Reset Password')}</Link>
        </TouchableOpacity>
      </Flexbox>
    </>
  );
};

ForgotPassword.propTypes = {
  navigateToPasswordRecovery: PropTypes.func.isRequired,
};

export default ForgotPassword;
