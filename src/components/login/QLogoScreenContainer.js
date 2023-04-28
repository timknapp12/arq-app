import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScreenContainer } from '../common';
import logo from '../../../assets/icons/q-sciences-stacked-logo-white.png';

const QLogoScreenContainer = ({ children, ...props }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          height: '100%',
        }}
        {...props}
      >
        <Image
          style={{ height: 108, width: 160, marginTop: 20 }}
          source={logo}
        />
        {children}
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

QLogoScreenContainer.propTypes = {
  children: PropTypes.any.isRequired,
};
export default QLogoScreenContainer;
