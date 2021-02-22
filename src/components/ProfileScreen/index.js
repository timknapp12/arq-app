import React from 'react';
import { ScreenContainer, H2Bold, H4 } from '../Common';

const ProfileScreen = () => {
  return (
    <ScreenContainer>
      <H2Bold>Profile Screen</H2Bold>
      <H4 testID="profile-screen-description">Welcome to the Profile Screen</H4>
    </ScreenContainer>
  );
};

export default ProfileScreen;
