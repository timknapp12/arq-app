import React from 'react';
import Proptypes from 'prop-types';
import Slider from 'react-native-slider';
import { lightblue, veniceBlue } from '../../styles/colors';

// source: https://github.com/jeanregisser/react-native-slider
const CustomSlider = ({
  value,
  setValue,
  sliderWidth,
  maximumValue,
  onSlidingStart,
  onSlidingComplete,
}) => {
  return (
    <Slider
      step={1}
      minimumValue={0}
      maximumValue={maximumValue}
      minimumTrackTintColor={veniceBlue}
      thumbTintColor={lightblue}
      thumbTouchSize={{ width: 60, height: 60 }}
      thumbStyle={{ height: 18, width: 18 }}
      trackStyle={{ height: 10, backgroundColor: veniceBlue, borderRadius: 5 }}
      style={{ width: sliderWidth }}
      value={value}
      onValueChange={(value) => setValue(value)}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
    />
  );
};

CustomSlider.propTypes = {
  value: Proptypes.number,
  setValue: Proptypes.func,
  sliderWidth: Proptypes.number,
  maximumValue: Proptypes.number,
  onSlidingStart: Proptypes.func,
  onSlidingComplete: Proptypes.func,
};

export default CustomSlider;
