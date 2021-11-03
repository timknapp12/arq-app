import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ZoomInIcon from '../../../../assets/icons/icZoomIn.svg';
import ZoomOutIcon from '../../../../assets/icons/icZoomOut.svg';
import {
  ZoomContainer,
  ZoomInTouchableOpacity,
  ZoomOutTouchableOpacity,
} from './myTeamCard.styles';

const SwipeableZoom = ({
  children,
  level,
  memberHasADownline,
  zoomIn,
  zoomOut,
}) => {
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
      <ZoomContainer>
        <ZoomInTouchableOpacity disabled={!memberHasADownline} onPress={zoomIn}>
          <Animated.View style={[transformStyle]}>
            <ZoomInIcon />
          </Animated.View>
        </ZoomInTouchableOpacity>
        <ZoomOutTouchableOpacity disabled={level === 0} onPress={zoomOut}>
          <Animated.View style={[transformStyle]}>
            <ZoomOutIcon />
          </Animated.View>
        </ZoomOutTouchableOpacity>
      </ZoomContainer>
    );
  };

  return (
    <Swipeable overshootRight={false} renderRightActions={RenderRight}>
      {children}
    </Swipeable>
  );
};

SwipeableZoom.propTypes = {
  children: PropTypes.any.isRequired,
  level: PropTypes.number,
  memberHasADownline: PropTypes.bool,
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
};

export default SwipeableZoom;
