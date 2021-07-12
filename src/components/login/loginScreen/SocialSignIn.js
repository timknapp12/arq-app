import React from 'react';
import PropTypes from 'prop-types';
import {
  Flexbox,
  H2,
  GoogleLoginButton,
  FacebookLoginButton,
} from '../../common';

const SocialSignIn = ({ title, googleSignIn, facebookSignIn }) => {
  return (
    <Flexbox direction="row" width="75%">
      <H2 style={{ marginEnd: 8 }}>{title}</H2>
      <GoogleLoginButton style={{ marginEnd: 8 }} onPress={googleSignIn} />
      <FacebookLoginButton onPress={facebookSignIn} />
    </Flexbox>
  );
};

SocialSignIn.propTypes = {
  title: PropTypes.string.isRequired,
  googleSignIn: PropTypes.func.isRequired,
  facebookSignIn: PropTypes.func.isRequired,
};

export default SocialSignIn;
