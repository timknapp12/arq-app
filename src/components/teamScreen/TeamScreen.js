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
import DragNDropTest from './DragNDropTest';

const TeamScreen = ({ navigation }) => {
  const { legacyId } = useContext(AppContext);
  const { closeAddOptions } = useContext(TabButtonContext);

  const [legacyAssociateId, setLegacyAssociateId] = useState(legacyId);
  const [sortBy, setSortBy] = useState('ORGANIZATION');
  const [levelInTree, setLevelInTree] = useState(0);
  const [selectedVisualTreePane, setSelectedVisualTreePane] = useState(1);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const [pane1SearchId, setPane1SearchId] = useState(legacyId);
  const [pane2SearchId, setPane2SearchId] = useState(0);
  const [pane3SearchId, setPane3SearchId] = useState(0);
  const [pane1SearchLevel, setPane1SearchLevel] = useState(0);
  const [pane2SearchLevel, setPane2SearchLevel] = useState(0);
  const [pane3SearchLevel, setPane3SearchLevel] = useState(0);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Team_Screen_visited', {
        screen: 'Resources Screen',
        purpose: 'User navigated to Team Screen',
      });
    }
    return () => {
      closeMenus();
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
      name: Localized('Visual Tree').toUpperCase(),
      testID: 'visual_tree_button',
    },
    {
      name: Localized('Leaderboard').toUpperCase(),
      testID: 'Leaderboard_button',
    },
    // {
    //   name: 'DragNDropTest',
    //   testID: 'drag_n_drop_test',
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
    1: setPane1SearchId,
    2: setPane2SearchId,
    3: setPane3SearchId,
  };

  const paneLevelMap = {
    1: setPane1SearchLevel,
    2: setPane2SearchLevel,
    3: setPane3SearchLevel,
  };

  const viewInVisualTree = (item) => {
    paneSearchIdMap[selectedVisualTreePane](item?.associate?.legacyAssociateId);
    paneLevelMap[selectedVisualTreePane](item?.depth - 1);
    Analytics.logEvent('view_downline_in_visual_tree');
    navigation.navigate('Team Screen');
    setView({
      name: Localized('Visual Tree').toUpperCase(),
      testID: 'visual_tree_button',
    });
  };

  const viewInNewPane = (newPaneNumber, legacyAssociateId, level) => {
    Analytics.logEvent(`view_in_new_visual_tree_window_${newPaneNumber}`);
    paneSearchIdMap[newPaneNumber](legacyAssociateId);
    paneLevelMap[newPaneNumber](level);
    setSelectedVisualTreePane(newPaneNumber);
  };

  const viewInMyTeamView = (uplineId, memberId, level) => {
    setSortBy('ORGANIZATION');
    setLegacyAssociateId(uplineId);
    setSelectedMemberId(memberId);
    setLevelInTree(level);
    Analytics.logEvent('view_downline_in_my_team_section');
    navigation.navigate('Team Screen');
    setView({
      name: Localized('My Team').toUpperCase(),
      testID: 'my_team_button',
    });
  };

  return (
    <TeamScreenContext.Provider
      value={{
        closeMenus,
        selectedMemberId,
        legacyAssociateId,
        setLegacyAssociateId,
        sortBy,
        setSortBy,
        levelInTree,
        setLevelInTree,
        selectedVisualTreePane,
        setSelectedVisualTreePane,
        pane1SearchId,
        pane2SearchId,
        pane3SearchId,
        pane1SearchLevel,
        pane2SearchLevel,
        pane3SearchLevel,
        viewInVisualTree,
        viewInNewPane,
        viewInMyTeamView,
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
          {view.name === 'DragNDropTest' && <DragNDropTest />}
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
};

export default TeamScreen;
