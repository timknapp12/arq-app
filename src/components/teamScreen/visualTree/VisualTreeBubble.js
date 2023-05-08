import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H6Secondary, H5 } from '../../common';
import AppContext from '../../../contexts/AppContext';
import {
  isWithinPlaceTime,
  filterMemberByStatusAndType,
  getAssociatesEligibleForPlacement,
} from '../../../utils/teamView/filterDownline';
import { LevelIndicator, Bubble, NumberToBePlaced } from './visualTree.styles';
import RankIcons from './RankIcons';
import VisualTreeBubbleStatBar from './VisualTreeBubbleStatBar';
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';

const bubbleDiameter = 96;

const bubbleStyle = {
  height: bubbleDiameter,
  width: bubbleDiameter,
  borderRadius: bubbleDiameter / 2,
  alignItems: 'center',
  overflow: 'hidden',
};

const VisualTreeBubble = ({
  member,
  onDragStart,
  onDragEnd,
  onDragDrop,
  payload,
  draggable,
  position = 'absolute',
  highlight,
  isDroppedItem,
  level,
  horizontalOffset,
  selected = false,
  isInPlacementContainer = false,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  const isEligibleForPlacement =
    isWithinPlaceTime(member?.dateSignedUp) &&
    member?.uplineId === member?.enrollerId;

  const associatesEligibleForPlacement =
    getAssociatesEligibleForPlacement(member);

  const numberToBePlaced = associatesEligibleForPlacement?.length || 0;

  const memberTypeColorMap = {
    activeAmbassador: theme.primaryButtonBackgroundColor,
    activePreferred: theme.customerAvatarAccent,
    activeRetail: theme.retailAvatarAccent,
    warning: theme.warningAvatarAccent,
    terminated: theme.alertAvatarAccent,
  };

  const [, color] = filterMemberByStatusAndType(
    { associate: member },
    memberTypeColorMap,
  );

  const accentColor =
    isEligibleForPlacement || isInPlacementContainer
      ? memberTypeColorMap.activeRetail
      : color;

  const gradientStart = Platform.OS === 'android' ? 0.02 : 0.1;
  const placementOffset = Platform.OS === 'android' ? -231 : -247;
  const baseVerticalOffset = isInPlacementContainer ? placementOffset : -107;
  const baseHorizontalOffset = -51;

  return (
    <TouchableOpacity {...props} activeOpacity={1}>
      <Bubble
        style={
          selected &&
          Platform.OS === 'android' && {
            shadowColor: theme.primaryTextColor,
            elevation: 40,
          }
        }
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragDrop={onDragDrop}
        payload={payload}
        draggable={draggable}
        draggingStyle={{ opacity: 0.3 }}
        position={position}
        highlight={highlight}
        isDroppedItem={isDroppedItem}
        selected={selected}
        renderHoverContent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: baseVerticalOffset,
              left: baseHorizontalOffset - (horizontalOffset ?? 0),
            }}
          >
            <VisualTreeBubbleStatBar
              member={member}
              showTimeclock={isInPlacementContainer || isEligibleForPlacement}
            />
            <VisualTreeBubble
              member={member}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragDrop={onDragDrop}
              payload={payload}
              draggable={draggable}
              position="relative"
              highlight
              isDroppedItem={isDroppedItem}
              level={level}
              horizontalOffset={horizontalOffset}
              isInPlacementContainer={isInPlacementContainer}
            />
          </View>
        )}
      >
        <View>
          <LinearGradient
            colors={[theme.disabledTextColor, theme.backgroundColor]}
            style={bubbleStyle}
            start={{ x: gradientStart, y: gradientStart }}
          >
            <View
              style={{
                alignItems: 'center',
                padding: 12,
              }}
            >
              <RankIcons member={member} />
              <H6Secondary style={{ fontSize: 12, textAlign: 'center' }}>
                {properlyCaseName(member?.firstName)}
              </H6Secondary>
              <H6Secondary style={{ fontSize: 12, textAlign: 'center' }}>
                {properlyCaseName(member?.lastName)}
              </H6Secondary>
            </View>
            {numberToBePlaced ? (
              <NumberToBePlaced>
                <H5>{numberToBePlaced}</H5>
              </NumberToBePlaced>
            ) : null}
            <LevelIndicator color={accentColor} />
          </LinearGradient>
        </View>
      </Bubble>
    </TouchableOpacity>
  );
};

VisualTreeBubble.propTypes = {
  member: PropTypes.object.isRequired,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragDrop: PropTypes.func,
  payload: PropTypes.any,
  draggable: PropTypes.bool.isRequired,
  position: PropTypes.string,
  highlight: PropTypes.bool,
  isDroppedItem: PropTypes.bool,
  level: PropTypes.number,
  horizontalOffset: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  isInPlacementContainer: PropTypes.bool,
};

export default VisualTreeBubble;
