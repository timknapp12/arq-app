import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Components
import {
  H6Secondary,
  Gap,
  H5Secondary,
  Flexbox,
  PrimaryButtonSmall,
} from '../../common';
import { BarContainer, Bar } from '../../teamScreen/myTeam/myTeamCard.styles';
import { PlacementCard } from './visualTree.styles';
// Utils
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';
import { getPercentage } from '../../../utils/teamView/calculateBasedOnNextRank';
import {
  getDiffInDays,
  getLastDayOfNextMonth,
} from '../../../utils/executiveTimeclock/executiveTimeclock';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';
import { Localized } from '../../../translations/Localized';
// Context
import AppContext from '../../../contexts/AppContext';

const PlacementMember = ({
  member,
  setIsPlacementConfirmModalOpen,
  setSelectedPlacementEnrolee,
  ...props
}) => {
  const { theme, deviceLanguage } = useContext(AppContext);

  const name = properlyCaseName(member?.firstName, member?.lastName);

  // PLACEMENT DAYS
  const dateSignedUp = member?.dateSignedUp;
  const placementDiffInDays = getDiffInDays(dateSignedUp);
  const placementMax = 7;
  const daysLeftToPlace = placementMax - placementDiffInDays;
  const transpiredPDays = placementMax - daysLeftToPlace;
  const placementWidth = `${getPercentage(transpiredPDays, placementMax)}%`;

  // EXECUTIVE TIMECLOCK
  const executiveDeadline = getLastDayOfNextMonth(dateSignedUp);
  const daysLeftToExecutive = getDiffInDays(new Date(), executiveDeadline);
  const executiveMax = getDiffInDays(dateSignedUp, executiveDeadline);
  const transpiredEDays = executiveMax - daysLeftToExecutive;
  const executiveWidth = `${getPercentage(transpiredEDays, executiveMax)}%`;

  const displayDate = getLocalDate(executiveDeadline, deviceLanguage).substring(
    0,
    5,
  );

  const { associateId, firstName = '', lastName = '' } = member;
  const data = {
    associateId,
    name: `${firstName} ${lastName}`,
  };
  const onPlace = () => {
    setSelectedPlacementEnrolee(data);
    setIsPlacementConfirmModalOpen(true);
  };

  return (
    <PlacementCard {...props}>
      <Flexbox>
        <H5Secondary>{name}</H5Secondary>
      </Flexbox>
      <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
        'Days to place',
      )}: ${daysLeftToPlace}`}</H6Secondary>
      <Gap height="4px" />
      <BarContainer>
        <Bar width={placementWidth} color={theme.donut1primaryColor} />
      </BarContainer>
      <Gap height="8px" />
      <H6Secondary style={{ marginStart: 6 }}>{`${Localized(
        'Executive Timeclock',
      )}: ${displayDate}`}</H6Secondary>
      <Gap height="4px" />
      <BarContainer>
        <Bar width={executiveWidth} color={theme.donut3primaryColor} />
      </BarContainer>
      <Gap height="12px" />
      <PrimaryButtonSmall onPress={onPlace}>
        {Localized('Place').toUpperCase()}
      </PrimaryButtonSmall>
      <Gap height="8px" />
    </PlacementCard>
  );
};

PlacementMember.propTypes = {
  member: PropTypes.object.isRequired,
  setIsPlacementConfirmModalOpen: PropTypes.func.isRequired,
  setSelectedPlacementEnrolee: PropTypes.func.isRequired,
};

export default PlacementMember;
