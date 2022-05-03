import React from 'react';
import PropTypes from 'prop-types';
import { H5Secondary } from '../../common';
import { LegendIconRow } from './leaderbaoard.styles';
import RankIcon from '../visualTree/RankIcon';

const RankLegendIconRow = ({ rankName }) => {
  return (
    <LegendIconRow>
      <RankIcon rankName={rankName} />
      <H5Secondary style={{ marginStart: 4 }}>{rankName}</H5Secondary>
    </LegendIconRow>
  );
};

RankLegendIconRow.propTypes = {
  rankName: PropTypes.string.isRequired,
};

export default RankLegendIconRow;
