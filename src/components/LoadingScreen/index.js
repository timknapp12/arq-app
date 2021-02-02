import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PrimaryButton, H1 } from '../Common';

const LoadingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
      <H1>Loading...</H1>
      <PrimaryButton onPress={() => navigation.navigate('LoginScreen')}>
        Go to login screen
      </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

LoadingScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoadingScreen;
