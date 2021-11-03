import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MyAmbassadorExpandedInfo from './MyAmbassadorExpandedInfo';
import {
  CardContainer,
  ZoomContainer,
  ZoomInTouchableOpacity,
  ZoomOutTouchableOpacity,
} from '../myTeamCard.styles';
import ZoomInIcon from '../../../../../assets/icons/icZoomIn.svg';
import ZoomOutIcon from '../../../../../assets/icons/icZoomOut.svg';
import DownlineProfileInfo from '../DownlineProfileInfo';
import MyTeamViewContext from '../../../../contexts/MyTeamViewContext';
import { findMembersInDownlineOneLevel } from '../../../../utils/teamView/filterDownline';

const MyAmbassadorCard = ({ member, nested, level }) => {
  const { setLegacyAssociateId, setLevelInTree, currentMembersUplineId } =
    useContext(MyTeamViewContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const { legacyAssociateId } = member?.associate;

  const toggleExpanded = () => setIsExpanded((state) => !state);

  // const childData = findMembersInDownlineOneLevel(
  //   member?.childTreeNodes ?? [],
  //   'AMBASSADOR',
  // );
  console.log(`findMembersInDownlineOneLevel`, findMembersInDownlineOneLevel);
  const childData = member?.childTreeNodes;

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

  const memberHasADownline = member?.childTreeNodes?.length > 0;

  // https://snack.expo.dev/@adamgrzybowski/react-native-gesture-handler-demo?
  const RenderRight = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-70, 0.5],
      outputRange: [1, 0.5],
    });
    const transformStyle = {
      transform: [{ scale }],
    };
    return (
      <>
        <ZoomContainer>
          <ZoomInTouchableOpacity
            disabled={!memberHasADownline}
            onPress={zoomIn}
          >
            <Animated.View style={[transformStyle]}>
              <ZoomInIcon />
            </Animated.View>
          </ZoomInTouchableOpacity>
          <ZoomOutTouchableOpacity disabled={level === 1} onPress={zoomOut}>
            <Animated.View style={[transformStyle]}>
              <ZoomOutIcon />
            </Animated.View>
          </ZoomOutTouchableOpacity>
        </ZoomContainer>
      </>
    );
  };

  return (
    <>
      <Swipeable overshootRight={false} renderRightActions={RenderRight}>
        <CardContainer nested={nested}>
          <DownlineProfileInfo
            level={level}
            member={member}
            isExpanded={isExpanded}
            onPress={toggleExpanded}
          />
          {isExpanded && <MyAmbassadorExpandedInfo member={member} />}
        </CardContainer>
      </Swipeable>
      {!nested &&
        childData?.map((child) => (
          <MyAmbassadorCard
            member={child}
            key={child?.associate?.associateId}
            nested
            level={level + 1}
          />
        ))}
    </>
  );
};

MyAmbassadorCard.propTypes = {
  member: PropTypes.object.isRequired,
  nested: PropTypes.bool,
  level: PropTypes.number,
};

export default MyAmbassadorCard;
