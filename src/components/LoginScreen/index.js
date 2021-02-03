import React, { useContext } from 'react';
import { ScreenContainer, H2, PrimaryButton } from '../Common';
import AppContext from '../../Contexts/AppContext';

const LoginScreen = () => {
  const { setIsSignedIn } = useContext(AppContext);
  return (
    <ScreenContainer>
      <H2>Login Screen</H2>
      <PrimaryButton onPress={() => setIsSignedIn(true)}>Sign In</PrimaryButton>
    </ScreenContainer>
  );
};

export default LoginScreen;
