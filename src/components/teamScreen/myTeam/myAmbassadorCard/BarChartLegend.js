import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H5 } from '../../../common';
import { Localized } from '../../../../translations/Localized';

const LegendContainer = styled.View`
  margin-top: 8px;
`;

const Legend = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Bullet = styled.View`
  height: 16px;
  width: 16px;
  margin-right: 4px;
  background-color: ${({ color }) => color};
`;

const BarChartLegend = ({
  primaryColor,
  secondaryColor,
  primaryTotal,
  secondaryTotal,
  requiredTotal,
}) => {
  return (
    <LegendContainer>
      <Legend>
        <Bullet color={primaryColor} />
        {/* toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") gives commas for large numbers */}
        <H5 testID="this-month-total-pv">{`${Localized(
          'This month',
        )}: ${primaryTotal
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
          'of',
        )} ${requiredTotal
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
      </Legend>
      <Legend>
        <Bullet color={secondaryColor} />
        <H5 testID="last-month-total-pv">{`${Localized(
          'Last month',
        )}: ${secondaryTotal
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
          'of',
        )} ${requiredTotal
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
      </Legend>
    </LegendContainer>
  );
};

BarChartLegend.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  primaryTotal: PropTypes.number.isRequired,
  secondaryTotal: PropTypes.number.isRequired,
  requiredTotal: PropTypes.number.isRequired,
};

export default BarChartLegend;
