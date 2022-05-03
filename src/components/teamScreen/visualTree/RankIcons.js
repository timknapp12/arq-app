import React from 'react';
import PropTypes from 'prop-types';
import RankIcon from './RankIcon';
import { Row, RankPlaceholder } from './visualTree.styles';

const RankIcons = ({ member }) => {
  const isOVAmbassador = member?.ovRankName !== 'Ambassador';
  const isCVAmbassador = member?.cvRankName !== 'Ambassador';

  const AmbassadorOVRankIcon = () =>
    isOVAmbassador ? (
      <RankIcon rankName={member?.ovRankName ?? 'Ambassador'} />
    ) : (
      <RankPlaceholder />
    );
  const AmbassadorCVRankIcon = () =>
    isCVAmbassador ? (
      <RankIcon rankName={member?.cvRankName ?? 'Ambassador'} />
    ) : (
      <RankPlaceholder />
    );

  return (
    <Row>
      <AmbassadorOVRankIcon />
      <AmbassadorCVRankIcon />
    </Row>
  );
};

RankIcons.propTypes = {
  member: PropTypes.object.isRequired,
};

export default RankIcons;
