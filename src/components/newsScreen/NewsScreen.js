import React, { useEffect, useContext } from 'react';
import { ScreenContainer, H4 } from '../common';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import AppContext from '../../contexts/AppContext';

const NewsScreen = () => {
  const { storeTimeStamp } = useContext(AppContext);
  storeTimeStamp();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('News_Screen_Visited', {
        screen: 'News Screen',
        purpose: 'User navigated to News Screen',
      });
    }
  }, [isFocused]);
  return (
    <ScreenContainer>
      <H4>News Screen</H4>
    </ScreenContainer>
  );
};

export default NewsScreen;
