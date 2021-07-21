import React, { useEffect, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';
import {
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  ScreenContainer,
  Flexbox,
  TertiaryButton,
  TopButtonBar,
} from '../common';
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
import { findMarketId } from '../../utils/markets/findMarketId';
import NewsCardMap from './NewsCardMap';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
// TODO remove this once we get real data
import { newsResources } from './mockNews';
import { GET_NEWS } from '../../graphql/queries';

const FlagIcon = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin: 8px 12px;
`;

const NewsScreen = ({ navigation }) => {
  const { userMarket, associateId, theme } = useContext(AppContext);
  const { markets } = useContext(LoginContext);
  const isFocused = useIsFocused();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(userMarket.countryCode);
  const initialMarketUrl = markets?.[0]?.pictureUrl ?? '';
  const [marketUrl, setMarketUrl] = useState(initialMarketUrl);
  const [marketId, setMarketId] = useState(userMarket.countryId);

  useEffect(() => {
    if (selectedMarket && markets) {
      setMarketUrl(findMarketUrl(selectedMarket, markets));
      setMarketId(findMarketId(selectedMarket, markets));
    }
  }, [selectedMarket, markets]);

  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('News_Screen_Visited', {
        screen: 'News Screen',
        purpose: 'User navigated to News Screen',
      });
    }
  }, [isFocused]);

  const initialView = newsResources?.[0];
  const [view, setView] = useState(initialView);

  const navigate = (item) => {
    fadeOut();
    setView(item);
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.folderName.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
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

  const variables = { associateId, countries: marketId };
  console.log(`variables`, variables);
  const { loading, data } = useQuery(GET_NEWS, {
    variables: variables,
  });

  console.log(`data in news screen:`, data);

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
          {newsResources.map((item) => (
            <TertiaryButton
              style={{ marginRight: 15 }}
              onPress={() => navigate(item)}
              selected={view.folderName === item.folderName}
              key={item.folderId}>
              {item.folderName.toUpperCase()}
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

        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.disabledBackgroundColor}
          />
        ) : (
          <MainScrollView>
            <FeaturedNewsCard
              key={view?.links?.[0]?.linkId}
              url={view?.links?.[0]?.linkUrl}
              title={view?.links?.[0]?.linkTitle}
              body={view?.links?.[0]?.linkDescription}
              isMenuOpen={isMenuOpen}
              fadeOut={fadeOut}
            />
            <NewsCardMap
              items={view?.links ?? []}
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
