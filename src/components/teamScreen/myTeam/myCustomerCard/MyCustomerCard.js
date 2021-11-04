import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableZoom from '../SwipeableZoom';
import DownlineProfileInfo from '../DownlineProfileInfo';
import { CardContainer } from '../myTeamCard.styles';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import MyCustomerExpandedInfo from './MyCustomerExpandedInfo';

// eslint-disable-next-line react/display-name
const MyCustomerCard = React.memo(({ member, nested, level }) => {
  const { setLegacyAssociateId, setLevelInTree, currentMembersUplineId } =
    useContext(MyTeamViewContext);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((state) => !state);

  const uplineLegacyId = nested
    ? member?.uplineTreeNode?.associate?.legacyAssociateId
    : currentMembersUplineId;

  const levelToIncrementOnZoomOut = nested ? level : level - 1;

  const zoomOut = () => {
    setLegacyAssociateId(uplineLegacyId);
    setLevelInTree(levelToIncrementOnZoomOut);
  };

  return (
    <SwipeableZoom
      level={level}
      memberHasADownline={false}
      zoomIn={() => {}}
      zoomOut={zoomOut}
    >
      <CardContainer nested={nested}>
        <DownlineProfileInfo
          member={member}
          isExpanded={isExpanded}
          onPress={toggleExpanded}
        />
        {isExpanded && <MyCustomerExpandedInfo member={member} />}
      </CardContainer>
    </SwipeableZoom>
  );
});

MyCustomerCard.propTypes = {
  member: PropTypes.object.isRequired,
  nested: PropTypes.bool,
  level: PropTypes.number,
};

export default MyCustomerCard;
