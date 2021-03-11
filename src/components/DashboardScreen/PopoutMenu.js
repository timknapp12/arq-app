import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Animated } from 'react-native';
import { H4 } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import AppContext from '../../Contexts/AppContext';

const SideMenu = styled.View`
  z-index: 2;
  position: absolute;
  align-items: flex-start;
  top: 0;
  background-color: ${(props) => props.theme.inactiveBackground};
  padding: 24px;
`;

const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const PopoutMenu = ({
  fadeAnim,
  fadeOut,
  setIsMyInfoModalOpen,
  setIsShareOptionsModalOpen,
}) => {
  init();
  const { setIsSignedIn } = useContext(AppContext);
  return (
    <AnimatedMenu style={{ right: fadeAnim }}>
      <TouchableOpacity
        onPress={() => {
          fadeOut();
          setIsMyInfoModalOpen(true);
        }}>
        <H4>{Localized('my-info')}</H4>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          fadeOut();
          setIsShareOptionsModalOpen(true);
        }}>
        <H4>{Localized('share-options')}</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>{Localized('settings')}</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>{Localized('chat-with-support')}</H4>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignedIn(false)}>
        <H4>{Localized('log-out')}</H4>
      </TouchableOpacity>
    </AnimatedMenu>
  );
};

PopoutMenu.propTypes = {
  fadeAnim: PropTypes.object,
  fadeOut: PropTypes.func,
  setIsMyInfoModalOpen: PropTypes.func,
  setIsShareOptionsModalOpen: PropTypes.func,
};

export default PopoutMenu;
