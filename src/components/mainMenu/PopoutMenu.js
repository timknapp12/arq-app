import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
// using the standard "TouchableOpacity" from react native didn't work on android with buttons inside a position: absolute view
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuText } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';

const SideMenu = styled.View`
  z-index: 2;
  position: absolute;
  align-items: flex-start;
  top: 10px;
  background-color: ${(props) => props.theme.sideMenuBackground};
  padding: 24px;
`;

const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const PopoutMenu = ({
  fadeAnim,
  fadeOut,
  setIsMyInfoModalOpen,
  setIsSettingsModalOpen,
}) => {
  initLanguage();
  const { setIsSignedIn } = useContext(AppContext);
  return (
    <AnimatedMenu style={{ left: fadeAnim }}>
      <TouchableOpacity
        onPress={() => {
          fadeOut();
          setIsMyInfoModalOpen(true);
        }}>
        <MenuText>{Localized('My Info')}</MenuText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          fadeOut();
          setIsSettingsModalOpen(true);
        }}>
        <MenuText>{Localized('Settings')}</MenuText>
      </TouchableOpacity>
      <TouchableOpacity>
        <MenuText>{Localized('Chat With Support')}</MenuText>
      </TouchableOpacity>
      <TouchableOpacity>
        <MenuText>{Localized('Share My Shop')}</MenuText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignedIn(false)}>
        <MenuText>{Localized('Log Out')}</MenuText>
      </TouchableOpacity>
    </AnimatedMenu>
  );
};

PopoutMenu.propTypes = {
  fadeAnim: PropTypes.object,
  fadeOut: PropTypes.func,
  setIsMyInfoModalOpen: PropTypes.func,
  setIsSettingsModalOpen: PropTypes.func,
};

export default PopoutMenu;
