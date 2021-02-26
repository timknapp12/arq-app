import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import { Flexbox, H5 } from '../Common';
import Svg, { G, Circle } from 'react-native-svg';
import { gray } from '../../Styles/colors';
import { Localized, init } from '../../Translations/Localized';

// source for donut svg: https://www.youtube.com/watch?v=x2LtzCxbWI0

const Legend = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut = ({
  percentage = 75,
  radius = 80,
  strokeWidth = 8,
  duration = 1000,
  color = 'yellow',
  delay = 0,
  textColor = gray,
  max = 100,
  view,
}) => {
  init();
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
    // to ensure percentage is not greater than 100%
    const filteredPercentage = percentage > max ? max : percentage;
    animation(filteredPercentage);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;

        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
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
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference / 2}
          />
        </G>
      </Svg>
      {/* the animated text inside the donut on the overview view */}
      {view === 'overview' && (
        <AnimatedInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          editable={false}
          defaultValue="0"
          style={[
            StyleSheet.absoluteFillObject,
            { fontSize: radius / 2, color: textColor ?? color },
            { textAlign: 'center' },
          ]}
        />
      )}
      {/* the "Used" and "Unused" text and values inside the donut on the ov details view */}
      {view === 'ov detail' && (
        <Flexbox
          justify="center"
          align="center"
          style={{
            position: 'absolute',
          }}
          height="100%">
          <Legend>
            <H5 style={{ textAlign: 'center', flexWrap: 'nowrap' }}>
              {`${Localized('used')}: ${percentage}`}
            </H5>
          </Legend>
          <Legend>
            <H5 style={{ textAlign: 'center' }}>{`${Localized('unused')}: ${
              max - percentage
            }`}</H5>
          </Legend>
        </Flexbox>
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
  textColor: PropTypes.string,
  max: PropTypes.number,
  view: PropTypes.oneOf(['overview', 'rank', 'ov detail']),
};

export default Donut;
