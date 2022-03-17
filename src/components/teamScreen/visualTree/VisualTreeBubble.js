import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H6Secondary, LevelLabel } from '../../common';
import AppContext from '../../../contexts/AppContext';
import { filterMemberByStatusAndType } from '../../../utils/teamView/filterDownline';
import { LevelIndicator, Bubble } from './visualTree.styles';
import RankIcons from './RankIcons';
import VisualTreeBubbleStatBar from './VisualTreeBubbleStatBar';

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
  contentOffsetX,
  ...props
}) => {
  const { theme } = useContext(AppContext);

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

  const gradientStart = Platform.OS === 'android' ? 0.02 : 0.1;
  const verticalOffset = -107;
  const baseHorizontalOffset = -57;

  return (
    <TouchableOpacity {...props} activeOpacity={1}>
      <Bubble
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragDrop={onDragDrop}
        payload={payload}
        draggable={draggable}
        draggingStyle={{ opacity: 0.3 }}
        position={position}
        highlight={highlight}
        isDroppedItem={isDroppedItem}
        renderHoverContent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: verticalOffset,
              left: baseHorizontalOffset - (contentOffsetX ?? 0),
            }}
          >
            <VisualTreeBubbleStatBar member={member} />
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
              contentOffsetX={contentOffsetX}
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
              <H6Secondary style={{ fontSize: 12 }}>
                {member?.firstName}
              </H6Secondary>
              <H6Secondary style={{ fontSize: 12 }}>
                {member?.lastName}
              </H6Secondary>
            </View>
            <LevelIndicator color={color}>
              {level && level > 0 ? (
                <LevelLabel
                  style={{
                    fontSize: 16,
                    color:
                      color === theme.warningAvatarAccent
                        ? theme.backgroundColor
                        : theme.primaryTextColor,
                  }}
                >
                  {level}
                </LevelLabel>
              ) : null}
            </LevelIndicator>
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
  contentOffsetX: PropTypes.number.isRequired,
};

export default VisualTreeBubble;
