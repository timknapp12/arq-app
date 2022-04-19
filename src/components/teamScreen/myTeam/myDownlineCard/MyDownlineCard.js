import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MyAmbassadorExpandedInfo from './MyAmbassadorExpandedInfo';
import { CardContainer } from '../myTeamCard.styles';
import SwipeableZoom from '../SwipeableZoom';
import DownlineProfileInfoContainer from '../DownlineProfileInfoContainer';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import TeamScreenContext from '../../../../contexts/TeamScreenContext';
import { findMembersInDownlineOneLevel } from '../../../../utils/teamView/filterDownline';
import MyCustomerExpandedInfo from './MyCustomerExpandedInfo';

// eslint-disable-next-line react/display-name
const MyDownlineCard = React.memo(
  ({ autoExpand = false, member, nested, level }) => {
    const { currentMembersUplineId, closeAllMenus, isFilterMenuOpen } =
      useContext(MyTeamViewContext);
    const { sortBy, setLegacyAssociateId, setLevelInTree, viewInVisualTree } =
      useContext(TeamScreenContext);

    const [isExpanded, setIsExpanded] = useState(autoExpand);

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

    const ExpandedInfo = ({ ...props }) =>
      member?.associate?.associateType === 'AMBASSADOR' ? (
        <MyAmbassadorExpandedInfo {...props} />
      ) : (
        <MyCustomerExpandedInfo {...props} />
      );

    return (
      <>
        <SwipeableZoom
          level={level}
          memberHasADownline={memberHasADownline}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
        >
          <CardContainer nested={nested}>
            <DownlineProfileInfoContainer
              level={level + 1}
              member={member}
              isExpanded={isExpanded}
              onPress={toggleExpanded}
              closeAllMenus={closeAllMenus}
              showVisualTreeIcon
              viewItemInVisualTree={() => viewInVisualTree(member)}
              isFilterMenuOpen={isFilterMenuOpen}
            />
            {isExpanded && <ExpandedInfo member={member} level={level + 1} />}
          </CardContainer>
        </SwipeableZoom>
        {!nested &&
          childData?.map((child) => (
            <MyDownlineCard
              member={child}
              key={child?.associate?.associateId}
              nested
              level={level + 1}
            />
          ))}
      </>
    );
  },
);

MyDownlineCard.propTypes = {
  autoExpand: PropTypes.bool,
  member: PropTypes.object.isRequired,
  nested: PropTypes.bool,
  level: PropTypes.number,
};

export default MyDownlineCard;
