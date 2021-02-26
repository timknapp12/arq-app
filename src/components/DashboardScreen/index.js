import React, { useEffect, useState } from 'react';
import { ScreenContainer, TertiaryButton } from '../Common';
import DashboardHeader from './DashboardHeader';
import Subheader from './Subheader';
import * as Analytics from 'expo-firebase-analytics';
import { Localized, init } from '../../Translations/Localized';
import { useIsFocused } from '@react-navigation/native';
import Overview from './Overview';
import Rank from './Rank';
import OVDetail from './OVDetail';

const mockUser = {
  lastMonthPV: 100,
  thisMonthPV: 85,
  lastMonthOV: 225,
  thisMonthOV: 400,
  lastMonthPA: 1,
  thisMonthPA: 2,
  thisMonthCV: 256,
  thisMonthLeg1Used: 160,
  thisMonthLeg2Used: 100,
  thisMonthLeg3Used: 100,
};

const DashboardScreen = () => {
  init();
  const ranklist = [
    {
      legMaxPerc: 0,
      legMaxOv: 0,
      id: 0,
      requiredPv: 0,
      requiredQov: 0,
      name: Localized('distributor'),
    },
    {
      legMaxPerc: 60,
      legMaxOv: 180,
      id: 1,
      requiredPv: 100,
      requiredQov: 300,
      name: Localized('builder'),
    },
    {
      legMaxPerc: 60,
      legMaxOv: 360,
      id: 2,
      requiredPv: 100,
      requiredQov: 600,
      name: Localized('pro'),
    },
    {
      legMaxPerc: 60,
      legMaxOv: 900,
      id: 3,
      requiredPv: 100,
      requiredQov: 1500,
      name: Localized('executive'),
    },
    {
      legMaxPerc: 50,
      legMaxOv: 2250,
      id: 4,
      requiredPv: 100,
      requiredQov: 4500,
      name: Localized('elite'),
    },
    {
      legMaxPerc: 50,
      legMaxOv: 5000,
      id: 5,
      requiredPv: 100,
      requiredQov: 10000,
      name: Localized('bronze'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 10000,
      id: 6,
      requiredPv: 200,
      requiredQov: 25000,
      name: Localized('silver'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 20000,
      id: 7,
      requiredPv: 200,
      requiredQov: 50000,
      name: Localized('gold'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 40000,
      id: 8,
      requiredPv: 200,
      requiredQov: 100000,
      name: Localized('platinum'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 80000,
      id: 9,
      requiredPv: 200,
      requiredQov: 200000,
      name: Localized('ruby'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 140000,
      id: 10,
      requiredPv: 200,
      requiredQov: 350000,
      name: Localized('emerald'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 200000,
      id: 11,
      requiredPv: 200,
      requiredQov: 500000,
      name: Localized('diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 300000,
      id: 12,
      requiredPv: 200,
      requiredQov: 750000,
      name: Localized('blue-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 400000,
      id: 13,
      requiredPv: 200,
      requiredQov: 1000000,
      name: Localized('black-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 600000,
      id: 14,
      requiredPv: 200,
      requiredQov: 1500000,
      name: Localized('royal-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 800000,
      id: 15,
      requiredPv: 200,
      requiredQov: 2000000,
      name: Localized('presidential-diamond'),
    },
    {
      legMaxPerc: 40,
      legMaxOv: 1200000,
      id: 16,
      requiredPv: 200,
      requiredQov: 3000000,
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
    { name: Localized('overview'), testID: 'overview-button' },
    { name: Localized('rank'), testID: 'rank-button' },
    { name: Localized('ov-detail'), testID: 'ov-detail-button' },
  ];

  return (
    <ScreenContainer style={{ justifyContent: 'flex-start' }}>
      <DashboardHeader badgeValue={2} />
      <Subheader>
        {tertiaryButtonText.map((item) => (
          <TertiaryButton
            onPress={() => setView(item)}
            selected={view.name === item.name}
            key={item.name}>
            {item.name}
          </TertiaryButton>
        ))}
      </Subheader>
      {view.name === Localized('overview') && <Overview user={mockUser} />}
      {view.name === Localized('rank') && (
        <Rank ranklist={ranklist} user={mockUser} />
      )}
      {view.name === Localized('ov-detail') && (
        <OVDetail ranklist={ranklist} user={mockUser} />
      )}
    </ScreenContainer>
  );
};

export default DashboardScreen;
