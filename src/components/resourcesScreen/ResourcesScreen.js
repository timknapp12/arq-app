import React, { useEffect, useState, useRef } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
// Components
import {
  ScreenContainer,
  H4,
  TertiaryButton,
  TopButtonBar,
  Input,
} from '../common';
import MainHeader from '../mainHeader/MainHeader';
import { Localized } from '../../translations/Localized';
// Mock Data
import { mockUser } from '../common/mockUser';
// Styles
// import { StyledScroll } from './ResourceScreen.styles';
// Resources
import { FilterIcon } from '../common/icons';

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
      <View>
        <FilterIcon />
        <TouchableOpacity>
          <Input clearButtonMode="always" />
          <H4>This is search bar</H4>
        </TouchableOpacity>
      </View>
      <H4>Resources Screen</H4>
      <H4 testID="resources-screen-description">
        Welcome to the Resources Screen
      </H4>
    </ScreenContainer>
  );
};

export default ResourcesScreen;
