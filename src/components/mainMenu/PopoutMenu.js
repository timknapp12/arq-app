import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
// using the standard "TouchableOpacity" from react native didn't work on android with buttons inside a position: absolute view
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H4Book } from '../common';
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
        <H4Book>{Localized('My Info')}</H4Book>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          fadeOut();
          setIsSettingsModalOpen(true);
        }}>
        <H4Book>{Localized('Settings')}</H4Book>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4Book>{Localized('Chat With Support')}</H4Book>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4Book>{Localized('Share My Shop')}</H4Book>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignedIn(false)}>
        <H4Book>{Localized('Log Out')}</H4Book>
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
