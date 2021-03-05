import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { H4Bold, H5Secondary, Flexbox } from '../Common';
import { Localized, init } from '../../Translations/Localized';
import DoubleDonut from './DoubleDonut';
import Slider from './Slider';
import {
  cyan,
  redOrange,
  pantone,
  lightCyan,
  lightPink,
  riceFlower,
} from '../../Styles/colors';
import { reshapePerc } from '../../Utils/calculateLegPercentages';

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

const Rank = ({ ranklist, user, fadeOut }) => {
  init();
  const {
    lastMonthPV,
    thisMonthPV,
    lastMonthQOV,
    thisMonthQOV,
    lastMonthPA,
    thisMonthPA,
    currentRank,
  } = user;
  const initialRankName = currentRank?.name;
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = user?.currentRank;
  const [rank, setRank] = useState(initialRank);

  const [isQualified, setIsQualified] = useState(false);

  const validateQualification = (
    PV,
    QOV,
    PA,
    requiredPV,
    requiredQOV,
    requiredPA,
  ) => {
    if (PV >= requiredPV && QOV >= requiredQOV && PA >= requiredPA) {
      setIsQualified(true);
    } else {
      setIsQualified(false);
    }
  };

  useEffect(() => {
    const { thisMonthPV, thisMonthQOV, thisMonthPA } = user;
    const { requiredPV, requiredQOV, requiredPA } = rank;
    validateQualification(
      thisMonthPV,
      thisMonthQOV,
      thisMonthPA,
      requiredPV,
      requiredQOV,
      requiredPA,
    );
  }, [user, rank]);

  // These are used to restrain the percentages from being way higher than the max causing a ton of extra revolutions on the animations
  const lastMonthPVPerc = reshapePerc(lastMonthPV, rank.requiredPV);

  const thisMonthPVPerc = reshapePerc(thisMonthPV, rank.requiredPV);

  const lastMonthQOVPerc = reshapePerc(lastMonthQOV, rank.requiredQOV);

  const thisMonthQOVPerc = reshapePerc(thisMonthQOV, rank.requiredQOV);

  const lastMonthPAPerc = reshapePerc(lastMonthPA, rank.requiredPA);

  const thisMonthPAPerc = reshapePerc(thisMonthPA, rank.requiredPA);

  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <Flexbox width="100%" onStartShouldSetResponder={() => true}>
        <Slider
          rankName={rankName}
          setRankName={setRankName}
          rank={rank}
          setRank={setRank}
          ranklist={ranklist}
          isQualified={isQualified}
        />
        <Flexbox
          accessibilityLabel="Distributor rank"
          padding={10}
          width="100%"
          justify="space-between"
          direction="row">
          <Flexbox accessibilityLabel="monthly comparrison pv" width="50%">
            <ChartTitle testID="total-pv-donut-label">
              {Localized('total-pv')}
            </ChartTitle>
            <DoubleDonut
              testID="total-pv-donut-svg"
              // ternary to ensure no error with 0 values of distributor rank
              outerpercentage={rank.id === 0 ? 100 : thisMonthPVPerc}
              outermax={100}
              outercolor={cyan}
              innerpercentage={rank.id === 0 ? 100 : lastMonthPVPerc}
              innermax={100}
              innercolor={lightCyan}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={cyan} />
                {/* toLocaleString() gives commas for large numbers */}
                <H5Secondary testID="this-month-total-pv">{`${thisMonthPV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredPV.toLocaleString()}`}</H5Secondary>
              </Legend>
              <Legend>
                <Square squareFill={lightCyan} />
                <H5Secondary testID="last-month-total-pv">{`${lastMonthPV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredPV.toLocaleString()}`}</H5Secondary>
              </Legend>
            </LegendContainer>
          </Flexbox>

          <Flexbox accessibilityLabel="monthly comparrison qov" width="50%">
            <ChartTitle testID="total-qov-donut-label">
              {Localized('total-qov')}
            </ChartTitle>
            <DoubleDonut
              testID="total-qov-donut-svg"
              outerpercentage={rank.id === 0 ? 100 : thisMonthQOVPerc}
              outermax={100}
              outercolor={redOrange}
              innerpercentage={rank.id === 0 ? 100 : lastMonthQOVPerc}
              innermax={100}
              innercolor={lightPink}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={redOrange} />
                <H5Secondary testID="this-month-total-qov">{`${thisMonthQOV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredQOV.toLocaleString()}`}</H5Secondary>
              </Legend>
              <Legend>
                <Square squareFill={lightPink} />
                <H5Secondary testID="last-month-total-qov">{`${lastMonthQOV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredQOV.toLocaleString()}`}</H5Secondary>
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
            outerpercentage={rank.id === 0 ? 100 : thisMonthPAPerc}
            outermax={100}
            outercolor={pantone}
            innerpercentage={rank.id === 0 ? 100 : lastMonthPAPerc}
            innermax={100}
            innercolor={riceFlower}
            view="rank"
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={pantone} />
              <H5Secondary testID="this-month-personally-enrolled">{`${thisMonthPA} ${Localized(
                'of',
              )} ${rank?.requiredPA}`}</H5Secondary>
            </Legend>
            <Legend>
              <Square squareFill={riceFlower} />
              <H5Secondary testID="last-month-personally-enrolled">{`${lastMonthPA} ${Localized(
                'of',
              )} ${rank?.requiredPA}`}</H5Secondary>
            </Legend>
          </LegendContainer>
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

Rank.propTypes = {
  ranklist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      requiredPV: PropTypes.number,
      requiredQOV: PropTypes.number,
      legMaxPerc: PropTypes.number,
      legMaxOV: PropTypes.number,
      requiredPA: PropTypes.number,
    }),
  ),
  user: PropTypes.object,
  fadeOut: PropTypes.func,
};

export default Rank;
