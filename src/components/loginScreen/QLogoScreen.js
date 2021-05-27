import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScreenContainer } from '../common';
import logo from '../../../assets/icons/q-sciences-stacked-logo-white.png';

const QLogoScreen = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          padding: 20,
          height: '100%',
        }}>
        <Image
          style={{ marginBottom: 24, height: 108, width: 160 }}
          source={logo}
        />
        {children}
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

QLogoScreen.propTypes = {
  children: PropTypes.any.isRequired,
};
export default QLogoScreen;
