import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, H2, PrimaryButton } from '../Common';
import AppContext from '../../Contexts/AppContext';
import * as Analytics from 'expo-firebase-analytics';

const HomeScreen = ({ navigation }) => {
  const { setIsSignedIn } = useContext(AppContext);

  const onPressProfile = () => {
    navigation.navigate('ProfileScreen');
    // source for analytics: https://docs.expo.io/versions/latest/sdk/firebase-analytics/
    Analytics.setUserProperties({
      rank: 'Platinum',
    });
    Analytics.setUserId('test-user');
    Analytics.logEvent('Tapped button to go to profile screen', {
      screen: 'Home Screen',
      purpose: 'View personal profile',
    });
  };

  return (
    <ScreenContainer>
      <H2 testID="home-screen-title">Home Screen</H2>
      <PrimaryButton testID="go-to-profile-button" onPress={onPressProfile}>
        See Profile
      </PrimaryButton>
      <PrimaryButton
        style={{ marginTop: 12 }}
        onPress={() => setIsSignedIn(false)}>
        Sign out
      </PrimaryButton>
    </ScreenContainer>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
