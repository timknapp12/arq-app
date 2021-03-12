import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Animated } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import Donut from './Donut';
import { Flexbox, H5Secondary } from '../Common';
import { Localized, init } from '../../Translations/Localized';

const Legend = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Square = styled.View`
  height: 16px;
  width: 16px;
  margin-right: 2px;
  background-color: ${({ squareFill }) => squareFill};
`;

// source for animated svg: https://www.youtube.com/watch?v=x2LtzCxbWI0
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DoubleDonut = ({
  outerpercentage = 75,
  outerradius = 80,
  outerstrokeWidth = 8,
  outerduration = 1000,
  outercolor,
  outerdelay = 0,
  outermax = 100,
  innerpercentage = 65,
  innerradius = 70,
  innerstrokeWidth = 8,
  innerduration = 1000,
  innercolor,
  innerdelay = 0,
  innermax = 100,
  view,
}) => {
  init();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const halfCircle = outerradius + outerstrokeWidth;
  const circleCircumference = 2 * Math.PI * outerradius;

  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration: outerduration,
      delay: outerdelay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // to ensure percentage is not greater than 100%
    const filteredPercentage =
      outerpercentage > outermax ? outermax : outerpercentage;

    animation(filteredPercentage);
    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / outermax;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;

        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [outermax, outerpercentage]);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
      <Svg
        width={outerradius * 2}
        height={outerradius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={outercolor}
            strokeWidth={outerstrokeWidth}
            r={outerradius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={outercolor}
            strokeWidth={outerstrokeWidth}
            r={outerradius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference / 2}
          />
        </G>
      </Svg>
      <View style={{ position: 'absolute', top: outerradius - innerradius }}>
        <Donut
          radius={innerradius}
          color={innercolor}
          percentage={innerpercentage}
          max={innermax}
          view={view}
          strokeWidth={innerstrokeWidth}
          duration={innerduration}
          delay={innerdelay}
        />
        <Flexbox
          justify="center"
          align="flex-start"
          padding={18}
          style={{
            position: 'absolute',
          }}
          height="100%">
          <Legend>
            <Square squareFill={outercolor} />
            <H5Secondary style={{ textAlign: 'center', flexWrap: 'nowrap' }}>
              {Localized('This month')}
            </H5Secondary>
          </Legend>
          <Legend>
            <Square squareFill={innercolor} />
            <H5Secondary style={{ textAlign: 'center' }}>
              {Localized('Last month')}
            </H5Secondary>
          </Legend>
        </Flexbox>
      </View>
    </View>
  );
};

DoubleDonut.propTypes = {
  outerpercentage: PropTypes.number,
  outerradius: PropTypes.number,
  outerstrokeWidth: PropTypes.number,
  outerduration: PropTypes.number,
  outercolor: PropTypes.string,
  outerdelay: PropTypes.number,
  outermax: PropTypes.number,
  innerpercentage: PropTypes.number,
  innerradius: PropTypes.number,
  innerstrokeWidth: PropTypes.number,
  innerduration: PropTypes.number,
  innercolor: PropTypes.string,
  innerdelay: PropTypes.number,
  innermax: PropTypes.number,
  view: PropTypes.oneOf(['overview', 'rank', 'ov detail']),
};

export default DoubleDonut;
