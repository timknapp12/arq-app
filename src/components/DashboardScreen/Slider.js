import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Proptypes from 'prop-types';
import { H2Bold, H4Secondary, Flexbox } from '../Common';
import CustomSlider from './CustomSlider';
import { findRankName, findRankObject } from '../../Utils/findRankInSlider';
import { Localized, init } from '../../Translations/Localized';

const { width } = Dimensions.get('window');
const sliderWidth = width - 40;

const Slider = ({ rank, setRank, rankName, setRankName, ranklist }) => {
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
        <H4Secondary>{Localized('not-qualified')}</H4Secondary>
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
  ranklist: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.number,
      name: Proptypes.string,
      requiredPv: Proptypes.number,
      requiredQov: Proptypes.number,
      legMaxPerc: Proptypes.number,
      legMaxOv: Proptypes.number,
    }),
  ),
  rank: Proptypes.object,
  setRank: Proptypes.func,
  rankName: Proptypes.string,
  setRankName: Proptypes.func,
};

export default Slider;
