import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H4, H6Secondary, Flexbox } from '../common';
import CustomSlider from './CustomSlider';
import QOVInfoPopup from './QOVInfoPopup';
import {
  findRankName,
  findRankObject,
  findRankIndex,
} from '../../utils/findRankInSlider';
import AppContext from '../../contexts/AppContext';
import DashboardScreenContext from '../../contexts/DashboardScreenContext';
import InfoIcon from '../../../assets/icons/InfoIcon.svg';
import { Localized } from '../../translations/Localized';

const { width } = Dimensions.get('window');
const sliderWidth = width - 40;

const Slider = ({ rank, setRank, rankName, setRankName, isQualified }) => {
  const { theme } = useContext(AppContext);
  const { ranklist, isRankInfoPopupOpen, setIsRankInfoPopupOpen } = useContext(
    DashboardScreenContext,
  );

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

  const toggleQOVInfoPopup = () => {
    setIsRankInfoPopupOpen((state) => !state);
  };

  return (
    <Flexbox
      width={`${sliderWidth}px`}
      style={{
        paddingTop: 12,
        zIndex: 2,
      }}
    >
      <Flexbox justify="flex-start" height="45px" style={{ zIndex: 1 }}>
        <H4>{rankName}</H4>
        {isQualifiedTextDisplayed && (
          <Flexbox direction="row" align="center" justify="center">
            <TouchableOpacity
              style={{
                padding: 4,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={toggleQOVInfoPopup}
            >
              <H6Secondary style={{ marginEnd: 8 }}>
                {isQualified
                  ? `(${Localized('qualified')})`
                  : `(${Localized('not qualified')})`}
              </H6Secondary>
              <InfoIcon
                style={{
                  color: theme.primaryButtonBackgroundColor,
                  height: 24,
                  width: 24,
                }}
              />
            </TouchableOpacity>
            {isRankInfoPopupOpen && (
              <QOVInfoPopup onClose={() => setIsRankInfoPopupOpen(false)} />
            )}
          </Flexbox>
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
  rank: PropTypes.object,
  setRank: PropTypes.func,
  rankName: PropTypes.string,
  setRankName: PropTypes.func,
  isQualified: PropTypes.bool,
};

export default Slider;
