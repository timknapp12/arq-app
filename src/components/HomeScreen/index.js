import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, H2, PrimaryButton } from '../Common';
import AppContext from '../../Contexts/AppContext';

const HomeScreen = ({ navigation }) => {
  const { setIsSignedIn } = useContext(AppContext);
  return (
    <ScreenContainer>
      <H2 testID="home-screen-title">Home Screen</H2>
      <PrimaryButton
        testID="go-to-profile-button"
        onPress={() => navigation.navigate('ProfileScreen')}>
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
