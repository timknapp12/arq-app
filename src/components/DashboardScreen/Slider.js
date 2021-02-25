import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { H2Bold, H4Secondary, Flexbox } from '../Common';
import CustomSlider from './CustomSlider';
import { findRankInSlider } from '../../Utils/findRankInSlider';
import { Localized, init } from '../../Translations/Localized';

const { width } = Dimensions.get('window');
const sliderWidth = width - 40;

const Slider = () => {
  init();
  const ranklist = [
    { name: Localized('distributor') },
    { name: Localized('builder') },
    { name: Localized('pro') },
    { name: Localized('executive') },
    { name: Localized('elite') },
    { name: Localized('bronze') },
    { name: Localized('silver') },
    { name: Localized('gold') },
    { name: Localized('platinum') },
    { name: Localized('ruby') },
    { name: Localized('emerald') },
    { name: Localized('diamond') },
    { name: Localized('blue-diamond') },
    { name: Localized('black-diamond') },
    { name: Localized('royal-diamond') },
    { name: Localized('presidential-diamond') },
    { name: Localized('crown-diamond') },
  ];
  const maximumValue = ranklist.length - 1;

  const [value, setValue] = useState(0);

  const initialRank = 'Pro';
  const [rank, setRank] = useState(initialRank);

  useEffect(() => {
    setRank(findRankInSlider(ranklist, value));
    return () => {
      setRank(initialRank);
    };
  }, [value]);

  return (
    <Flexbox
      width={`${sliderWidth}px`}
      style={{
        paddingTop: 12,
      }}>
      <Flexbox direction="row">
        <H2Bold>{rank}</H2Bold>
        <H4Secondary>Not qualified</H4Secondary>
      </Flexbox>
      <CustomSlider
        value={value}
        setValue={setValue}
        sliderWidth={sliderWidth}
        maximumValue={maximumValue}
      />
    </Flexbox>
  );
};

export default Slider;
