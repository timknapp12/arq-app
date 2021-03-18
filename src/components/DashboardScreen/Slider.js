import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { H4Bold, H6Secodnary, Flexbox } from '../common';
import CustomSlider from './CustomSlider';
import { findRankName, findRankObject } from '../../utils/findRankInSlider';
import { Localized, initLanguage } from '../../translations/Localized';

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
  initLanguage();

  const maximumValue = ranklist.length - 1;

  const [value, setValue] = useState(rank?.id);
  const [isQualifiedTextDisplayed, setIsQualifiedTextDisplayed] = useState(
    true,
  );

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
        <H4Bold>{rankName}</H4Bold>
        {isQualifiedTextDisplayed && (
          <H6Secodnary style={{ marginStart: 8 }}>
            {isQualified
              ? `(${Localized('qualified')})`
              : `(${Localized('not qualified')})`}
          </H6Secodnary>
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
      id: PropTypes.number,
      name: PropTypes.string,
      requiredPV: PropTypes.number,
      requiredQOV: PropTypes.number,
      legMaxPerc: PropTypes.number,
      legMaxOV: PropTypes.number,
    }),
  ),
  rank: PropTypes.object,
  setRank: PropTypes.func,
  rankName: PropTypes.string,
  setRankName: PropTypes.func,
  isQualified: PropTypes.bool,
};

export default Slider;
