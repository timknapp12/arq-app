import React, { useEffect, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  ScreenContainer,
  Flexbox,
  TertiaryButton,
  TopButtonBar,
} from '../common';
import {
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import { useIsFocused } from '@react-navigation/native';
import { MainScrollView } from '../common';
import MainHeader from '../mainHeader/MainHeader';
import FeaturedNewsCard from './FeaturedNewsCard';
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
import MarketModal from '../marketModal/MarketModal';
import { findMarketUrl } from '../../utils/markets/findMarketUrl';
import { Localized, initLanguage } from '../../translations/Localized';
import NewsCardMap from './NewsCardMap';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
// TODO remove this once we get real data
import { mockNews } from './mockNews';

const FlagIcon = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin: 8px 12px;
`;

const NewsScreen = ({ navigation }) => {
  initLanguage();
  const { userMarket } = useContext(AppContext);
  const { markets } = useContext(LoginContext);
  const isFocused = useIsFocused();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(userMarket.countryCode);
  const initialMarketUrl = markets[0]?.pictureUrl ?? '';
  const [marketUrl, setMarketUrl] = useState(initialMarketUrl);

  useEffect(() => {
    if (selectedMarket) {
      setMarketUrl(findMarketUrl(selectedMarket, markets));
    }
  }, [selectedMarket]);

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
    { name: Localized('IN THE QUEUE'), testID: 'queue_button' },
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
            isMenuOpen={isMenuOpen}
            fadeOut={fadeOut}
            setIsMyInfoModalOpen={setIsMyInfoModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            navigation={navigation}
          />
        </Flexbox>
        <Flexbox style={{ zIndex: -1 }} align="flex-start">
          <TouchableOpacity
            disabled={isMenuOpen}
            onPress={() => setIsMarketModalOpen(true)}>
            <FlagIcon
              source={{
                uri: marketUrl,
              }}
            />
          </TouchableOpacity>
        </Flexbox>
        {view.name === Localized('Q NEWS') && (
          // each view needs its own scrollview so the scrolling on one view does not persist when the user changes the view
          <MainScrollView>
            <FeaturedNewsCard
              url={mockNews.qnews.featured.url}
              title={mockNews.qnews.featured.title}
              body={mockNews.qnews.featured.body}
              isMenuOpen={isMenuOpen}
              fadeOut={fadeOut}
            />
            <NewsCardMap
              items={mockNews.qnews.storyList}
              isMenuOpen={isMenuOpen}
              fadeOut={fadeOut}
            />
          </MainScrollView>
        )}
        {view.name === Localized('BLOG') && (
          <MainScrollView>
            <FeaturedNewsCard
              url={mockNews.blog.featured.url}
              title={mockNews.blog.featured.title}
              body={mockNews.blog.featured.body}
              isMenuOpen={isMenuOpen}
              fadeOut={fadeOut}
            />
            <NewsCardMap
              items={mockNews.blog.storyList}
              isMenuOpen={isMenuOpen}
              fadeOut={fadeOut}
            />
          </MainScrollView>
        )}
        {view.name === Localized('IN THE QUEUE') && (
          <MainScrollView>
            <FeaturedNewsCard
              url={mockNews.events.featured.url}
              title={mockNews.events.featured.title}
              body={mockNews.events.featured.body}
              isMenuOpen={isMenuOpen}
              fadeOut={fadeOut}
            />
            <NewsCardMap
              items={mockNews.events.storyList}
              isMenuOpen={isMenuOpen}
              fadeOut={fadeOut}
            />
          </MainScrollView>
        )}
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
          />
        )}
        {isMarketModalOpen && (
          <MarketModal
            visible={isMarketModalOpen}
            onClose={() => setIsMarketModalOpen(false)}
            context="news"
            items={markets}
            value={selectedMarket}
            onValueChange={(value) => setSelectedMarket(value)}
          />
        )}
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

NewsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default NewsScreen;
