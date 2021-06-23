import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
// import { useQuery } from '@apollo/client';
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
// import LoadingScreen from '../loadingScreen/LoadingScreen';
import SettingsModal from '../mainMenu/SettingsModal';
import { saveProfileImageToFirebase } from '../../utils/firebase/saveProfileImageToFirebase';
import { getCorporateResources } from '../../utils/firebase/getCorporateResources';
// import { GET_USER } from '../../graphql/queries';
import AppContext from '../../contexts/AppContext';

const mockUser = {
  lastMonthPV: 150,
  thisMonthPV: 305,
  lastMonthQOV: 200000,
  thisMonthQOV: 350000,
  totalOv: 2224731,
  lastMonthPA: 1,
  thisMonthPA: 2,
  thisMonthCV: 256,
  leg1: 1190000,
  leg2: 115500,
  leg3: 115500,
  rank: {
    rankId: 10,
    minimumQoV: 350000,
    maximumPerLeg: 140000,
    legMaxPercentage: 40,
    requiredPv: 200,
    requiredPa: 2,
    rankName: Localized('Emerald'),
  },
  associate: {
    profileImageFileName: 'Sloane.Taylor.2f79ef5f-58d1-4358-b12b-2ab05e3e4dc8',
    profileUrl:
      'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FSloane.Taylor.94f93ae8-9b3d-4cf3-a7ee-3f213707ebc6?alt=media&token=52c072d4-62e1-4ab0-b4c4-3090fcb0d4e5',
    firstName: 'ETHAN',
    lastName: 'Taylor',
    displayName: 'sloanet',
    username: 'sloaniejoanie',
    email: 'sloanetaylor@gmail.com',
    primaryPhoneNumber: '801-435-9064',
    associateId: '12340987',
    address: {
      address1: '1234 S 5600 W',
      address2: '',
      city: 'Lehi',
      state: 'UT',
      zip: '84043',
      countryCode: 'us',
    },
  },
};

const DashboardScreen = ({ navigation }) => {
  const {
    setCorporateResources,
    deviceLanguage,
    userMarket,
    // user,
    // setUser,
  } = useContext(AppContext);
  initLanguage;
  const db = firebase.firestore();

  // const [getUser, { loading }] = useQuery(GET_USER, {
  //   errorPolicy: 'all',
  //   onCompleted: (data) => {
  //     console.log(`data`, data?.treeNodeFor);
  //     // setUser(data.treeNodeFor);
  //   },
  //   onError: (error) => console.log(error),
  // });

  const ranklist = [
    {
      legMaxPercentage: 0,
      maximumPerLeg: 0,
      id: 0,
      requiredPv: 0,
      requiredPa: 0,
      minimumQoV: 0,
      rankName: Localized('Distributor'),
    },
    {
      legMaxPercentage: 60,
      maximumPerLeg: 180,
      id: 1,
      requiredPv: 100,
      requiredPa: 2,
      minimumQoV: 300,
      rankName: Localized('Builder'),
    },
    {
      legMaxPercentage: 60,
      maximumPerLeg: 360,
      id: 2,
      requiredPv: 100,
      requiredPa: 2,
      minimumQoV: 600,
      rankName: Localized('Pro'),
    },
    {
      legMaxPercentage: 60,
      maximumPerLeg: 900,
      id: 3,
      requiredPv: 100,
      requiredPa: 2,
      minimumQoV: 1500,
      rankName: Localized('Executive'),
    },
    {
      legMaxPercentage: 50,
      maximumPerLeg: 2250,
      id: 4,
      requiredPv: 100,
      requiredPa: 2,
      minimumQoV: 4500,
      rankName: Localized('Elite'),
    },
    {
      legMaxPercentage: 50,
      maximumPerLeg: 5000,
      id: 5,
      requiredPv: 100,
      requiredPa: 2,
      minimumQoV: 10000,
      rankName: Localized('Bronze'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 10000,
      id: 6,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 25000,
      rankName: Localized('Silver'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 20000,
      id: 7,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 50000,
      rankName: Localized('Gold'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 40000,
      id: 8,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 100000,
      rankName: Localized('Platinum'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 80000,
      id: 9,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 200000,
      rankName: Localized('Ruby'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 140000,
      id: 10,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 350000,
      rankName: Localized('Emerald'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 200000,
      id: 11,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 500000,
      rankName: Localized('Diamond'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 300000,
      id: 12,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 750000,
      rankName: Localized('Blue Diamond'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 400000,
      id: 13,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 1000000,
      rankName: Localized('Black Diamond'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 600000,
      id: 14,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 1500000,
      rankName: Localized('Royal Diamond'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 800000,
      id: 15,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 2000000,
      rankName: Localized('Presidential Diamond'),
    },
    {
      legMaxPercentage: 40,
      maximumPerLeg: 1200000,
      id: 16,
      requiredPv: 200,
      requiredPa: 2,
      minimumQoV: 3000000,
      rankName: Localized('Crown Diamond'),
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

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <ScreenContainer style={{ justifyContent: 'flex-start', height: 'auto' }}>
        <MainHeader
          isMenuOpen={isMenuOpen}
          fadeIn={fadeIn}
          fadeOut={fadeOut}
          setIsMenuOpen={setIsMenuOpen}
          badgeValue={2}
          profileUrl={mockUser.associate.profileUrl}
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
          data={mockUser.associate}
          saveProfileImageToFirebase={saveProfileImageToFirebase}
        />
        {isSettingsModalOpen && (
          <SettingsModal
            isSettingsModalOpen={isSettingsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            data={mockUser.associate}
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
