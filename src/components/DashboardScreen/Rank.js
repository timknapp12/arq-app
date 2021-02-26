import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H4Bold, H5, Flexbox } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import DoubleDonut from './DoubleDonut';
import Slider from './Slider';
import {
  mayaBlue,
  pacificBlue,
  darkViolet,
  heliotrope,
} from '../../Styles/colors';

const ChartTitle = styled(H4Bold)`
  color: ${(props) => props.theme.secondaryTextColor};
`;

const LegendContainer = styled.View`
  margin-top: 8px;
`;

const Legend = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Square = styled.View`
  height: 16px;
  width: 16px;
  margin-right: 2px;
  background-color: ${({ squareFill }) => squareFill};
`;

const Rank = ({ ranklist, user }) => {
  init();
  const {
    lastMonthPV,
    thisMonthPV,
    lastMonthOV,
    thisMonthOV,
    lastMonthPA,
    thisMonthPA,
  } = user;
  const initialRankName = Localized('pro');
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = {
    id: 2,
    requiredPv: 100,
    requiredQov: 600,
    name: Localized('pro'),
  };
  const [rank, setRank] = useState(initialRank);

  return (
    <Flexbox width="100%">
      <Slider
        rankName={rankName}
        setRankName={setRankName}
        rank={rank}
        setRank={setRank}
        ranklist={ranklist}
      />
      <Flexbox
        accessibilityLabel="Distributor rank"
        padding={20}
        width="100%"
        direction="row">
        <Flexbox accessibilityLabel="monthly comparrison pv" width="auto">
          <ChartTitle testID="total-pv-donut-label">
            {Localized('total-pv')}
          </ChartTitle>
          <DoubleDonut
            testID="total-pv-donut-svg"
            // ternary to ensure no error with 0 values of distributor rank
            outerpercentage={rank.id === 0 ? 100 : thisMonthPV}
            outermax={rank.id === 0 ? 100 : rank.requiredPv}
            outercolor={pacificBlue}
            innerpercentage={rank.id === 0 ? 100 : lastMonthPV}
            innermax={rank.id === 0 ? 100 : rank.requiredPv}
            innercolor={mayaBlue}
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={pacificBlue} />
              <H5 testID="this-month-total-pv">{`${thisMonthPV} ${Localized(
                'of',
              )} ${rank?.requiredPv}`}</H5>
            </Legend>
            <Legend>
              <Square squareFill={mayaBlue} />
              <H5 testID="last-month-total-pv">{`${lastMonthPV} ${Localized(
                'of',
              )} ${rank?.requiredPv}`}</H5>
            </Legend>
          </LegendContainer>
        </Flexbox>

        <Flexbox
          accessibilityLabel="monthly comparrison qov"
          style={{ position: 'relative' }}
          width="auto">
          <ChartTitle testID="total-qov-donut-label">
            {Localized('total-qov')}
          </ChartTitle>
          <DoubleDonut
            testID="total-qov-donut-svg"
            outerpercentage={rank.id === 0 ? 100 : thisMonthOV}
            outermax={rank.id === 0 ? 100 : rank.requiredQov}
            outercolor={darkViolet}
            innerpercentage={rank.id === 0 ? 100 : lastMonthOV}
            innermax={rank.id === 0 ? 100 : rank.requiredQov}
            innercolor={heliotrope}
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={darkViolet} />
              <H5 testID="this-month-total-qov">{`${thisMonthOV} ${Localized(
                'of',
              )} ${rank?.requiredQov}`}</H5>
            </Legend>
            <Legend>
              <Square squareFill={heliotrope} />
              <H5 testID="last-month-total-qov">{`${lastMonthOV} ${Localized(
                'of',
              )} ${rank?.requiredQov}`}</H5>
            </Legend>
          </LegendContainer>
        </Flexbox>
      </Flexbox>

      <Flexbox
        accessibilityLabel="monthly comparrison personally enrolled"
        width="auto">
        <ChartTitle testID="personally-enrolled-donut-label">
          {Localized('personally-enrolled')}
        </ChartTitle>
        <DoubleDonut
          testID="personally-enrolled-donut-svg"
          outerpercentage={thisMonthPA}
          outermax={2}
          outercolor="yellow"
          innerpercentage={lastMonthPA}
          innermax={2}
          innercolor="wheat"
        />
        <LegendContainer>
          <Legend>
            <Square squareFill="yellow" />
            <H5 testID="this-month-personally-enrolled">{`${thisMonthPA} ${Localized(
              'of',
            )} 2`}</H5>
          </Legend>
          <Legend>
            <Square squareFill="wheat" />
            <H5 testID="last-month-personally-enrolled">{`${lastMonthPA} ${Localized(
              'of',
            )} 2`}</H5>
          </Legend>
        </LegendContainer>
      </Flexbox>
    </Flexbox>
  );
};

Rank.propTypes = {
  ranklist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      requiredPv: PropTypes.number,
      requiredQov: PropTypes.number,
      legMaxPerc: PropTypes.number,
      legMaxOv: PropTypes.number,
    }),
  ),
  user: PropTypes.object,
};

export default Rank;
