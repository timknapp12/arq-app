import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Localized } from '../../../translations/Localized';
import { SideMenu, H4Secondary } from '../../common';
import RankLegendIconRow from './RankLegendIconRow';

const AnimatedMenu = Animated.createAnimatedComponent(SideMenu);

const RankLegend = ({ fadeAnim, ...props }) => {
  return (
    <AnimatedMenu style={{ right: fadeAnim, top: 32 }} {...props}>
      <H4Secondary>{Localized('Rank Icons')}</H4Secondary>
      <RankLegendIconRow rankName="Crown Diamond" />
      <RankLegendIconRow rankName="Presidential Diamond" />
      <RankLegendIconRow rankName="Royal Diamond" />
      <RankLegendIconRow rankName="Black Diamond" />
      <RankLegendIconRow rankName="Blue Diamond" />
      <RankLegendIconRow rankName="Diamond" />
      <RankLegendIconRow rankName="Emerald" />
      <RankLegendIconRow rankName="Ruby" />
      <RankLegendIconRow rankName="Platinum" />
      <RankLegendIconRow rankName="Gold" />
      <RankLegendIconRow rankName="Silver" />
      <RankLegendIconRow rankName="Bronze" />
      <RankLegendIconRow rankName="Elite" />
      <RankLegendIconRow rankName="Executive" />
      <RankLegendIconRow rankName="Pro" />
      <RankLegendIconRow rankName="Builder" />
    </AnimatedMenu>
  );
};

RankLegend.propTypes = {
  fadeAnim: PropTypes.object.isRequired,
};

export default RankLegend;
