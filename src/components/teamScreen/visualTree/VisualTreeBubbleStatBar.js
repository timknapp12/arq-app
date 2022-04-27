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

const VisualTreeBubbleStatBar = ({ member }) => {
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

  return (
    <VisualTreeStatsBarCard
      style={
        Platform.OS === 'android' && {
          shadowColor: theme.primaryTextColor,
          elevation: 40,
        }
      }
    >
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
    </VisualTreeStatsBarCard>
  );
};

VisualTreeBubbleStatBar.propTypes = {
  member: PropTypes.object.isRequired,
};

export default VisualTreeBubbleStatBar;
