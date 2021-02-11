import React, { useEffect } from 'react';
import { ScreenContainer, H2, H4 } from '../Common';
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
      <H2>Resources Screen</H2>
      <H4 testID="resources-screen-description">
        Welcome to the Resources Screen
      </H4>
    </ScreenContainer>
  );
};

export default ResourcesScreen;
