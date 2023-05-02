import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { H6Secondary, Gap } from '../../common';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import RankIcon from './RankIcon';
import { BarContainer, Bar } from '../../teamScreen/myTeam/myTeamCard.styles';
import {
  VisualTreeStatsBarCard,
  Row,
  RankPlaceholder,
} from './visualTree.styles';
import {
  findRequiredValueOfNextRank,
  getPercentage,
} from '../../../utils/teamView/calculateBasedOnNextRank';
import stringify from '../../../utils/roundDownAndAddCommas/stringify';
import { Localized } from '../../../translations/Localized';
import { Platform } from 'react-native';
import {
  getDiffInDays,
  getLastDayOfNextMonth,
} from '../../../utils/executiveTimeclock/executiveTimeclock';

const VisualTreeBubbleStatBar = ({ member, isInPlacementContainer }) => {
  const { theme } = useContext(AppContext);
  const { ranks } = useContext(LoginContext);

  const isOVAmbassador = member?.ovRankName !== 'Ambassador';
  const isCVAmbassador = member?.cvRankName !== 'Ambassador';

  const AmbassadorOVRankIcon = () =>
    isOVAmbassador ? (
      <RankIcon rankName={member?.ovRankName} />
    ) : (
      <RankPlaceholder />
    );
  const AmbassadorCVRankIcon = () =>
    isCVAmbassador ? (
      <RankIcon rankName={member?.cvRankName} />
    ) : (
      <RankPlaceholder />
    );

  const requiredCvForNextRank = findRequiredValueOfNextRank(
    member?.cvRankId,
    ranks,
    'minimumQoV',
  );
  const ovWidth = member?.ov > 0 ? '100%' : '0%';
  const cvWidth = getPercentage(member?.cv, requiredCvForNextRank);

  // PLACEMENT DAYS
  console.log('member?.dateSignedUp', member?.dateSignedUp);
  const dateSignedUp = member?.dateSignedUp;
  const placementDiffInDays = getDiffInDays(dateSignedUp);

  console.log('placementDiffInDays', placementDiffInDays);
  const placementMax = 7;
  // show how many days left
  const daysLeftToPlace = placementMax - placementDiffInDays;
  console.log('daysLeftToPlace', daysLeftToPlace);
  // show percentage
  const placementWidth = getPercentage(daysLeftToPlace, placementMax);

  // EXECUTIVE TIMECLOCK
  const executiveDeadline = getLastDayOfNextMonth(dateSignedUp);
  const daysLeftToExecutive = getDiffInDays(new Date(), executiveDeadline);
  console.log('daysLeftToExecutive', daysLeftToExecutive);
  const executiveMax = getDiffInDays(dateSignedUp, executiveDeadline);
  console.log('executiveMax', executiveMax);

  const executiveWidth = getPercentage(daysLeftToExecutive, executiveMax);
  console.log('executiveWidth', executiveWidth);
  // days left to executive is backwards
  return (
    <VisualTreeStatsBarCard
      style={
        Platform.OS === 'android' && {
          shadowColor: theme.primaryTextColor,
          elevation: 40,
        }
      }
    >
      {isInPlacementContainer ? (
        <>
          <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
            'Days to place',
          )}: ${stringify(member?.ov)}`}</H6Secondary>
          <Gap height="4px" />
          <BarContainer>
            <Bar width={placementWidth} color={theme.donut1primaryColor} />
          </BarContainer>

          <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
            'Executive Timeclock',
          )}: ${stringify(member?.ov)}`}</H6Secondary>
          <Gap height="4px" />
          <BarContainer>
            <Bar width={executiveWidth} color={theme.donut1primaryColor} />
          </BarContainer>
        </>
      ) : (
        <>
          <Row>
            <AmbassadorOVRankIcon />
            <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
              'Total OV',
            )}: ${stringify(member?.ov)}`}</H6Secondary>
          </Row>
          <Gap height="4px" />
          <BarContainer>
            <Bar width={ovWidth} color={theme.donut1primaryColor} />
          </BarContainer>
          <Gap height="4px" />
          <Row>
            <AmbassadorCVRankIcon />
            <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
              'Total CV',
            )}: ${stringify(member?.cv)}`}</H6Secondary>
          </Row>
          <Gap height="4px" />
          <BarContainer>
            <Bar width={`${cvWidth}%`} color={theme.donut3primaryColor} />
          </BarContainer>
        </>
      )}
    </VisualTreeStatsBarCard>
  );
};

VisualTreeBubbleStatBar.propTypes = {
  member: PropTypes.object.isRequired,
  isInPlacementContainer: PropTypes.bool,
};

export default VisualTreeBubbleStatBar;
