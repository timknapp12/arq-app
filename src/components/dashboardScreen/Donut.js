import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, TextInput, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Flexbox } from '../common';
import Svg, { G, Circle } from 'react-native-svg';
import TapIcon from '../../../assets/icons/icTap.svg';
import stringify from '../../utils/roundDownAndAddCommas/stringify';

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
  onPress = () => {},
  showTapIcon = false,
  remainingQov,
  showRemainingQov,
  setShowRemainingQov,
}) => {
  // once the animation is complete and option is toggled to see remaining and then toggled back to original animated value goes to 0
  // so this will detect when it will be 0 and can show the original "non-animated" value
  const [hasShownRemainingAtLeastOnce, setHasShownRemainingAtLeastOnce] =
    useState(false);

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
          text: `${stringify(v.value)}${showPercentageSymbol ? '%' : ''}`,
        });
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);

  // sometimes the values have decimals so we round up the number before making a string with commas
  const inputValue = showRemainingQov
    ? stringify(remainingQov)
    : stringify(percentage);
  const textShrinkCutOffLength = Platform.OS === 'android' ? 5 : 6;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress();
        showTapIcon && setShowRemainingQov((state) => !state);
        setHasShownRemainingAtLeastOnce(true);
      }}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        >
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
          <>
            {!hasShownRemainingAtLeastOnce ? (
              <AnimatedInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="0"
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    fontSize:
                      inputValue.length > textShrinkCutOffLength
                        ? 20
                        : fontSize,
                    color: color,
                  },
                  { fontFamily: 'Avenir-Heavy', textAlign: 'center' },
                ]}
              />
            ) : (
              <TextInput
                editable={false}
                value={inputValue}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    fontSize:
                      inputValue.length > textShrinkCutOffLength
                        ? 20
                        : fontSize,
                    color: color,
                  },
                  { fontFamily: 'Avenir-Heavy', textAlign: 'center' },
                ]}
              />
            )}
          </>
        )}
      </View>
      {showTapIcon && (
        <Flexbox style={{ position: 'absolute', bottom: 26 }}>
          <TapIcon />
        </Flexbox>
      )}
    </TouchableOpacity>
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
  onPress: PropTypes.func,
  // this prop 'showPercentageSymbol' is used in DownloadToast.js
  showPercentageSymbol: PropTypes.bool,
  view: PropTypes.oneOf(['overview', 'rank', 'ov detail']),
  showTapIcon: PropTypes.bool,
  remainingQov: PropTypes.number,
  showRemainingQov: PropTypes.bool,
  setShowRemainingQov: PropTypes.func,
};

export default Donut;
