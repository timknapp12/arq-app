import React, { useEffect } from 'react';
import { ScreenContainer, H2Bold, H4 } from '../Common';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';

const ResourcesScreen = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Resources_Screen_Visited', {
        screen: 'Resources Screen',
        purpose: 'User navigated to Resources Screen',
      });
    }
  }, [isFocused]);
  return (
    <ScreenContainer>
      <H2Bold>Resources Screen</H2Bold>
      <H4 testID="resources-screen-description">
        Welcome to the Resources Screen
      </H4>
    </ScreenContainer>
  );
};

export default ResourcesScreen;
