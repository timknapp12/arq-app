import React from 'react';
import Proptypes from 'prop-types';
import Slider from 'react-native-slider';
import { green, blue } from '../../Styles/colors';

const CustomSlider = ({ value, setValue, sliderWidth, maximumValue }) => {
  return (
    <Slider
      step={1}
      minimumValue={0}
      maximumValue={maximumValue}
      minimumTrackTintColor={blue}
      thumbTintColor={green}
      thumbTouchSize={{ width: 60, height: 60 }}
      thumbStyle={{ height: 18, width: 18 }}
      trackStyle={{ height: 10, backgroundColor: blue, borderRadius: 5 }}
      style={{ width: sliderWidth }}
      value={value}
      onValueChange={(value) => setValue(value)}
    />
  );
};

CustomSlider.propTypes = {
  value: Proptypes.number,
  setValue: Proptypes.func,
  sliderWidth: Proptypes.number,
  maximumValue: Proptypes.number,
};

export default CustomSlider;
