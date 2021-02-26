import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { H2Bold, H4Secondary, Flexbox } from '../Common';
import CustomSlider from './CustomSlider';
import { findRankName, findRankObject } from '../../Utils/findRankInSlider';
import { Localized, init } from '../../Translations/Localized';

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
  init();

  const maximumValue = ranklist.length - 1;

  const [value, setValue] = useState(rank?.id);

  useEffect(() => {
    setRankName(findRankName(ranklist, value));
  }, [value]);

  const onSlidingComplete = () => setRank(findRankObject(ranklist, value));

  return (
    <Flexbox
      width={`${sliderWidth}px`}
      style={{
        paddingTop: 12,
      }}>
      <Flexbox direction="row">
        <H2Bold>{rankName}</H2Bold>
        <H4Secondary>
          {isQualified ? Localized('qualified') : Localized('not-qualified')}
        </H4Secondary>
      </Flexbox>
      <CustomSlider
        value={value}
        setValue={setValue}
        sliderWidth={sliderWidth}
        maximumValue={maximumValue}
        onSlidingComplete={onSlidingComplete}
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
