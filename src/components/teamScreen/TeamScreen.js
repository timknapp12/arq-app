import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback, ScrollView } from 'react-native';
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
import AppContext from '../../contexts/AppContext';
import TeamScreenContext from '../../contexts/TeamScreenContext';
import TabButtonContext from '../../contexts/TabButtonContext';
import AtAGlanceView from './atAGlance/AtAGlanceView';
import MyTeamView from './myTeam/MyTeamView';
import LeaderboardView from './leaderboard/LeaderboardView';
import VisualTreeView from './visualTree/VisualTreeView';

const TeamScreen = ({ navigation, route }) => {
  const { legacyId } = useContext(AppContext);
  const { closeAddOptions } = useContext(TabButtonContext);

  const [legacyAssociateId, setLegacyAssociateId] = useState(legacyId);
  const [sortBy, setSortBy] = useState('ORGANIZATION');
  const [levelInTree, setLevelInTree] = useState(0);
  const [selectedVisualTreePane, setSelectedVisualTreePane] = useState(1);

  const [paneOneSearchId, setPaneOneSearchId] = useState(legacyId);
  const [paneTwoSearchId, setPaneTwoSearchId] = useState(0);
  const [paneThreeSearchId, setPaneThreeSearchId] = useState(0);
  const [paneOneSearchLevel, setPaneOneSearchLevel] = useState(0);
  const [paneTwoSearchLevel, setPaneTwoSearchLevel] = useState(0);
  const [paneThreeSearchLevel, setPaneThreeSearchLevel] = useState(0);

  useEffect(() => {
    if (route?.params?.searchId) {
      setLegacyAssociateId(route?.params?.searchId);
      setSortBy('ORGANIZATION');
      setLevelInTree(route?.params?.levelInTree);
    }
    return () => {
      setLegacyAssociateId(legacyId);
    };
  }, [route?.params?.searchId]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Team_Screen_Visited', {
        screen: 'Resources Screen',
        purpose: 'User navigated to Team Screen',
      });
    }
    return () => {
      closeMenus();
    };
  }, [isFocused]);

  const initialView = route?.params?.searchId
    ? { name: Localized('My Team').toUpperCase(), testID: 'my_team_button' }
    : {
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
      name: Localized('Visual Tree').toUpperCase(),
      testID: 'visual_tree_button',
    },
    // {
    //   name: Localized('Leaderboard').toUpperCase(),
    //   testID: 'Leaderboard_button',
    // },
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
  };

  const navigate = (item) => {
    // this is so android touches that bleed through the notifications window onto the tertiary buttons won't navigate
    closeMenus();
    setView(item);
    Analytics.logEvent(`${item?.testID}_tapped`, {
      screen: 'TeamScreen',
      purpose: `See details for ${item?.name}`,
    });
    if (item.testID === 'my_team_button') {
      setLegacyAssociateId(legacyId);
      setLevelInTree(0);
    }
  };

  const paneSearchIdMap = {
    1: setPaneOneSearchId,
    2: setPaneTwoSearchId,
    3: setPaneThreeSearchId,
  };

  const paneLevelMap = {
    1: setPaneOneSearchLevel,
    2: setPaneTwoSearchLevel,
    3: setPaneThreeSearchLevel,
  };

  const viewInVisualTree = (item) => {
    paneSearchIdMap[selectedVisualTreePane](item?.associate?.legacyAssociateId);
    paneLevelMap[selectedVisualTreePane](item?.depth - 1);
    navigation.navigate('Team Screen');
    setView({
      name: Localized('Visual Tree').toUpperCase(),
      testID: 'visual_tree_button',
    });
  };

  const viewInNewPane = (newPaneNumber, legacyAssociateId, level) => {
    paneSearchIdMap[newPaneNumber](legacyAssociateId);
    paneLevelMap[newPaneNumber](level);
    setSelectedVisualTreePane(newPaneNumber);
  };

  return (
    <TeamScreenContext.Provider
      value={{
        closeMenus,
        selectedMemberId: route?.params?.selectedMemberId,
        legacyAssociateId,
        setLegacyAssociateId,
        sortBy,
        setSortBy,
        levelInTree,
        setLevelInTree,
        selectedVisualTreePane,
        setSelectedVisualTreePane,
        paneOneSearchId,
        paneTwoSearchId,
        paneThreeSearchId,
        paneOneSearchLevel,
        paneTwoSearchLevel,
        paneThreeSearchLevel,
        viewInVisualTree,
        viewInNewPane,
      }}
    >
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
          <MainHeader
            isMenuOpen={isMenuOpen}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            setIsMenuOpen={setIsMenuOpen}
          />

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
          <Flexbox style={{ zIndex: 1 }}>
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
            <AtAGlanceView
              style={{
                display:
                  view.name === Localized('At A Glance').toUpperCase()
                    ? 'flex'
                    : 'none',
              }}
              onStartShouldSetResponder={() => true}
              closeMenus={closeMenus}
            />
          </ScrollView>
          {view.name === Localized('My Team').toUpperCase() && <MyTeamView />}
          <LeaderboardView
            style={{
              display:
                view.name === Localized('Leaderboard').toUpperCase()
                  ? 'flex'
                  : 'none',
            }}
            closeMenus={closeMenus}
          />

          <VisualTreeView
            style={{
              display:
                view.name === Localized('Visual Tree').toUpperCase()
                  ? 'flex'
                  : 'none',
            }}
          />
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
    </TeamScreenContext.Provider>
  );
};

TeamScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default TeamScreen;
