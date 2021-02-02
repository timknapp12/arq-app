import React from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, H2, PrimaryButton } from '../Common';

const LoginScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <H2>Login Screen</H2>
      <PrimaryButton onPress={() => navigation.navigate('Tabs')}>
        Go To Tabs
      </PrimaryButton>
    </ScreenContainer>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
