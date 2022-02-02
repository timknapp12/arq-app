import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H6Secondary } from '../../common';
import AppContext from '../../../contexts/AppContext';
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
  item,
  onDragStart,
  onDragEnd,
  onDragDrop,
  payload,
  draggable,
  position = 'absolute',
  isBeingDragged,
  ...props
}) => {
  const { theme } = useContext(AppContext);

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
              {item?.firstName}
            </H6Secondary>
            <H6Secondary style={{ fontSize: 12 }}>{item?.lastName}</H6Secondary>
          </View>
          <LevelIndicator />
        </LinearGradient>
      </InnerCircle>
    </TouchableOpacity>
  );
};

VisualTreeBubble.propTypes = {
  item: PropTypes.object.isRequired,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragDrop: PropTypes.func,
  payload: PropTypes.any,
  draggable: PropTypes.bool.isRequired,
  position: PropTypes.string,
  isBeingDragged: PropTypes.bool.isRequired,
};

export default VisualTreeBubble;
