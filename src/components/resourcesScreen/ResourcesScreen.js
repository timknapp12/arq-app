import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import {
  ScreenContainer,
  TertiaryButton,
  TopButtonBar,
  Flexbox,
} from '../common';
import MainHeader from '../mainHeader/MainHeader';
import { Localized } from '../../translations/Localized';
import FilterSearchBar from './FilterSearchBar';
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
import { mockUser } from '../common/mockUser';
import { ResourcesCard } from '../common/cards';
import { saveProfileImageToFirebase } from '../../utils/saveToFirebase';

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
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

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
        <Flexbox>
          <PopoutMenu
            fadeAnim={fadeAnim}
            isMenuOpen={isMenuOpen}
            fadeOut={fadeOut}
            setIsMyInfoModalOpen={setIsMyInfoModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
          />
        </Flexbox>
        <FilterSearchBar userName={mockUser.personalInfo.displayName} />
        <ScrollView
          onStartShouldSetResponder={() => true}
          style={{ zIndex: -1, width: '100%' }}
          contentContainerStyle={{
            backgroundColor: 'red',
            paddingBottom: 100,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 10,
            }}
            onStartShouldSetResponder={() => true}>
            <ResourcesCard source="https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/resources%2Fcompensation_355x176.jpg?alt=media&token=e905eef7-7b20-4e0e-8083-e0c029f526cf"></ResourcesCard>
            <ResourcesCard />
            <ResourcesCard isLayoutWide />
            <ResourcesCard />
            <ResourcesCard />
            <ResourcesCard isLayoutWide />
            <ResourcesCard />
            <ResourcesCard />
          </View>
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

export default ResourcesScreen;
