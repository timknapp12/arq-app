import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { useLazyQuery } from '@apollo/client';
import { H4, H5, Flexbox } from '../common';
import { Localized } from '../../translations/Localized';
import DoubleDonut from './DoubleDonut';
import Slider from './Slider';
import AppContext from '../../contexts/AppContext';
import { reshapePerc } from '../../utils/calculateLegPercentages';
import { CALCULATE_QOV } from '../../graphql/queries';

const LegendContainer = styled.View`
  margin-top: 8px;
`;

const Legend = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Dot = styled.View`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 4px;
  background-color: ${({ dotFill }) => dotFill};
`;

const Rank = ({ ranklist, user, closeMenus }) => {
  const { theme } = useContext(AppContext);
  const { pv, pa, leg1, leg2, leg3, previousAmbassadorMonthlyRecord } = user;

  const lastMonthPV = previousAmbassadorMonthlyRecord?.personalVolume ?? 0;
  const lastMonthPA =
    previousAmbassadorMonthlyRecord?.personallySponsoredActiveAmbassadorCount ??
    0;

  const initialRankName = user?.rank?.rankName;
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = user?.rank;
  const [rank, setRank] = useState(initialRank);

  const lastMonthLeg1 = previousAmbassadorMonthlyRecord?.leg1 ?? 0;
  const lastMonthLeg2 = previousAmbassadorMonthlyRecord?.leg2 ?? 0;
  const lastMonthLeg3 = previousAmbassadorMonthlyRecord?.leg3 ?? 0;

  const [calculateQovThisMonth, { data }] = useLazyQuery(CALCULATE_QOV, {
    variables: { hypotheticalRank: rank?.rankName, leg1, leg2, leg3 },
    onError: (err) => console.log(`err in calculate qov this month`, err),
  });

  const qoV = data?.qoVFor?.qoV ?? 0;

  const [calculateQovLastMonth, { data: lastMonthData }] = useLazyQuery(
    CALCULATE_QOV,
    {
      variables: {
        hypotheticalRank: rank?.rankName,
        leg1: lastMonthLeg1,
        leg2: lastMonthLeg2,
        leg3: lastMonthLeg3,
      },
      onError: (err) => console.log(`err in calculate qov last month`, err),
    },
  );

  const lastMonthQOV = lastMonthData?.qoVFor?.qoV ?? 0;

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

  useEffect(() => {
    calculateQovThisMonth();
    calculateQovLastMonth();
  }, [rank]);

  // These are used to restrain the percentages from being way higher than the max causing a ton of extra revolutions on the animations
  const lastMonthPVPerc = reshapePerc(lastMonthPV, rank.requiredPv);

  const pvPerc = reshapePerc(pv, rank.requiredPv);

  const lastMonthQOVPerc = reshapePerc(lastMonthQOV, rank.minimumQoV);

  const qoVPerc = reshapePerc(qoV, rank.minimumQoV);

  const lastMonthPAPerc = reshapePerc(lastMonthPA, rank.requiredPa);

  const paPerc = reshapePerc(pa, rank.requiredPa);

  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <Flexbox justify="flex-start" onStartShouldSetResponder={() => true}>
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
          width="100%"
          justify="space-between"
          direction="row"
        >
          <Flexbox accessibilityLabel="monthly comparrison pv" width="50%">
            <H4 testID="total-pv-donut-label">{Localized('Total PV')}</H4>
            <DoubleDonut
              testID="total-pv-donut-svg"
              // ternary to ensure no error with 0 values of distributor rank
              outerpercentage={rank.rankId === 1 ? 0 : pvPerc}
              outermax={100}
              outercolor={theme.donut1primaryColor}
              innerpercentage={rank.rankId === 1 ? 0 : lastMonthPVPerc}
              innermax={100}
              innercolor={theme.donut1secondaryColor}
              view="rank"
              onPress={closeMenus}
            />
            <LegendContainer>
              <Legend>
                <Dot dotFill={theme.donut1primaryColor} />
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
                <Dot dotFill={theme.donut1secondaryColor} />
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
              outerpercentage={rank.rankId === 1 ? 0 : qoVPerc}
              outermax={100}
              outercolor={theme.donut2primaryColor}
              innerpercentage={rank.rankId === 1 ? 0 : lastMonthQOVPerc}
              innermax={100}
              innercolor={theme.donut2secondaryColor}
              view="rank"
              onPress={closeMenus}
            />
            <LegendContainer>
              <Legend>
                <Dot dotFill={theme.donut2primaryColor} />
                <H5 testID="this-month-total-qov">{`${qoV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${Localized(
                  'of',
                )} ${rank?.minimumQoV
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H5>
              </Legend>
              <Legend>
                <Dot dotFill={theme.donut2secondaryColor} />
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
          style={{ paddingTop: 12 }}
          accessibilityLabel="monthly comparrison personally enrolled"
          width="auto"
        >
          <H4 testID="personally-enrolled-donut-label">
            {Localized('Personally Active')}
          </H4>
          <DoubleDonut
            testID="personally-active-donut-svg"
            outerpercentage={rank.rankId === 1 ? 0 : paPerc}
            outermax={100}
            outercolor={theme.donut3primaryColor}
            innerpercentage={rank.rankId === 1 ? 0 : lastMonthPAPerc}
            innermax={100}
            innercolor={theme.donut3secondaryColor}
            view="rank"
            onPress={closeMenus}
          />
          <LegendContainer>
            <Legend>
              <Dot dotFill={theme.donut3primaryColor} />
              <H5 testID="this-month-personally-enrolled">{`${pa} ${Localized(
                'of',
              )} ${rank?.requiredPa}`}</H5>
            </Legend>
            <Legend>
              <Dot dotFill={theme.donut3secondaryColor} />
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
  closeMenus: PropTypes.func,
};

export default Rank;
