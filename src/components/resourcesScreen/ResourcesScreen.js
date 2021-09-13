import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import {
  ScreenContainer,
  TertiaryButton,
  TopButtonBar,
  Flexbox,
  AddButton,
  ButtonText,
} from '../common';
import MainHeader from '../mainHeader/MainHeader';
import { Localized, initLanguage } from '../../translations/Localized';
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
import NotificationsColumn from '../notifications/NotificationsColumn';
import CorporateView from './corporateView/CorporateView';
import TeamView from './teamView/TeamView';
import ServicesView from './ServicesView';
import FavoritesView from './FavoritesView';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';

const ResourcesScreen = ({ navigation }) => {
  initLanguage();
  const { hasPermissions } = useContext(AppContext);
  const { setDisplayNotifications } = useContext(LoginContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Resources_Screen_Visited', {
        screen: 'Resources Screen',
        purpose: 'User iond to Resources Screen',
      });
    }
    return () => {
      closeMenus();
    };
  }, [isFocused]);

  const initialView = {
    name: Localized('Corporate').toUpperCase(),
    testID: 'corporate_button',
  };
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  const [isOwner, setIsOwner] = useState(false);

  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('Corporate').toUpperCase(), testID: 'corporate_button' },
    { name: Localized('Team').toUpperCase(), testID: 'team_button' },
    { name: Localized('Services').toUpperCase(), testID: 'services_button' },
    // { name: Localized('FAVORITES'), testID: 'favorites_button' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);

  const fadeAnim = useRef(new Animated.Value(-500)).current;
  const teamFadeAnim = useRef(new Animated.Value(-500)).current;

  const fadeIn = () => {
    setIsMenuOpen(true);
    closeTeamMenu();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    closeTeamMenu();
    Animated.timing(fadeAnim, {
      toValue: -500,
      duration: 700,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  const openTeamMenu = () => {
    // touch events on android bleed through to underlying elements, so this prevents the default touch event if a menu item is touched
    if (isMenuOpen) {
      return;
    }
    setIsTeamMenuOpen(true);
    Animated.timing(teamFadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const closeTeamMenu = () => {
    // touch events on android bleed through to underlying elements, so this prevents the default touch event if a menu item is touched
    if (isMenuOpen) {
      return;
    }
    Animated.timing(teamFadeAnim, {
      toValue: -500,
      duration: 700,
      useNativeDriver: false,
    }).start(() => setIsTeamMenuOpen(false));
  };

  const closeMenus = () => {
    fadeOut();
    setDisplayNotifications(false);
  };

  const navigate = (item) => {
    closeMenus();
    setView(item);
    Analytics.logEvent(`${item?.testID}_tapped`, {
      screen: 'ResourcesScreen',
      purpose: `See details for ${item?.name}`,
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsCalloutOpenFromParent(false);
        closeMenus();
      }}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          height: '100%',
        }}>
        <Flexbox style={{ zIndex: 2 }}>
          <MainHeader
            isMenuOpen={isMenuOpen}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            setIsMenuOpen={setIsMenuOpen}
          />
          <NotificationsColumn />
        </Flexbox>

        <TopButtonBar>
          {tertiaryButtonText.map((item) => (
            <TertiaryButton
              style={{ marginRight: 15 }}
              onPress={() => navigate(item)}
              selected={view.name === item?.name}
              key={item?.name}>
              {item?.name}
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
        {view.name === Localized('Corporate').toUpperCase() && (
          <CorporateView
            closeMenus={closeMenus}
            navigation={navigation}
            isMenuOpen={isMenuOpen}
          />
        )}
        {view.name === Localized('Team').toUpperCase() && (
          <TeamView
            closeMenus={closeMenus}
            navigation={navigation}
            isCalloutOpenFromParent={isCalloutOpenFromParent}
            setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
            isAddFolderModalOpen={isAddFolderModalOpen}
            setIsAddFolderModalOpen={setIsAddFolderModalOpen}
            openTeamMenu={openTeamMenu}
            closeTeamMenu={closeTeamMenu}
            isTeamMenuOpen={isTeamMenuOpen}
            teamFadeAnim={teamFadeAnim}
            isMenuOpen={isMenuOpen}
            isOwner={isOwner}
            setIsOwner={setIsOwner}
          />
        )}
        {view.name === Localized('Services').toUpperCase() && (
          <ServicesView closeMenus={closeMenus} />
        )}
        {view.name === Localized('Favorites').toUpperCase() && (
          <FavoritesView />
        )}
        {view.name === Localized('Team').toUpperCase() &&
          hasPermissions &&
          isOwner && (
            <AddButton
              bottom="10px"
              onPress={() => {
                setIsAddFolderModalOpen(true);
                setIsCalloutOpenFromParent(false);
              }}>
              <ButtonText>+</ButtonText>
            </AddButton>
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
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ResourcesScreen.propTypes = {
  navigation: PropTypes.object,
  fadeOut: PropTypes.func,
};

export default ResourcesScreen;
