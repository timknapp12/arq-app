import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { H4, H6Secondary, Flexbox } from '../common';
import CustomSlider from './CustomSlider';
import {
  findRankName,
  findRankObject,
  findRankIndex,
} from '../../utils/findRankInSlider';
import { Localized } from '../../translations/Localized';

const { width } = Dimensions.get('window');
const sliderWidth = width - 40;

const Slider = ({
  rank,
  setRank,
  rankName,
  setRankName,
  ranklist,
  isQualified,
}) => {
  const maximumValue = ranklist.length - 1;
  const initialValue = findRankIndex(ranklist, rank.rankName);
  const [value, setValue] = useState(initialValue);
  const [isQualifiedTextDisplayed, setIsQualifiedTextDisplayed] =
    useState(true);

  useEffect(() => {
    setRankName(findRankName(ranklist, value));
  }, [value]);

  const onSlidingStart = () => setIsQualifiedTextDisplayed(false);

  const onSlidingComplete = () => {
    setRank(findRankObject(ranklist, value));
    setIsQualifiedTextDisplayed(true);
  };

  return (
    <Flexbox
      width={`${sliderWidth}px`}
      style={{
        paddingTop: 12,
      }}>
      <Flexbox justify="flex-start" height="45px">
        <H4>{rankName}</H4>
        {isQualifiedTextDisplayed && (
          <H6Secondary style={{ marginStart: 8 }}>
            {isQualified
              ? `(${Localized('qualified')})`
              : `(${Localized('not qualified')})`}
          </H6Secondary>
        )}
      </Flexbox>
      <CustomSlider
        value={value}
        setValue={setValue}
        sliderWidth={sliderWidth}
        maximumValue={maximumValue}
        onSlidingComplete={onSlidingComplete}
        onSlidingStart={onSlidingStart}
      />
    </Flexbox>
  );
};

Slider.propTypes = {
  ranklist: PropTypes.arrayOf(
    PropTypes.shape({
      rankId: PropTypes.number,
      name: PropTypes.string,
      requiredPv: PropTypes.number,
      minimumQoV: PropTypes.number,
      legMaxPercentage: PropTypes.number,
      maximumPerLeg: PropTypes.number,
    }),
  ),
  rank: PropTypes.object,
  setRank: PropTypes.func,
  rankName: PropTypes.string,
  setRankName: PropTypes.func,
  isQualified: PropTypes.bool,
};

export default Slider;
