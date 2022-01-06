import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
// using the standard "TouchableOpacity" from react native didn't work on android with buttons inside a position: absolute view
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H4Book, SideMenu } from '../common';

const TouchableContainer = styled.View`
  width: 100%;
`;
const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const Touchable = styled(TouchableOpacity)`
  padding: 2px;
`;

const Menu = ({ items, ...props }) => {
  return (
    <AnimatedMenu {...props}>
      {items.map((item) => (
        <TouchableContainer key={item.id}>
          <Touchable onPress={item.onPress}>
            <H4Book>{item.title}</H4Book>
          </Touchable>
        </TouchableContainer>
      ))}
    </AnimatedMenu>
  );
};

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Menu;
