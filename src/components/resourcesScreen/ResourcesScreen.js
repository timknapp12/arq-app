import React, { useEffect, useState, useRef } from 'react';
import { Animated, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
// Components
import { ScreenContainer, H4, TertiaryButton, TopButtonBar } from '../common';
import MainHeader from '../mainHeader/MainHeader';
import { Localized } from '../../translations/Localized';
import FilterSearchBar from './FilterSearchBar';
// Mock Data
import { mockUser } from '../common/mockUser';
import { ResourcesCard } from '../common/cards';
// Styles
// import { StyledScroll } from './ResourceScreen.styles';

const ResourcesScreen = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Resources_Screen_Visited', {
        screen: 'Resources Screen',
        purpose: 'User navigated to Resources Screen',
      });
    }
  }, [isFocused]);

  const initialView = {
    name: Localized('OVERVIEW'),
    testID: 'overview-button',
  };

  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('CORPORATE'), testID: 'corporate_button' },
    { name: Localized('TEAM'), testID: 'team_button' },
    { name: Localized('SERVICES'), testID: 'services_button' },
    { name: Localized('FAVORITES'), testID: 'favorites_button' },
    { name: Localized('DOWNLOADS'), testID: 'downloads_button' },
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
      screen: 'ResourcesScreen',
      purpose: `See details for ${item.name}`,
    });
  };
  return (
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: 580,
          }}>
          {tertiaryButtonText.map((item) => (
            <TertiaryButton
              style={{ marginRight: 15 }}
              onPress={() => navigate(item)}
              selected={view.name === item.name}
              key={item.name}>
              {item.name}
            </TertiaryButton>
          ))}
        </ScrollView>
      </TopButtonBar>
      <FilterSearchBar userName={mockUser.personalInfo.displayName} />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <ResourcesCard>
          <H4>Card 1</H4>
        </ResourcesCard>
        <ResourcesCard />
        <ResourcesCard full />
        <ResourcesCard />
        <ResourcesCard />
        <ResourcesCard full />
        <ResourcesCard />
        <ResourcesCard />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesScreen;
