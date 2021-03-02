import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
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

const Rank = ({ ranklist, user, fadeOut }) => {
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
    requiredPV: 100,
    requiredQOV: 600,
    requiredPA: 2,
    name: Localized('pro'),
  };
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
    const { thisMonthPV, thisMonthOV, thisMonthPA } = user;
    const { requiredPV, requiredQOV, requiredPA } = rank;
    validateQualification(
      thisMonthPV,
      thisMonthOV,
      thisMonthPA,
      requiredPV,
      requiredQOV,
      requiredPA,
    );
  }, [user, rank]);

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
              outerpercentage={rank.id === 0 ? 100 : thisMonthPV}
              outermax={rank.id === 0 ? 100 : rank.requiredPV}
              outercolor={pacificBlue}
              innerpercentage={rank.id === 0 ? 100 : lastMonthPV}
              innermax={rank.id === 0 ? 100 : rank.requiredPV}
              innercolor={mayaBlue}
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={pacificBlue} />
                <H5 testID="this-month-total-pv">{`${thisMonthPV} ${Localized(
                  'of',
                )} ${rank?.requiredPV}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={mayaBlue} />
                <H5 testID="last-month-total-pv">{`${lastMonthPV} ${Localized(
                  'of',
                )} ${rank?.requiredPV}`}</H5>
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
              outermax={rank.id === 0 ? 100 : rank.requiredQOV}
              outercolor={darkViolet}
              innerpercentage={rank.id === 0 ? 100 : lastMonthOV}
              innermax={rank.id === 0 ? 100 : rank.requiredQOV}
              innercolor={heliotrope}
            />
            <LegendContainer>
              <Legend>
                <Square squareFill={darkViolet} />
                <H5 testID="this-month-total-qov">{`${thisMonthOV} ${Localized(
                  'of',
                )} ${rank?.requiredQOV}`}</H5>
              </Legend>
              <Legend>
                <Square squareFill={heliotrope} />
                <H5 testID="last-month-total-qov">{`${lastMonthOV} ${Localized(
                  'of',
                )} ${rank?.requiredQOV}`}</H5>
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
            outermax={rank.requiredPA}
            outercolor="yellow"
            innerpercentage={lastMonthPA}
            innermax={rank.requiredPA}
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
