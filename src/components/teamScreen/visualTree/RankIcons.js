import React from 'react';
import PropTypes from 'prop-types';
import RankIcon from './RankIcon';
import { RankIconsContainer, RankPlaceholder } from './visualTree.styles';

const RankIcons = ({ member }) => {
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

  return (
    <RankIconsContainer>
      <AmbassadorOVRankIcon />
      <AmbassadorCVRankIcon />
    </RankIconsContainer>
  );
};

RankIcons.propTypes = {
  member: PropTypes.object.isRequired,
};

export default RankIcons;
