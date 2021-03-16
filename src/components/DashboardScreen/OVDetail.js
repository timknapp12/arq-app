import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import {
  H4Bold,
  H4,
  Flexbox,
  QualifiedIcon,
  NotQualifiedIcon,
} from '../Common';
import { Localized, initLanguage } from '../../Translations/Localized';
import Slider from './Slider';
import Donut from './Donut';
import {
  donut1PrimaryColor,
  donut2PrimaryColor,
  donut3PrimaryColor,
} from '../../Styles/colors';
import { calculateLegPercentages } from '../../Utils/calculateLegPercentages';

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ChartTitle = styled(H4Bold)`
  color: ${(props) => props.theme.secondaryTextColor};
`;

const OVDetail = ({ ranklist, fadeOut, user }) => {
  initLanguage();
  const initialRankName = user?.currentRank.name;
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = user?.currentRank;
  const [rank, setRank] = useState(initialRank);

  const [currentUserRankID] = useState(user?.currentRank.id);
  const [isQualified, setIsQualified] = useState(true);

  const initialMaxQOV = {
    leg1Max: user?.currentRank?.legMaxOV,
    leg2Max: user?.currentRank?.legMaxOV,
    leg3Max: user?.currentRank?.legMaxOV / 2,
  };
  const [maxQOV, setMaxQOV] = useState(initialMaxQOV);

  useEffect(() => {
    if (currentUserRankID >= rank.id) {
      setIsQualified(true);
    } else {
      setIsQualified(false);
    }
    return () => {
      setIsQualified(true);
    };
  }, [rank]);

  useEffect(() => {
    const { legMaxPerc, requiredQOV, legMaxOV } = rank;
    const { leg1OV, leg2OV, leg3OV } = user;
    const userLegs = { leg1OV, leg2OV, leg3OV };
    const requirements = { legMaxPerc, requiredQOV, legMaxOV };
    setMaxQOV(calculateLegPercentages(userLegs, requirements));
    return () => {
      setMaxQOV(initialMaxQOV);
    };
  }, [rank, user]);

  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <Flexbox onStartShouldSetResponder={() => true} width="100%">
        <Slider
          rankName={rankName}
          setRankName={setRankName}
          rank={rank}
          setRank={setRank}
          ranklist={ranklist}
          isQualified={isQualified}
        />
        <H4>{`${Localized(
          'Maximum QOV Per Leg',
        )}: ${rank.legMaxOV.toLocaleString()}`}</H4>
        <Flexbox padding={20} width="100%" direction="row">
          <Flexbox accessibilityLabel="Distributor leg one" width="auto">
            <TitleContainer>
              {isQualified || user.leg1OV >= maxQOV.leg1Max ? (
                <QualifiedIcon />
              ) : (
                <NotQualifiedIcon />
              )}
              <ChartTitle testID="leg-one-label" style={{ marginStart: 4 }}>
                {Localized('Leg 1')}
              </ChartTitle>
            </TitleContainer>
            <Donut
              testID="leg-one-donut-svg"
              percentage={user.leg1OV}
              // Ternary as a safety check, in case the calculations for % are wrong -
              // the circle should always be full if the user is qualified for any certain level
              max={isQualified ? user.leg1OV : maxQOV.leg1Max}
              color={donut1PrimaryColor}
            />
          </Flexbox>

          <Flexbox accessibilityLabel="Distributor leg two" width="auto">
            <TitleContainer>
              {isQualified || user.leg2OV >= maxQOV.leg2Max ? (
                <QualifiedIcon />
              ) : (
                <NotQualifiedIcon />
              )}
              <ChartTitle testID="leg-two-label" style={{ marginStart: 4 }}>
                {Localized('Leg 2')}
              </ChartTitle>
            </TitleContainer>
            <Donut
              testID="leg-two-donut-svg"
              percentage={user.leg2OV}
              max={isQualified ? user.leg2OV : maxQOV.leg2Max}
              color={donut2PrimaryColor}
            />
          </Flexbox>
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor leg three" width="auto">
          <TitleContainer>
            {isQualified || user.leg3OV >= maxQOV.leg3Max ? (
              <QualifiedIcon />
            ) : (
              <NotQualifiedIcon />
            )}
            <ChartTitle testID="leg-three-label" style={{ marginStart: 4 }}>
              {Localized('Leg 3')}
            </ChartTitle>
          </TitleContainer>
          <Donut
            testID="leg-three-donut-svg"
            percentage={user.leg3OV}
            max={isQualified ? user.leg3OV : maxQOV.leg3Max}
            color={donut3PrimaryColor}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

OVDetail.propTypes = {
  ranklist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      requiredPV: PropTypes.number,
      requiredQOV: PropTypes.number,
      legMaxPerc: PropTypes.number,
      legMaxOV: PropTypes.number,
    }),
  ),
  fadeOut: PropTypes.func,
  user: PropTypes.object,
};

export default OVDetail;
