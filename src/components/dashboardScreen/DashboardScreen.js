import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import firebase from 'firebase/app';
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
import { saveProfileImageToFirebase } from '../../utils/firebase/saveProfileImageToFirebase';
import { getCorporateResources } from '../../utils/firebase/getCorporateResources';
import AppContext from '../../contexts/AppContext';

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
  personalInfo: {
    image: {
      imageName: 'Sloane.Taylor.2f79ef5f-58d1-4358-b12b-2ab05e3e4dc8',
      url:
        'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FSloane.Taylor.94f93ae8-9b3d-4cf3-a7ee-3f213707ebc6?alt=media&token=52c072d4-62e1-4ab0-b4c4-3090fcb0d4e5',
    },
    firstName: 'Sloane',
    lastName: 'Taylor',
    displayName: 'sloanet',
    username: 'sloaniejoanie',
    email: 'sloanetaylor@gmail.com',
    phone: '801-435-9064',
    associateId: '12340987',
    address1: '1234 S 5600 W',
    address2: '',
    city: 'Lehi',
    state: 'UT',
    zipcode: '84043',
    country: 'us',
  },
};

const DashboardScreen = ({ navigation }) => {
  const { setCorporateResources, deviceLanguage, userMarket } = useContext(
    AppContext,
  );
  initLanguage;
  const db = firebase.firestore();

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
    return () => {
      fadeOut();
    };
  }, [isFocused]);

  useEffect(() => {
    getCorporateResources(
      db,
      userMarket,
      deviceLanguage,
      setCorporateResources,
    );
  }, []);

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
          profileUrl={mockUser.personalInfo.image.url}
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
            <Overview user={mockUser} fadeOut={fadeOut} />
          )}
          {view.name === Localized('RANK') && (
            <Rank ranklist={ranklist} user={mockUser} fadeOut={fadeOut} />
          )}
          {view.name === Localized('OV DETAIL') && (
            <OVDetail ranklist={ranklist} user={mockUser} fadeOut={fadeOut} />
          )}
        </ScrollView>
        <MyInfoModal
          isMyInfoModalOpen={isMyInfoModalOpen}
          setIsMyInfoModalOpen={setIsMyInfoModalOpen}
          data={mockUser.personalInfo}
          saveProfileImageToFirebase={saveProfileImageToFirebase}
        />
        {isSettingsModalOpen && (
          <SettingsModal
            isSettingsModalOpen={isSettingsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            data={mockUser.personalInfo}
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
