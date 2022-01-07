import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { BarContainer, Bar as ThemedBar } from '../myTeamCard.styles';

const AnimatedBar = Animated.createAnimatedComponent(ThemedBar);

const Bar = ({ color, value }) => {
  const barChartAnim = useRef(new Animated.Value(0)).current;

  const expand = () => {
    Animated.timing(barChartAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    expand();
  }, []);

  const calculateAnimationPercentage = (value) => {
    return value.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '1%'],
    });
  };

  return (
    <BarContainer>
      <AnimatedBar
        color={color}
        width={calculateAnimationPercentage(
          Animated.multiply(value, barChartAnim),
        )}
      />
    </BarContainer>
  );
};

Bar.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
export default Bar;
