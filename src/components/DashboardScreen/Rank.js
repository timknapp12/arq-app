import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { H4Bold, H5, Flexbox } from '../Common';
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

  const compareMinAndMax = (min, max) => {
    if (min >= max) {
      return true;
    } else {
      return false;
    }
  };

  const validateQualification = (
    PV,
    QOV,
    PA,
    requiredPV,
    requiredQOV,
    requiredPA,
  ) => {
    if (
      compareMinAndMax(PV, requiredPV) &&
      compareMinAndMax(QOV, requiredQOV) &&
      compareMinAndMax(PA, requiredPA)
    ) {
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
  const lastMonthPVPerc = compareMinAndMax(lastMonthPV, rank.requiredPV)
    ? rank.requiredPV
    : lastMonthPV;

  const thisMonthPVPerc = compareMinAndMax(thisMonthPV, rank.requiredPV)
    ? rank.requiredPV
    : thisMonthPV;

  const lastMonthQOVPerc = compareMinAndMax(lastMonthQOV, rank.requiredQOV)
    ? rank.requiredQOV
    : lastMonthQOV;

  const thisMonthQOVPerc = compareMinAndMax(thisMonthQOV, rank.requiredQOV)
    ? rank.requiredQOV
    : thisMonthQOV;

  // Use this in case we want to stop to animation everytime the slider changes and the circle should still remain full, but at one point on the slider a crazy animation will occur
  // const thisMonthMaxQOV = compareMinAndMax(thisMonthQOV, rank.requiredQOV)
  //   ? 100
  //   : rank.requiredQOV;

  const lastMonthPAPerc = compareMinAndMax(lastMonthPA, rank.requiredPA)
    ? rank.requiredPA
    : lastMonthPA;

  const thisMonthPAPerc = compareMinAndMax(thisMonthPA, rank.requiredPA)
    ? rank.requiredPA
    : thisMonthPA;

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
              outerpercentage={rank.id === 0 ? 100 : thisMonthPVPerc}
              outermax={rank.id === 0 ? 100 : rank.requiredPV}
              outercolor={cyan}
              innerpercentage={rank.id === 0 ? 100 : lastMonthPVPerc}
              innermax={rank.id === 0 ? 100 : rank.requiredPV}
              innercolor={lightCyan}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={cyan} />
                {/* toLocaleString() gives commas for large numbers */}
                <H5 testID="this-month-total-pv">{`${thisMonthPV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredPV.toLocaleString()}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={lightCyan} />
                <H5 testID="last-month-total-pv">{`${lastMonthPV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredPV.toLocaleString()}`}</H5>
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
              outerpercentage={rank.id === 0 ? 100 : thisMonthQOVPerc}
              outermax={rank.id === 0 ? 100 : rank.requiredQOV}
              outercolor={redOrange}
              innerpercentage={rank.id === 0 ? 100 : lastMonthQOVPerc}
              innermax={rank.id === 0 ? 100 : rank.requiredQOV}
              innercolor={lightPink}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={redOrange} />
                <H5 testID="this-month-total-qov">{`${thisMonthQOV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredQOV.toLocaleString()}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={lightPink} />
                <H5 testID="last-month-total-qov">{`${lastMonthQOV.toLocaleString()} ${Localized(
                  'of',
                )} ${rank?.requiredQOV.toLocaleString()}`}</H5>
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
            outerpercentage={thisMonthPAPerc}
            outermax={rank.requiredPA}
            outercolor={pantone}
            innerpercentage={lastMonthPAPerc}
            innermax={rank.requiredPA}
            innercolor={riceFlower}
            view="rank"
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={pantone} />
              <H5 testID="this-month-personally-enrolled">{`${thisMonthPA} ${Localized(
                'of',
              )} 2`}</H5>
            </Legend>
            <Legend>
              <Square squareFill={riceFlower} />
              <H5 testID="last-month-personally-enrolled">{`${lastMonthPA} ${Localized(
                'of',
              )} 2`}</H5>
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
