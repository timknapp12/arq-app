import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { H4, H5, Flexbox } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import DoubleDonut from './DoubleDonut';
import Slider from './Slider';
import {
  donut1PrimaryColor,
  donut1SecondaryColor,
  donut2PrimaryColor,
  donut3PrimaryColor,
  donut2SecondaryColor,
  donut3SecondaryColor,
} from '../../styles/colors';
import { reshapePerc } from '../../utils/calculateLegPercentages';

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
  initLanguage();
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
      <Flexbox
        justify="flex-start"
        height="100%"
        onStartShouldSetResponder={() => true}>
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
            <H4 testID="total-pv-donut-label">{Localized('Total PV')}</H4>
            <DoubleDonut
              testID="total-pv-donut-svg"
              // ternary to ensure no error with 0 values of distributor rank
              outerpercentage={rank.id === 0 ? 100 : thisMonthPVPerc}
              outermax={100}
              outercolor={donut1PrimaryColor}
              innerpercentage={rank.id === 0 ? 100 : lastMonthPVPerc}
              innermax={100}
              innercolor={donut1SecondaryColor}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={donut1PrimaryColor} />
                {/* toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") gives commas for large numbers */}
                <H5 testID="this-month-total-pv">{`${thisMonthPV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.requiredPV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={donut1SecondaryColor} />
                <H5 testID="last-month-total-pv">{`${lastMonthPV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.requiredPV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
            </LegendContainer>
          </Flexbox>

          <Flexbox accessibilityLabel="monthly comparrison qov" width="50%">
            <H4 testID="total-qov-donut-label">{Localized('Total QOV')}</H4>
            <DoubleDonut
              testID="total-qov-donut-svg"
              outerpercentage={rank.id === 0 ? 100 : thisMonthQOVPerc}
              outermax={100}
              outercolor={donut2PrimaryColor}
              innerpercentage={rank.id === 0 ? 100 : lastMonthQOVPerc}
              innermax={100}
              innercolor={donut2SecondaryColor}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={donut2PrimaryColor} />
                <H5 testID="this-month-total-qov">{`${thisMonthQOV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.requiredQOV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={donut2SecondaryColor} />
                <H5 testID="last-month-total-qov">{`${lastMonthQOV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.requiredQOV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
            </LegendContainer>
          </Flexbox>
        </Flexbox>

        <Flexbox
          accessibilityLabel="monthly comparrison personally enrolled"
          width="auto">
          <H4 testID="personally-enrolled-donut-label">
            {Localized('Personally Enrolled')}
          </H4>
          <DoubleDonut
            testID="personally-enrolled-donut-svg"
            outerpercentage={rank.id === 0 ? 100 : thisMonthPAPerc}
            outermax={100}
            outercolor={donut3PrimaryColor}
            innerpercentage={rank.id === 0 ? 100 : lastMonthPAPerc}
            innermax={100}
            innercolor={donut3SecondaryColor}
            view="rank"
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={donut3PrimaryColor} />
              <H5 testID="this-month-personally-enrolled">{`${thisMonthPA} ${Localized(
                'of',
              )} ${rank?.requiredPA}`}</H5>
            </Legend>
            <Legend>
              <Square squareFill={donut3SecondaryColor} />
              <H5 testID="last-month-personally-enrolled">{`${lastMonthPA} ${Localized(
                'of',
              )} ${rank?.requiredPA}`}</H5>
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
