import React from 'react';
import PropTypes from 'prop-types';
import { H6 } from '../../common';
import { ThemedCard } from './atAGlance.styles';

const CardForAtAGlance = ({ title = '', value = '' }) => {
  return (
    <ThemedCard>
      <H6>{title}</H6>
      <H6>{value}</H6>
    </ThemedCard>
  );
};

CardForAtAGlance.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};

export default CardForAtAGlance;
