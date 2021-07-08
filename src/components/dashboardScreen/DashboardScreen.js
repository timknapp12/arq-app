import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import {
  Flexbox,
  ScreenContainer,
  TertiaryButton,
  TopButtonBar,
} from '../common';
import MainHeader from '../mainHeader/MainHeader';
import { Localized, initLanguage } from '../../translations/Localized';
import Overview from './Overview';
import Rank from './Rank';
import OVDetail from './OVDetail';
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
import LoginContext from '../../contexts/LoginContext';

const DashboardScreen = ({ navigation }) => {
  initLanguage();
  // set defaults for user so UI doesn't crash before real data loads
  const {
    user = {
      pv: 0,
      qoV: 0,
      totalOv: 0,
      pa: 0,
      cv: 0,
      leg1: 0,
      leg2: 0,
      leg3: 0,
      rank: {
        rankId: 1,
        rankName: 'Ambassador',
        minimumQoV: 0,
        maximumPerLeg: 0,
        legMaxPercentage: 100,
        requiredPv: 0,
        requiredPa: 0,
      },
      previousAmbassadorMonthlyRecord: {
        personalVolume: 0,
        personallySponsoredActiveAmbassadorCount: 0,
        qov: 0,
      },
    },
  } = useContext(LoginContext);

  const ranklist = [
    {
      rankId: 1,
      rankName: 'Ambassador',
      minimumQoV: 0,
      maximumPerLeg: 0,
      legMaxPercentage: 100,
      requiredPv: 0,
      requiredPa: 0,
    },
    {
      rankId: 3,
      rankName: 'Builder',
      minimumQoV: 300,
      maximumPerLeg: 180,
      legMaxPercentage: 60,
      requiredPv: 100,
      requiredPa: 2,
    },
    {
      rankId: 4,
      rankName: 'Pro',
      minimumQoV: 600,
      maximumPerLeg: 360,
      legMaxPercentage: 60,
      requiredPv: 100,
      requiredPa: 2,
    },
    {
      rankId: 5,
      rankName: 'Executive',
      minimumQoV: 1500,
      maximumPerLeg: 900,
      legMaxPercentage: 60,
      requiredPv: 100,
      requiredPa: 2,
    },
    {
      rankId: 6,
      rankName: 'Elite',
      minimumQoV: 4500,
      maximumPerLeg: 2250,
      legMaxPercentage: 50,
      requiredPv: 100,
      requiredPa: 2,
    },
    {
      rankId: 7,
      rankName: 'Bronze',
      minimumQoV: 10000,
      maximumPerLeg: 5000,
      legMaxPercentage: 50,
      requiredPv: 100,
      requiredPa: 2,
    },
    {
      rankId: 8,
      rankName: 'Silver',
      minimumQoV: 25000,
      maximumPerLeg: 10000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 9,
      rankName: 'Gold',
      minimumQoV: 50000,
      maximumPerLeg: 20000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 10,
      rankName: 'Platinum',
      minimumQoV: 100000,
      maximumPerLeg: 40000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 11,
      rankName: 'Ruby',
      minimumQoV: 200000,
      maximumPerLeg: 80000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 12,
      rankName: 'Emerald',
      minimumQoV: 350000,
      maximumPerLeg: 140000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 13,
      rankName: 'Diamond',
      minimumQoV: 500000,
      maximumPerLeg: 200000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 14,
      rankName: 'Blue Diamond',
      minimumQoV: 750000,
      maximumPerLeg: 300000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 15,
      rankName: 'Black Diamond',
      minimumQoV: 1000000,
      maximumPerLeg: 400000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 16,
      rankName: 'Royal Diamond',
      minimumQoV: 1500000,
      maximumPerLeg: 600000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 17,
      rankName: 'Presidential Diamond',
      minimumQoV: 2000000,
      maximumPerLeg: 800000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
    },
    {
      rankId: 18,
      rankName: 'Crown Diamond',
      minimumQoV: 3000000,
      maximumPerLeg: 1200000,
      legMaxPercentage: 40,
      requiredPv: 200,
      requiredPa: 2,
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
    return () => {
      fadeOut();
    };
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
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: -500,
      duration: 700,
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
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <ScreenContainer style={{ justifyContent: 'flex-start', height: 'auto' }}>
        <MainHeader
          isMenuOpen={isMenuOpen}
          fadeIn={fadeIn}
          fadeOut={fadeOut}
          setIsMenuOpen={setIsMenuOpen}
          badgeValue={2}
        />
        <TopButtonBar>
          {tertiaryButtonText.map((item) => (
            <TertiaryButton
              style={{ marginRight: 15 }}
              onPress={() => navigate(item)}
              selected={view.name === item.name}
              key={item.name}>
              {item.name}
            </TertiaryButton>
          ))}
        </TopButtonBar>
        <Flexbox>
          <PopoutMenu
            fadeAnim={fadeAnim}
            fadeOut={fadeOut}
            setIsMyInfoModalOpen={setIsMyInfoModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            navigation={navigation}
          />
        </Flexbox>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
          }}
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}>
          {view.name === Localized('OVERVIEW') && (
            <Overview user={user} fadeOut={fadeOut} />
          )}
          {view.name === Localized('RANK') && (
            <Rank ranklist={ranklist} user={user} fadeOut={fadeOut} />
          )}
          {view.name === Localized('OV DETAIL') && (
            <OVDetail ranklist={ranklist} user={user} fadeOut={fadeOut} />
          )}
        </ScrollView>
        {isMyInfoModalOpen && (
          <MyInfoModal
            isMyInfoModalOpen={isMyInfoModalOpen}
            setIsMyInfoModalOpen={setIsMyInfoModalOpen}
          />
        )}
        {isSettingsModalOpen && (
          <SettingsModal
            isSettingsModalOpen={isSettingsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            data={user?.associate}
          />
        )}
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

DashboardScreen.propTypes = {
  navigation: PropTypes.object,
};

export default DashboardScreen;
