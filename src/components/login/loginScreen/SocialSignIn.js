import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Flexbox, H2, GoogleLoginButton, AppleLoginButton } from '../../common';

const margin = 12;

const SocialSignIn = ({ title, googleSignIn, request, signInWithApple }) => {
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
  }, []);

  return (
    <Flexbox direction="row" justify="center" width="95%">
      <H2 style={{ marginEnd: margin }}>{title}</H2>
      <GoogleLoginButton
        style={{ marginEnd: margin }}
        onPress={() => {
          googleSignIn();
        }}
        disabled={!request}
      />
      {isAppleLoginAvailable && <AppleLoginButton onPress={signInWithApple} />}
    </Flexbox>
  );
};

SocialSignIn.propTypes = {
  title: PropTypes.string.isRequired,
  googleSignIn: PropTypes.func.isRequired,
  signInWithApple: PropTypes.func.isRequired,
  request: PropTypes.object,
};

export default SocialSignIn;
