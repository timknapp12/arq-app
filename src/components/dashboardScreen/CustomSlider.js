import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import AppContext from '../../contexts/AppContext';

// source: https://github.com/jeanregisser/react-native-slider
// fork with fix for console warning: https://github.com/newn-team/react-native-slider
const CustomSlider = ({
  value,
  sliderWidth,
  maximumValue,
  onSlidingStart,
  onSlidingComplete,
}) => {
  const { theme } = useContext(AppContext);
  const trackColor =
    Platform.OS === 'ios'
      ? theme.sliderTrackColorIos
      : theme.sliderTrackColorAndroid;

  return (
    <Slider
      step={1}
      minimumValue={0}
      maximumValue={maximumValue}
      minimumTrackTintColor={trackColor}
      maximumTrackTintColor={trackColor}
      thumbTintColor={theme.sliderThumbColor}
      style={{ width: sliderWidth, height: 60 }}
      value={value}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={(val) => onSlidingComplete(val)}
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
