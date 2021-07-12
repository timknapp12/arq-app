import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

// source for donut svg: https://www.youtube.com/watch?v=x2LtzCxbWI0

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut = ({
  percentage = 75,
  radius = 80,
  strokeWidth = 14,
  duration = 1000,
  color,
  delay = 0,
  max = 100,
  fontSize = 24,
  showPercentageSymbol = false,
  view,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    // to ensure the max is not zero
    const nonZeroMax = max === 0 ? 1 : max;
    // to ensure percentage is not greater than 100%
    const filteredPercentage = percentage > max ? max : percentage;
    // const nonZeroPercentage = filteredPercentage === 0 ? 1 : filteredPercentage;
    animation(filteredPercentage);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / nonZeroMax;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;

        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)
            // this adds commas, since toLocalString() does not work on android
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${
            showPercentageSymbol ? '%' : ''
          }`,
        });
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference / 2}
          />
        </G>
      </Svg>
      {/* the animated text inside the donut on the overview and ov-detail view */}
      {view !== 'rank' && (
        <AnimatedInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          editable={false}
          defaultValue="0"
          style={[
            StyleSheet.absoluteFillObject,
            { fontSize: fontSize, color: color },
            { fontFamily: 'Avenir-Heavy', textAlign: 'center' },
          ]}
        />
      )}
    </View>
  );
};

Donut.propTypes = {
  percentage: PropTypes.number,
  radius: PropTypes.number,
  strokeWidth: PropTypes.number,
  duration: PropTypes.number,
  color: PropTypes.string,
  delay: PropTypes.number,
  max: PropTypes.number,
  fontSize: PropTypes.number,
  // this prop 'showPercentageSymbol' is used in DownloadToast.js
  showPercentageSymbol: PropTypes.bool,
  view: PropTypes.oneOf(['overview', 'rank', 'ov detail']),
};

export default Donut;
