import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { H6Secondary, Gap } from '../../common';
import { BarContainer, Bar } from '../../teamScreen/myTeam/myTeamCard.styles';
import { getPercentage } from '../../../utils/teamView/calculateBasedOnNextRank';
import {
  getDiffInDays,
  getLastDayOfNextMonth,
} from '../../../utils/executiveTimeclock/executiveTimeclock';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';

const PlacementStatBar = ({ member }) => {
  const { theme, deviceLanguage } = useContext(AppContext);

  // PLACEMENT DAYS
  const dateSignedUp = member?.dateSignedUp;
  const placementDiffInDays = getDiffInDays(dateSignedUp);
  const placementMax = 7;
  const daysLeftToPlace = placementMax - placementDiffInDays;
  const transpiredPDays = placementMax - daysLeftToPlace;
  const placementWidth = getPercentage(transpiredPDays, placementMax);
  const placementMidWidth = placementWidth < 5 ? '5%' : `${placementWidth}%`;

  // EXECUTIVE TIMECLOCK
  const executiveDeadline = getLastDayOfNextMonth(dateSignedUp);
  const daysLeftToExecutive = getDiffInDays(new Date(), executiveDeadline);
  const executiveMax = getDiffInDays(dateSignedUp, executiveDeadline);
  const transpiredEDays = executiveMax - daysLeftToExecutive;
  const executiveWidth = getPercentage(transpiredEDays, executiveMax);
  const execMinWidth = executiveWidth < 5 ? '5%' : `${executiveWidth}%`;

  const displayDate = getLocalDate(executiveDeadline, deviceLanguage).substring(
    0,
    5,
  );
  return (
    <>
      <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
        'Days to place',
      )}: ${daysLeftToPlace}`}</H6Secondary>
      <Gap height="4px" />
      <BarContainer>
        <Bar width={placementMidWidth} color={theme.donut1primaryColor} />
      </BarContainer>

      <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
        'Executive Timeclock',
      )}: ${displayDate}`}</H6Secondary>
      <Gap height="4px" />
      <BarContainer>
        <Bar width={execMinWidth} color={theme.donut3primaryColor} />
      </BarContainer>
    </>
  );
};

PlacementStatBar.propTypes = {
  member: PropTypes.object.isRequired,
};

export default PlacementStatBar;
