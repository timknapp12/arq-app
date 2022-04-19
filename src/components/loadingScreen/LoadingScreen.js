import React from 'react';
import { ScreenContainer, LoadingSpinner } from '../common';

const LoadingScreen = () => {
  return (
    <ScreenContainer>
      <LoadingSpinner size="large" />
    </ScreenContainer>
  );
};

export default LoadingScreen;
