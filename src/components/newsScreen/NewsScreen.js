import React, { useEffect, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
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
  H5,
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
import TabButtonContext from '../../contexts/TabButtonContext';
import { Localized } from '../../translations/Localized';

const FlagIcon = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin: 8px 12px;
`;

const NewsScreen = ({ navigation }) => {
  const { theme } = useContext(AppContext);
  const { userMarket, markets, setMarketId, loadingNews, news } =
    useContext(LoginContext);
  const { closeAddOptions } = useContext(TabButtonContext);

  const isFocused = useIsFocused();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('');
  const initialMarketUrl = markets?.[0]?.pictureUrl ?? '';
  const [marketUrl, setMarketUrl] = useState(initialMarketUrl);

  useEffect(() => {
    if (userMarket) {
      setSelectedMarket(userMarket.countryCode);
    }
  }, [userMarket]);

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
    return () => {
      closeMenus();
    };
  }, [isFocused]);

  const [view, setView] = useState({});
  useEffect(() => {
    if (news) {
      setView(news?.[0]);
    }
  }, [marketUrl]);

  const navigate = (item) => {
    closeMenus();
    setView(item);
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item?.folderName.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
      screen: 'NewsScreen',
      purpose: `See details for ${item?.name}`,
    });
  };

  const fadeAnim = useRef(new Animated.Value(-500)).current;

  const fadeIn = () => {
    setIsMenuOpen(true);
    closeAddOptions();
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
    closeAddOptions();
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenus}>
      <ScreenContainer style={{ justifyContent: 'flex-start' }}>
        <MainHeader
          isMenuOpen={isMenuOpen}
          fadeIn={fadeIn}
          fadeOut={fadeOut}
          setIsMenuOpen={setIsMenuOpen}
        />

        <TopButtonBar>
          {news?.map((item) => (
            <TertiaryButton
              style={{ marginRight: 15 }}
              onPress={() => navigate(item)}
              selected={view?.folderName === item?.folderName}
              key={item?.folderId}
            >
              {item?.folderName.toUpperCase()}
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
            onPress={() => {
              setIsMarketModalOpen(true);
              closeAddOptions();
            }}
          >
            <FlagIcon
              key={marketUrl}
              source={{
                uri: marketUrl,
              }}
            />
          </TouchableOpacity>
        </Flexbox>

        {loadingNews ? (
          <ActivityIndicator
            size="large"
            color={theme.disabledBackgroundColor}
          />
        ) : (
          <MainScrollView>
            {view?.links?.length > 0 ? (
              <FeaturedNewsCard
                key={view?.links?.[0]?.linkId}
                linkId={view?.links?.[0]?.linkId}
                url={view?.links?.[0]?.linkUrl}
                imageUrl={view?.links?.[0]?.imageUrl}
                title={view?.links?.[0]?.linkTitle}
                body={view?.links?.[0]?.linkDescription}
                isRead={view?.links?.[0]?.isViewedByAssociate}
                isMenuOpen={isMenuOpen}
                closeMenus={closeMenus}
              />
            ) : (
              <Flexbox padding={20}>
                <H5 style={{ textAlign: 'center' }}>
                  {Localized(
                    'There are no news items at this time - Please check back later',
                  )}
                </H5>
              </Flexbox>
            )}
            <NewsCardMap
              items={view?.links ?? []}
              isMenuOpen={isMenuOpen}
              closeMenus={closeMenus}
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
