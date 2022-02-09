import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H6Secondary, LevelLabel } from '../../common';
import AppContext from '../../../contexts/AppContext';
import { filterMemberByStatusAndType } from '../../../utils/teamView/filterDownline';
import {
  ActivityBadge,
  LevelIndicator,
  InnerCircle,
} from './visualTree.styles';

const innerCircleDiameter = 96;

const innerCircleDimensions = {
  height: innerCircleDiameter,
  width: innerCircleDiameter,
  borderRadius: innerCircleDiameter / 2,
  paddingTop: 4,
  justifyContent: 'space-around',
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
  isBeingDragged,
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
      <InnerCircle
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragDrop={onDragDrop}
        payload={payload}
        draggable={draggable}
        draggingStyle={{ opacity: 0.3 }}
        position={position}
        highlight={isBeingDragged}
      >
        <LinearGradient
          colors={[theme.disabledTextColor, theme.backgroundColor]}
          style={innerCircleDimensions}
          start={{ x: 0.1, y: 0.1 }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <ActivityBadge />
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
      </InnerCircle>
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
  isBeingDragged: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
};

export default VisualTreeBubble;
