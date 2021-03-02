import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Animated } from 'react-native';
import { H4 } from '../Common';

const SideMenu = styled.View`
  z-index: 2;
  /* elevation: 2; */
  position: absolute;
  align-items: flex-start;
  top: 0;
  background-color: ${(props) => props.theme.inactiveBackground};
  padding: 24px;
`;

const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const PopoutMenu = ({ fadeAnim }) => {
  return (
    <AnimatedMenu style={{ right: fadeAnim }}>
      <TouchableOpacity>
        <H4>My Info</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>Share Options</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>Settings</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>Chat With Support</H4>
      </TouchableOpacity>
      <TouchableOpacity>
        <H4>Log Out</H4>
      </TouchableOpacity>
    </AnimatedMenu>
  );
};

PopoutMenu.propTypes = {
  fadeAnim: PropTypes.object,
};

export default PopoutMenu;
