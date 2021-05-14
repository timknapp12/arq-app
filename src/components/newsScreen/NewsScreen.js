import React, { useEffect, useContext, useRef, useState } from 'react';
import {
  ScreenContainer,
  Flexbox,
  TertiaryButton,
  TopButtonBar,
} from '../common';
import { Animated, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { MainScrollView } from '../common';
import { useIsFocused } from '@react-navigation/native';
import MainHeader from '../mainHeader/MainHeader';
import * as Analytics from 'expo-firebase-analytics';
import AppContext from '../../contexts/AppContext';
import FeaturedNewsCard from './FeaturedNewsCard';
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
import { saveProfileImageToFirebase } from '../../utils/firebase/saveProfileImageToFirebase';
import { Localized, initLanguage } from '../../translations/Localized';
import NewsCardMap from './NewsCardMap';
// TODO remove this once we get real data
import { mockUser } from '../common/mockUser';
import { mockNews } from './mockNews';

const NewsScreen = () => {
  initLanguage();
  const { storeTimeStamp } = useContext(AppContext);
  storeTimeStamp();
  const isFocused = useIsFocused();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('News_Screen_Visited', {
        screen: 'News Screen',
        purpose: 'User navigated to News Screen',
      });
    }
  }, [isFocused]);

  const initialView = {
    name: Localized('Q NEWS'),
    testID: 'Q_NEWS_button',
  };
  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('Q NEWS'), testID: 'Q_NEWS_button' },
    { name: Localized('BLOG'), testID: 'blog_button' },
    { name: Localized('EVENTS'), testID: 'events_button' },
  ];

  const navigate = (item) => {
    fadeOut();
    setView(item);
    Analytics.logEvent(`${item.testID}_tapped`, {
      screen: 'NewsScreen',
      purpose: `See details for ${item.name}`,
    });
  };

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

  return (
    <TouchableWithoutFeedback onPress={fadeOut}>
      <ScreenContainer style={{ justifyContent: 'flex-start' }}>
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
            contentContainerStyle={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              minWidth: '100%',
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
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
        {view.name === Localized('Q NEWS') && (
          // each view needs its own scrollview so the scrolling on one view does not persist when the user changes the view
          <MainScrollView>
            <FeaturedNewsCard
              url={mockNews.qnews.featured.url}
              title={mockNews.qnews.featured.title}
              body={mockNews.qnews.featured.body}
            />
            <NewsCardMap items={mockNews.qnews.storyList} />
          </MainScrollView>
        )}
        {view.name === Localized('BLOG') && (
          <MainScrollView>
            <NewsCardMap items={mockNews.blog.storyList} />
          </MainScrollView>
        )}
        {view.name === Localized('EVENTS') && (
          <MainScrollView>
            <NewsCardMap items={mockNews.events.storyList} />
          </MainScrollView>
        )}
        {isMyInfoModalOpen && (
          <MyInfoModal
            isMyInfoModalOpen={isMyInfoModalOpen}
            setIsMyInfoModalOpen={setIsMyInfoModalOpen}
            data={mockUser.personalInfo}
            saveProfileImageToFirebase={saveProfileImageToFirebase}
          />
        )}
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

export default NewsScreen;
