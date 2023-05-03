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

  // the full width for <Bar/> should be 100, but is not working for some reason for placement suite and executive timeclock
  // so the following adjusts it to 186 so the percentages show accurately
  const adjustedFullWidth = 186 / 100;
  // PLACEMENT DAYS
  const dateSignedUp = member?.dateSignedUp;
  const placementDiffInDays = getDiffInDays(dateSignedUp);
  const placementMax = 7;
  const daysLeftToPlace = placementMax - placementDiffInDays;
  const transpiredPDays = placementMax - daysLeftToPlace;
  const placementWidth =
    getPercentage(transpiredPDays, placementMax) * adjustedFullWidth;

  // EXECUTIVE TIMECLOCK
  const executiveDeadline = getLastDayOfNextMonth(dateSignedUp);
  const daysLeftToExecutive = getDiffInDays(new Date(), executiveDeadline);
  const executiveMax = getDiffInDays(dateSignedUp, executiveDeadline);
  const transpiredEDays = executiveMax - daysLeftToExecutive;
  const executiveWidth =
    getPercentage(transpiredEDays, executiveMax) * adjustedFullWidth;

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
          )}: ${daysLeftToPlace}`}</H6Secondary>
          <Gap height="4px" />
          <BarContainer>
            <Bar width={placementWidth} color={theme.donut1primaryColor} />
          </BarContainer>

          <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
            'Executive Timeclock',
          )}: ${daysLeftToExecutive}`}</H6Secondary>
          <Gap height="4px" />
          <BarContainer>
            <Bar width={executiveWidth} color={theme.donut3primaryColor} />
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
