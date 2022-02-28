import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H5 } from '../../../common';
import { Localized } from '../../../../translations/Localized';
import stringify from '../../../../utils/roundDownAndAddCommas/stringify';

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
        {requiredTotal ? (
          <H5 testID="this-month-total-pv">{`${Localized(
            'This month',
          )}: ${stringify(primaryTotal)} ${Localized('of')} ${stringify(
            requiredTotal,
          )}`}</H5>
        ) : (
          <H5 testID="this-month-total-pv">{`${Localized(
            'This month',
          )}: ${stringify(primaryTotal)}`}</H5>
        )}
      </Legend>
      <Legend>
        <Bullet color={secondaryColor} />
        <H5>{`${Localized('Last month')}: ${stringify(secondaryTotal)}`}</H5>
      </Legend>
    </LegendContainer>
  );
};

BarChartLegend.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  primaryTotal: PropTypes.number.isRequired,
  secondaryTotal: PropTypes.number.isRequired,
  requiredTotal: PropTypes.number,
};

export default BarChartLegend;
