import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, H1, H2Bold, PrimaryButton, Flexbox } from '../Common';
import DashboardHeader from './DashboardHeader';
import Subheader from './Subheader';
import AppContext from '../../Contexts/AppContext';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, init } from '../../Translations/Localized';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  init();
  const { setIsSignedIn } = useContext(AppContext);
  const onPressProfile = () => {
    navigation.navigate('ProfileScreen');
    // source for analytics: https://docs.expo.io/versions/latest/sdk/firebase-analytics/
    Analytics.setUserProperties({
      rank: 'Platinum',
    });
    Analytics.setUserId('test-user');
    Analytics.logEvent('go_to_profile_screen_button_tapped', {
      screen: 'Dashboard Screen',
      purpose: 'View personal profile',
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Dashboard_Screen_Visited', {
        screen: 'Dashboard Screen',
        purpose: 'User navigated to Dashboard Screen',
      });
    }
  }, [isFocused]);

  return (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      <DashboardHeader badgeValue={2} />
      <Subheader />
      <Flexbox style={{ marginTop: 200 }}>
        <H1 testID="home-screen-welcome">{Localized('welcome')}</H1>
        <H2Bold testID="home-screen-title">Home Screen</H2Bold>
        <PrimaryButton testID="go-to-profile-button" onPress={onPressProfile}>
          See Profile
        </PrimaryButton>
        <PrimaryButton
          style={{ marginTop: 12 }}
          onPress={() => setIsSignedIn(false)}>
          Sign out
        </PrimaryButton>
      </Flexbox>
    </ScreenContainer>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
