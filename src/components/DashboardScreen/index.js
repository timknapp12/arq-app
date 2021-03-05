import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import { Flexbox, ScreenContainer, TertiaryButton } from '../Common';
import DashboardHeader from './DashboardHeader';
import Subheader from './Subheader';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, init } from '../../Translations/Localized';
import { useIsFocused } from '@react-navigation/native';
import Overview from './Overview';
import Rank from './Rank';
import OVDetail from './OVDetail';
import PopoutMenu from './PopoutMenu';
import MyInfoModal from './MyInfoModal';

const mockUser = {
  lastMonthPV: 150,
  thisMonthPV: 305,
  lastMonthQOV: 200000,
  thisMonthQOV: 350000,
  OV: 2224731,
  lastMonthPA: 1,
  thisMonthPA: 2,
  thisMonthCV: 256,
  leg1OV: 1992193,
  leg2OV: 156931,
  leg3OV: 75607,
  currentRank: {
    legMaxPerc: 40,
    legMaxOV: 140000,
    id: 10,
    requiredPV: 200,
    requiredPA: 2,
    requiredQOV: 350000,
    name: Localized('emerald'),
  },
};

const DashboardScreen = () => {
  init();
  const ranklist = [
    {
      legMaxPerc: 0,
      legMaxOV: 0,
      id: 0,
      requiredPV: 0,
      requiredPA: 0,
      requiredQOV: 0,
      name: Localized('distributor'),
    },
    {
      legMaxPerc: 60,
      legMaxOV: 180,
      id: 1,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 300,
      name: Localized('builder'),
    },
    {
      legMaxPerc: 60,
      legMaxOV: 360,
      id: 2,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 600,
      name: Localized('pro'),
    },
    {
      legMaxPerc: 60,
      legMaxOV: 900,
      id: 3,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 1500,
      name: Localized('executive'),
    },
    {
      legMaxPerc: 50,
      legMaxOV: 2250,
      id: 4,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 4500,
      name: Localized('elite'),
    },
    {
      legMaxPerc: 50,
      legMaxOV: 5000,
      id: 5,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 10000,
      name: Localized('bronze'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 10000,
      id: 6,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 25000,
      name: Localized('silver'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 20000,
      id: 7,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 50000,
      name: Localized('gold'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 40000,
      id: 8,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 100000,
      name: Localized('platinum'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 80000,
      id: 9,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 200000,
      name: Localized('ruby'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 140000,
      id: 10,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 350000,
      name: Localized('emerald'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 200000,
      id: 11,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 500000,
      name: Localized('diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 300000,
      id: 12,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 750000,
      name: Localized('blue-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 400000,
      id: 13,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 1000000,
      name: Localized('black-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 600000,
      id: 14,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 1500000,
      name: Localized('royal-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 800000,
      id: 15,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 2000000,
      name: Localized('presidential-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 1200000,
      id: 16,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 3000000,
      name: Localized('crown-diamond'),
    },
  ];

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Dashboard_Screen_Visited', {
        screen: 'Dashboard Screen',
        purpose: 'User navigated to Dashboard Screen',
      });
    }
  }, [isFocused]);

  const initialView = {
    name: Localized('overview'),
    testID: 'overview-button',
  };

  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('overview'), testID: 'overview_button' },
    { name: Localized('rank'), testID: 'rank_button' },
    { name: Localized('ov-detail'), testID: 'ov_detail_button' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeAnim = useRef(new Animated.Value(-500)).current;

  const fadeIn = () => {
    setIsMenuOpen(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: -500,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  const navigate = (item) => {
    fadeOut();
    setView(item);
    Analytics.logEvent(`${item.testID}_tapped`, {
      screen: 'Dashboard Screen',
      purpose: `See details for ${item.name}`,
    });
  };

  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <ScreenContainer style={{ justifyContent: 'flex-start', height: 'auto' }}>
        <DashboardHeader
          isMenuOpen={isMenuOpen}
          fadeIn={fadeIn}
          fadeOut={fadeOut}
          setIsMenuOpen={setIsMenuOpen}
          badgeValue={2}
        />
        <Subheader>
          {tertiaryButtonText.map((item) => (
            <TertiaryButton
              onPress={() => navigate(item)}
              selected={view.name === item.name}
              key={item.name}>
              {item.name}
            </TertiaryButton>
          ))}
        </Subheader>
        <Flexbox>
          <PopoutMenu
            fadeAnim={fadeAnim}
            isMenuOpen={isMenuOpen}
            fadeOut={fadeOut}
            setIsMyInfoModalOpen={setIsMyInfoModalOpen}
          />
        </Flexbox>
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}>
          {view.name === Localized('overview') && (
            <Overview user={mockUser} fadeOut={fadeOut} />
          )}
          {view.name === Localized('rank') && (
            <Rank ranklist={ranklist} user={mockUser} fadeOut={fadeOut} />
          )}
          {view.name === Localized('ov-detail') && (
            <OVDetail ranklist={ranklist} user={mockUser} fadeOut={fadeOut} />
          )}
        </ScrollView>
        <MyInfoModal
          setIsMyInfoModalOpen={setIsMyInfoModalOpen}
          isMyInfoModalOpen={isMyInfoModalOpen}
        />
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

export default DashboardScreen;
