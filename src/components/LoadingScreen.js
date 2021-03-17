import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ScreenContainer } from './Common';
import AppContext from '../Contexts/AppContext';

const LoadingScreen = () => {
  const { theme } = useContext(AppContext);
  return (
    <ScreenContainer>
      <ActivityIndicator size="large" color={theme.disabledBackgroundColor} />
    </ScreenContainer>
  );
};

export default LoadingScreen;
