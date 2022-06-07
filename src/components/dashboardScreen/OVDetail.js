import React, { useState, useEffect, useContext } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import * as Analytics from 'expo-firebase-analytics';
import { H4, Flexbox, QualifiedIcon, NotQualifiedIcon } from '../common';
import { Localized } from '../../translations/Localized';
import Slider from './Slider';
import Donut from './Donut';
import AppContext from '../../contexts/AppContext';
import DashboardScreenContext from '../../contexts/DashboardScreenContext';
import { calculateLegPercentages } from '../../utils/calculateLegPercentages';
import stringify from '../../utils/roundDownAndAddCommas/stringify';

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const OVDetail = () => {
  const { theme } = useContext(AppContext);
  const { closeMenus, user } = useContext(DashboardScreenContext);

  const initialRankName = user?.rank.name;
  const [rankName, setRankName] = useState(initialRankName);
  const initialRank = user?.rank;
  const [rank, setRank] = useState(initialRank);

  const [currentUserRankID] = useState(user?.rank.rankId);
  const [isQualified, setIsQualified] = useState(true);

  const [remainingQovLeg1, setRemainingQovLeg1] = useState(0);
  const [remainingQovLeg2, setRemainingQovLeg2] = useState(0);
  const [remainingQovLeg3, setRemainingQovLeg3] = useState(0);

  const [showRemainingQovLeg1, setShowRemainingQovLeg1] = useState(false);
  const [showRemainingQovLeg2, setShowRemainingQovLeg2] = useState(false);
  const [showRemainingQovLeg3, setShowRemainingQovLeg3] = useState(false);

  const initialMaxQOV = {
    leg1Max: user?.rank?.maximumPerLeg,
    leg2Max: user?.rank?.maximumPerLeg,
    leg3Max: user?.rank?.maximumPerLeg,
  };
  const [maxQOV, setMaxQOV] = useState(initialMaxQOV);

  useEffect(() => {
    const formattedName = rank.rankName.split(' ').join('_');
    Analytics.logEvent(`slider_set_to_${formattedName}_in_ov_detail`);
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
    // we have seen pv totals with decimals so we are rounding them up
    setRemainingQovLeg1(maximumPerLeg - Math.floor(leg1));
    setRemainingQovLeg2(maximumPerLeg - Math.floor(leg2));
    setRemainingQovLeg3(maximumPerLeg - Math.floor(leg3));
    if (leg1 > maximumPerLeg) {
      setShowRemainingQovLeg1(false);
    }
    if (leg2 > maximumPerLeg) {
      setShowRemainingQovLeg2(false);
    }
    if (leg3 > maximumPerLeg) {
      setShowRemainingQovLeg3(false);
    }
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
          isQualified={isQualified}
        />
        <H4>{`${Localized('Maximum QOV Per Leg')}: ${stringify(
          rank.maximumPerLeg,
        )}`}</H4>
        <Flexbox padding={20} width="100%" direction="row" justify="center">
          <Flexbox accessibilityLabel="Distributor leg one" width="auto">
            <TitleContainer>
              {isQualified || user.leg1 >= maxQOV.leg1Max ? (
                <QualifiedIcon />
              ) : (
                <NotQualifiedIcon />
              )}
              <H4 testID="leg-one-label" style={{ marginStart: 4 }}>
                {showRemainingQovLeg1
                  ? Localized('Leg 1 Remaining')
                  : Localized('Leg 1')}
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
              showTapIcon={user?.leg1 < rank?.maximumPerLeg}
              remainingQov={remainingQovLeg1}
              showRemainingQov={showRemainingQovLeg1}
              setShowRemainingQov={setShowRemainingQovLeg1}
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
                {showRemainingQovLeg2
                  ? Localized('Leg 2 Remaining')
                  : Localized('Leg 2')}
              </H4>
            </TitleContainer>
            <Donut
              testID="leg-two-donut-svg"
              percentage={user.leg2}
              max={isQualified ? user.leg2 : maxQOV.leg2Max}
              color={theme.donut2primaryColor}
              onPress={closeMenus}
              showTapIcon={user?.leg2 < rank?.maximumPerLeg}
              remainingQov={remainingQovLeg2}
              showRemainingQov={showRemainingQovLeg2}
              setShowRemainingQov={setShowRemainingQovLeg2}
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
              {showRemainingQovLeg3
                ? Localized('Leg 3 Remaining')
                : Localized('Leg 3')}
            </H4>
          </TitleContainer>
          <Donut
            testID="leg-three-donut-svg"
            percentage={user.leg3}
            max={isQualified ? user.leg3 : maxQOV.leg3Max}
            color={theme.donut3primaryColor}
            onPress={closeMenus}
            showTapIcon={user?.leg3 < rank?.maximumPerLeg}
            remainingQov={remainingQovLeg3}
            showRemainingQov={showRemainingQovLeg3}
            setShowRemainingQov={setShowRemainingQovLeg3}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

export default OVDetail;
