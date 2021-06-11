import React from 'react';
import PropTypes from 'prop-types';
import {
  Flexbox,
  H2,
  GoogleLoginButton,
  FacebookLoginButton,
} from '../../common';

const SocialSignIn = ({
  title,
  googleSignIn,
  googleDisabled,
  facebookSignIn,
}) => {
  return (
    <Flexbox direction="row" width="75%">
      <H2>{title}</H2>
      <GoogleLoginButton disabled={googleDisabled} onPress={googleSignIn} />
      <FacebookLoginButton onPress={facebookSignIn} />
    </Flexbox>
  );
};

SocialSignIn.propTypes = {
  title: PropTypes.string.isRequired,
  googleDisabled: PropTypes.bool,
  googleSignIn: PropTypes.func.isRequired,
  facebookSignIn: PropTypes.func.isRequired,
};

export default SocialSignIn;
