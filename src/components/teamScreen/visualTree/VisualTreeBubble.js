import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H6Secondary, LevelLabel } from '../../common';
import AppContext from '../../../contexts/AppContext';
import { filterMemberByStatusAndType } from '../../../utils/teamView/filterDownline';
import { LevelIndicator, Bubble } from './visualTree.styles';
import RankIcons from './RankIcons';
import VisualTreeBubbleStatBar from './VisualTreeBubbleStatBar';

const bubbleDiameter = 96;

const bubbleDimensions = {
  height: bubbleDiameter,
  width: bubbleDiameter,
  borderRadius: bubbleDiameter / 2,
  alignItems: 'center',
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

  return (
    <TouchableOpacity {...props}>
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
              width: 160,
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
            />
            <View style={{ height: 94 }} />
          </View>
        )}
      >
        <LinearGradient
          colors={[theme.disabledTextColor, theme.backgroundColor]}
          style={bubbleDimensions}
          start={{ x: 0.1, y: 0.1 }}
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
            {level ? (
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
  level: PropTypes.number.isRequired,
};

export default VisualTreeBubble;
