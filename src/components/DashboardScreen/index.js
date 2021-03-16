import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import { Flexbox, ScreenContainer, TertiaryButton } from '../Common';
import DashboardHeader from './DashboardHeader';
import Subheader from '../Headers/Subheader';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, init } from '../../Translations/Localized';
import { useIsFocused } from '@react-navigation/native';
import Overview from './Overview';
import Rank from './Rank';
import OVDetail from './OVDetail';
import PopoutMenu from '../MainMenu/PopoutMenu';
import MyInfoModal from '../MainMenu/MyInfoModal';
import ShareOptionsModal from '../MainMenu/ShareOptionsModal';

const mockUser = {
  lastMonthPV: 150,
  thisMonthPV: 305,
  lastMonthQOV: 200000,
  thisMonthQOV: 350000,
  OV: 2224731,
  lastMonthPA: 1,
  thisMonthPA: 2,
  thisMonthCV: 256,
  leg1OV: 1190000,
  leg2OV: 115500,
  leg3OV: 115500,
  currentRank: {
    legMaxPerc: 40,
    legMaxOV: 140000,
    id: 10,
    requiredPV: 200,
    requiredPA: 2,
    requiredQOV: 350000,
    name: Localized('Emerald'),
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
      name: Localized('Distributor'),
    },
    {
      legMaxPerc: 60,
      legMaxOV: 180,
      id: 1,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 300,
      name: Localized('Builder'),
    },
    {
      legMaxPerc: 60,
      legMaxOV: 360,
      id: 2,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 600,
      name: Localized('Pro'),
    },
    {
      legMaxPerc: 60,
      legMaxOV: 900,
      id: 3,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 1500,
      name: Localized('Executive'),
    },
    {
      legMaxPerc: 50,
      legMaxOV: 2250,
      id: 4,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 4500,
      name: Localized('Elite'),
    },
    {
      legMaxPerc: 50,
      legMaxOV: 5000,
      id: 5,
      requiredPV: 100,
      requiredPA: 2,
      requiredQOV: 10000,
      name: Localized('Bronze'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 10000,
      id: 6,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 25000,
      name: Localized('Silver'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 20000,
      id: 7,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 50000,
      name: Localized('Gold'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 40000,
      id: 8,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 100000,
      name: Localized('Platinum'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 80000,
      id: 9,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 200000,
      name: Localized('Ruby'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 140000,
      id: 10,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 350000,
      name: Localized('Emerald'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 200000,
      id: 11,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 500000,
      name: Localized('Diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 300000,
      id: 12,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 750000,
      name: Localized('Blue Diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 400000,
      id: 13,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 1000000,
      name: Localized('Black Diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 600000,
      id: 14,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 1500000,
      name: Localized('Royal Diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 800000,
      id: 15,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 2000000,
      name: Localized('Presidential Diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOV: 1200000,
      id: 16,
      requiredPV: 200,
      requiredPA: 2,
      requiredQOV: 3000000,
      name: Localized('Crown Diamond'),
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
    name: Localized('OVERVIEW'),
    testID: 'overview-button',
  };

  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('OVERVIEW'), testID: 'overview_button' },
    { name: Localized('RANK'), testID: 'rank_button' },
    { name: Localized('OV DETAIL'), testID: 'ov_detail_button' },
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
  const [isShareOptionsModalOpen, setIsShareOptionsModalOpen] = useState(false);

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
        <Subheader height="30px">
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
            setIsShareOptionsModalOpen={setIsShareOptionsModalOpen}
          />
        </Flexbox>
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}>
          {view.name === Localized('OVERVIEW') && (
            <Overview user={mockUser} fadeOut={fadeOut} />
          )}
          {view.name === Localized('RANK') && (
            <Rank ranklist={ranklist} user={mockUser} fadeOut={fadeOut} />
          )}
          {view.name === Localized('OV DETAIL') && (
            <OVDetail ranklist={ranklist} user={mockUser} fadeOut={fadeOut} />
          )}
        </ScrollView>
        {isMyInfoModalOpen && (
          <MyInfoModal
            isMyInfoModalOpen={isMyInfoModalOpen}
            setIsMyInfoModalOpen={setIsMyInfoModalOpen}
          />
        )}
        {isShareOptionsModalOpen && (
          <ShareOptionsModal
            isShareOptionsModalOpen={isShareOptionsModalOpen}
            setIsShareOptionsModalOpen={setIsShareOptionsModalOpen}
          />
        )}
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

export default DashboardScreen;
