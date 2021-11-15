import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { H4, Flexbox, QualifiedIcon, NotQualifiedIcon } from '../common';
import { Localized } from '../../translations/Localized';
import Slider from './Slider';
import Donut from './Donut';
import AppContext from '../../contexts/AppContext';
import { calculateLegPercentages } from '../../utils/calculateLegPercentages';

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const OVDetail = ({ ranklist, closeMenus, user }) => {
  const { theme } = useContext(AppContext);

  const initialRankName = user?.rank.name;
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = user?.rank;
  const [rank, setRank] = useState(initialRank);

  const [currentUserRankID] = useState(user?.rank.rankId);
  const [isQualified, setIsQualified] = useState(true);

  const initialMaxQOV = {
    leg1Max: user?.rank?.maximumPerLeg,
    leg2Max: user?.rank?.maximumPerLeg,
    leg3Max: user?.rank?.maximumPerLeg / 2,
  };
  const [maxQOV, setMaxQOV] = useState(initialMaxQOV);

  useEffect(() => {
    if (currentUserRankID >= rank.rankId) {
      setIsQualified(true);
    } else {
      setIsQualified(false);
    }
    return () => {
      setIsQualified(true);
    };
  }, [rank]);

  useEffect(() => {
    const { legMaxPercentage, minimumQoV, maximumPerLeg } = rank;
    const { leg1, leg2, leg3 } = user;
    const userLegs = { leg1, leg2, leg3 };
    const requirements = { legMaxPercentage, minimumQoV, maximumPerLeg };
    setMaxQOV(calculateLegPercentages(userLegs, requirements));
    return () => {
      setMaxQOV(initialMaxQOV);
    };
  }, [rank, user]);

  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <Flexbox onStartShouldSetResponder={() => true} width="100%">
        <Slider
          rankName={rankName}
          setRankName={setRankName}
          rank={rank}
          setRank={setRank}
          ranklist={ranklist}
          isQualified={isQualified}
        />
        <H4>{`${Localized('Maximum QOV Per Leg')}: ${rank.maximumPerLeg
          // this adds commas, since toLocalString() does not work on android
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</H4>
        <Flexbox padding={20} width="100%" direction="row" justify="center">
          <Flexbox accessibilityLabel="Distributor leg one" width="auto">
            <TitleContainer>
              {isQualified || user.leg1 >= maxQOV.leg1Max ? (
                <QualifiedIcon />
              ) : (
                <NotQualifiedIcon />
              )}
              <H4 testID="leg-one-label" style={{ marginStart: 4 }}>
                {Localized('Leg 1')}
              </H4>
            </TitleContainer>
            <Donut
              testID="leg-one-donut-svg"
              percentage={user.leg1}
              // Ternary as a safety check, in case the calculations for % are wrong -
              // the circle should always be full if the user is qualified for any certain level
              max={isQualified ? user.leg1 : maxQOV.leg1Max}
              color={theme.donut1primaryColor}
              onPress={closeMenus}
            />
          </Flexbox>

          <Flexbox accessibilityLabel="Distributor leg two" width="auto">
            <TitleContainer>
              {isQualified || user.leg2 >= maxQOV.leg2Max ? (
                <QualifiedIcon />
              ) : (
                <NotQualifiedIcon />
              )}
              <H4 testID="leg-two-label" style={{ marginStart: 4 }}>
                {Localized('Leg 2')}
              </H4>
            </TitleContainer>
            <Donut
              testID="leg-two-donut-svg"
              percentage={user.leg2}
              max={isQualified ? user.leg2 : maxQOV.leg2Max}
              color={theme.donut2primaryColor}
              onPress={closeMenus}
            />
          </Flexbox>
        </Flexbox>

        <Flexbox accessibilityLabel="Distributor leg three" width="auto">
          <TitleContainer>
            {isQualified || user.leg3 >= maxQOV.leg3Max ? (
              <QualifiedIcon />
            ) : (
              <NotQualifiedIcon />
            )}
            <H4 testID="leg-three-label" style={{ marginStart: 4 }}>
              {Localized('Leg 3')}
            </H4>
          </TitleContainer>
          <Donut
            testID="leg-three-donut-svg"
            percentage={user.leg3}
            max={isQualified ? user.leg3 : maxQOV.leg3Max}
            color={theme.donut3primaryColor}
            onPress={closeMenus}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

OVDetail.propTypes = {
  ranklist: PropTypes.arrayOf(
    PropTypes.shape({
      rankId: PropTypes.number,
      rankName: PropTypes.string,
      requiredPv: PropTypes.number,
      minimumQoV: PropTypes.number,
      legMaxPercentage: PropTypes.number,
      maximumPerLeg: PropTypes.number,
    }),
  ),
  closeMenus: PropTypes.func,
  user: PropTypes.object,
};

export default OVDetail;
