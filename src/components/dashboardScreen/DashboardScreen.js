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
import NotificationsColumn from '../notifications/NotificationsColumn';
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
    ranks = [],
    setDisplayNotifications,
  } = useContext(LoginContext);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Dashboard_Screen_Visited', {
        screen: 'Dashboard Screen',
        purpose: 'User navigated to Dashboard Screen',
      });
    }
    return () => {
      closeMenus();
    };
  }, [isFocused]);

  const initialView = {
    name: Localized('OVERVIEW'),
    testID: 'overview-button',
  };

  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('Overview').toUpperCase(), testID: 'overview_button' },
    { name: Localized('Rank').toUpperCase(), testID: 'rank_button' },
    { name: Localized('OV Detail').toUpperCase(), testID: 'ov_detail_button' },
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

  const closeMenus = () => {
    fadeOut();
    setDisplayNotifications(false);
  };

  const navigate = (item) => {
    closeMenus();
    setView(item);
    Analytics.logEvent(`${item?.testID}_tapped`, {
      screen: 'Dashboard Screen',
      purpose: `See details for ${item?.name}`,
    });
  };

  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <ScreenContainer style={{ justifyContent: 'flex-start', height: 'auto' }}>
        <Flexbox style={{ zIndex: 2 }}>
          <MainHeader
            isMenuOpen={isMenuOpen}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            setIsMenuOpen={setIsMenuOpen}
          />
          <NotificationsColumn />
        </Flexbox>
        <TopButtonBar>
          {tertiaryButtonText.map((item) => (
            <TertiaryButton
              style={{ marginRight: 15 }}
              onPress={() => navigate(item)}
              selected={view.name === item?.name}
              key={item?.name}>
              {item?.name}
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
          {view.name === Localized('Overview').toUpperCase() && (
            <Overview user={user} closeMenus={closeMenus} />
          )}
          {view.name === Localized('Rank').toUpperCase() && (
            <Rank ranklist={ranks} user={user} closeMenus={closeMenus} />
          )}
          {view.name === Localized('OV Detail').toUpperCase() && (
            <OVDetail ranklist={ranks} user={user} closeMenus={closeMenus} />
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
