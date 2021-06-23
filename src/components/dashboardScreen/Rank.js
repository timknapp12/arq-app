import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { H4, H5, Flexbox } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import DoubleDonut from './DoubleDonut';
import Slider from './Slider';
import {
  donut1primaryColor,
  donut1secondaryColor,
  donut2primaryColor,
  donut3primaryColor,
  donut2secondaryColor,
  donut3secondaryColor,
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
  const { pv, qoV, pa, previousAmbassadorMonthlyRecord } = user;

  // previous month stats are renamed in destructuring so they are more clear
  const {
    personalVolume: lastMonthPV,
    personallySponsoredActiveAmbassadorCount: lastMonthPA,
    qov: lastMonthQOV,
  } = previousAmbassadorMonthlyRecord;

  const initialRankName = user?.rank?.rankName;
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = user?.rank;
  const [rank, setRank] = useState(initialRank);

  const [isQualified, setIsQualified] = useState(false);

  const validateQualification = (
    PV,
    QOV,
    PA,
    requiredPv,
    minimumQoV,
    requiredPa,
  ) => {
    if (PV >= requiredPv && QOV >= minimumQoV && PA >= requiredPa) {
      setIsQualified(true);
    } else {
      setIsQualified(false);
    }
  };

  useEffect(() => {
    const { pv, qoV, pa } = user;
    const { requiredPv, minimumQoV, requiredPa } = rank;
    validateQualification(pv, qoV, pa, requiredPv, minimumQoV, requiredPa);
  }, [user, rank]);

  // These are used to restrain the percentages from being way higher than the max causing a ton of extra revolutions on the animations
  const lastMonthPVPerc = reshapePerc(lastMonthPV, rank.requiredPv);

  const pvPerc = reshapePerc(pv, rank.requiredPv);

  const lastMonthQOVPerc = reshapePerc(lastMonthQOV, rank.minimumQoV);

  const qoVPerc = reshapePerc(qoV, rank.minimumQoV);

  const lastMonthPAPerc = reshapePerc(lastMonthPA, rank.requiredPa);

  const paPerc = reshapePerc(pa, rank.requiredPa);

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
              outerpercentage={rank.id === 0 ? 100 : pvPerc}
              outermax={100}
              outercolor={donut1primaryColor}
              innerpercentage={rank.id === 0 ? 100 : lastMonthPVPerc}
              innermax={100}
              innercolor={donut1secondaryColor}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={donut1primaryColor} />
                {/* toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") gives commas for large numbers */}
                <H5 testID="this-month-total-pv">{`${pv
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.requiredPv
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={donut1secondaryColor} />
                <H5 testID="last-month-total-pv">{`${lastMonthPV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.requiredPv
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
            </LegendContainer>
          </Flexbox>

          <Flexbox accessibilityLabel="monthly comparrison qov" width="50%">
            <H4 testID="total-qov-donut-label">{Localized('Total QOV')}</H4>
            <DoubleDonut
              testID="total-qov-donut-svg"
              outerpercentage={rank.id === 0 ? 100 : qoVPerc}
              outermax={100}
              outercolor={donut2primaryColor}
              innerpercentage={rank.id === 0 ? 100 : lastMonthQOVPerc}
              innermax={100}
              innercolor={donut2secondaryColor}
              view="rank"
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={donut2primaryColor} />
                <H5 testID="this-month-total-qov">{`${qoV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.minimumQoV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={donut2secondaryColor} />
                <H5 testID="last-month-total-qov">{`${lastMonthQOV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.minimumQoV
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
            outerpercentage={rank.id === 0 ? 100 : paPerc}
            outermax={100}
            outercolor={donut3primaryColor}
            innerpercentage={rank.id === 0 ? 100 : lastMonthPAPerc}
            innermax={100}
            innercolor={donut3secondaryColor}
            view="rank"
          />
          <LegendContainer>
            <Legend>
              <Square squareFill={donut3primaryColor} />
              <H5 testID="this-month-personally-enrolled">{`${pa} ${Localized(
                'of',
              )} ${rank?.requiredPa}`}</H5>
            </Legend>
            <Legend>
              <Square squareFill={donut3secondaryColor} />
              <H5 testID="last-month-personally-enrolled">{`${lastMonthPA} ${Localized(
                'of',
              )} ${rank?.requiredPa}`}</H5>
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
      rankId: PropTypes.number,
      rankName: PropTypes.string,
      requiredPv: PropTypes.number,
      minimumQoV: PropTypes.number,
      legMaxPercentage: PropTypes.number,
      maximumPerLeg: PropTypes.number,
      requiredPa: PropTypes.number,
    }),
  ),
  user: PropTypes.object,
  fadeOut: PropTypes.func,
};

export default Rank;
