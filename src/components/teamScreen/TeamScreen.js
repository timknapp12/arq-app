import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
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
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
import NotificationsColumn from '../notifications/NotificationsColumn';
import LoginContext from '../../contexts/LoginContext';
import TabButtonContext from '../../contexts/TabButtonContext';
import AtAGlanceView from './atAGlance/AtAGlanceView';
import MyTeamView from './myTeam/MyTeamView';

const TeamScreen = ({ navigation }) => {
  const { setDisplayNotifications, displayNotifications } =
    useContext(LoginContext);
  const { closeAddOptions } = useContext(TabButtonContext);

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
      setDisplayNotifications(false);
    };
  }, [isFocused]);

  const initialView = {
    name: Localized('At A Glance').toUpperCase(),
    testID: 'At_A_Glance_button',
  };
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    {
      name: Localized('At A Glance').toUpperCase(),
      testID: 'At_A_Glance_button',
    },
    { name: Localized('My Team').toUpperCase(), testID: 'my_team_button' },
    {
      name: Localized('Leaderboard').toUpperCase(),
      testID: 'Leaderboard_button',
    },
    // { name: Localized('FAVORITES'), testID: 'favorites_button' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    // touch events bleed through the notifications and menu on android so this will prevent the action from happening when a touch event happens on the side menu or notifications window on android
    Platform.OS === 'ios' && setDisplayNotifications(false);
  };

  const navigate = (item) => {
    // this is so android touches that bleed through the notifications window onto the tertiary buttons won't navigate
    if (displayNotifications) {
      return;
    }
    closeMenus();
    setDisplayNotifications(false);
    setView(item);
    Analytics.logEvent(`${item?.testID}_tapped`, {
      screen: 'TeamScreen',
      purpose: `See details for ${item?.name}`,
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        closeMenus();
      }}
    >
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          height: '100%',
        }}
      >
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
              key={item?.name}
            >
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            paddingBottom: 30,
          }}
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        >
          {view.name === Localized('At A Glance').toUpperCase() && (
            <AtAGlanceView
              onStartShouldSetResponder={() => true}
              closeMenus={closeMenus}
            />
          )}
        </ScrollView>
        {view.name === Localized('My Team').toUpperCase() && <MyTeamView />}
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

TeamScreen.propTypes = {
  navigation: PropTypes.object,
};

export default TeamScreen;
