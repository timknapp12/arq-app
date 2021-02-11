import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { PrimaryButton, H1, ScreenContainer } from '../Common';

const LoadingScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <ActivityIndicator size="large" color="lightblue" />
      <H1>Loading...</H1>
      <PrimaryButton onPress={() => navigation.navigate('Login Screen')}>
        Go to login screen
      </PrimaryButton>
    </ScreenContainer>
  );
};

LoadingScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoadingScreen;
