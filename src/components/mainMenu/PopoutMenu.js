import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
// using the standard "TouchableOpacity" from react native didn't work on android with buttons inside a position: absolute view
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H4 } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';

const SideMenu = styled.View`
  z-index: 2;
  position: absolute;
  align-items: flex-start;
  top: 0;
  background-color: ${(props) => props.theme.sideMenuBackground};
  padding: 24px;
`;

const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const PopoutMenu = ({ fadeAnim, fadeOut, setIsMyInfoModalOpen }) => {
  initLanguage();
  const { setIsSignedIn } = useContext(AppContext);
  return (
    <AnimatedMenu style={{ left: fadeAnim }}>
      <TouchableOpacity
        style={{ zIndex: 4 }}
        onPress={() => {
          fadeOut();
          setIsMyInfoModalOpen(true);
        }}>
        <H4>{Localized('My Info')}</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>{Localized('Settings')}</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>{Localized('Chat With Support')}</H4>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignedIn(false)}>
        <H4>{Localized('Log Out')}</H4>
      </TouchableOpacity>
    </AnimatedMenu>
  );
};

PopoutMenu.propTypes = {
  fadeAnim: PropTypes.object,
  fadeOut: PropTypes.func,
  setIsMyInfoModalOpen: PropTypes.func,
};

export default PopoutMenu;
