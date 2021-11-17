import React from 'react';
import { Animated } from 'react-native';
import { SideMenu, H4Book } from '../../../common';

const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const MyTeamSearchFilterMenu = ({ ...props }) => {
  return (
    <AnimatedMenu {...props}>
      <H4Book>This is the side menu</H4Book>
    </AnimatedMenu>
  );
};

export default MyTeamSearchFilterMenu;
