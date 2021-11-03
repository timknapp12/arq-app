import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MyAmbassadorExpandedInfo from './MyAmbassadorExpandedInfo';
import { CardContainer } from '../myTeamCard.styles';
import SwipeableZoom from '../SwipeableZoom';
import DownlineProfileInfo from '../DownlineProfileInfo';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import { findMembersInDownlineOneLevel } from '../../../../utils/teamView/filterDownline';
import MyCustomerCard from '../myCustomerCard/MyCustomerCard';

const MyAmbassadorCard = ({ member, nested, level }) => {
  const {
    sortBy,
    setLegacyAssociateId,
    setLevelInTree,
    currentMembersUplineId,
  } = useContext(MyTeamViewContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const { legacyAssociateId } = member?.associate;

  const toggleExpanded = () => setIsExpanded((state) => !state);

  const childData =
    sortBy === 'ORGANIZATION'
      ? member?.childTreeNodes
      : findMembersInDownlineOneLevel(
          member?.childTreeNodes ?? [],
          'AMBASSADOR',
        );

  const memberHasADownline = childData?.length > 0;

  const zoomIn = () => {
    setLegacyAssociateId(legacyAssociateId);
    setLevelInTree(level + 1);
  };

  const uplineLegacyId = nested
    ? member?.uplineTreeNode?.associate?.legacyAssociateId
    : currentMembersUplineId;

  const levelToIncrementOnZoomOut = nested ? level : level - 1;

  const zoomOut = () => {
    setLegacyAssociateId(uplineLegacyId);
    setLevelInTree(levelToIncrementOnZoomOut);
  };

  return (
    <>
      <SwipeableZoom
        level={level}
        memberHasADownline={memberHasADownline}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      >
        <CardContainer nested={nested}>
          <DownlineProfileInfo
            level={level + 1}
            member={member}
            isExpanded={isExpanded}
            onPress={toggleExpanded}
          />
          {isExpanded && <MyAmbassadorExpandedInfo member={member} />}
        </CardContainer>
      </SwipeableZoom>
      {!nested &&
        childData?.map((child) =>
          child?.associate?.associateType === 'AMBASSADOR' ? (
            <MyAmbassadorCard
              member={child}
              key={child?.associate?.associateId}
              nested
              level={level + 1}
            />
          ) : (
            <MyCustomerCard
              member={child}
              key={child?.associate?.associateId}
              nested
              level={level + 1}
            />
          ),
        )}
    </>
  );
};

MyAmbassadorCard.propTypes = {
  member: PropTypes.object.isRequired,
  nested: PropTypes.bool,
  level: PropTypes.number,
};

export default MyAmbassadorCard;
