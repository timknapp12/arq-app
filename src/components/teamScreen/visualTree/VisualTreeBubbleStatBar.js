import React from 'react';
import { H6Secondary } from '../../common';
import { VisualTreeStatsBarCard } from './visualTree.styles';

const VisualTreeBubbleStatBar = () => {
  return (
    <VisualTreeStatsBarCard>
      <H6Secondary>Total QOV: 144,343</H6Secondary>
      <H6Secondary>Total CV: 87,912</H6Secondary>
    </VisualTreeStatsBarCard>
  );
};

export default VisualTreeBubbleStatBar;
