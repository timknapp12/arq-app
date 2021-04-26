import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import {
  ScreenContainer,
  TertiaryButton,
  TopButtonBar,
  Flexbox,
  H3,
} from '../common';
import MainHeader from '../mainHeader/MainHeader';
import { Localized } from '../../translations/Localized';
import FilterSearchBar from './FilterSearchBar';
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
// TODO remove this once we get real data
import { mockUser } from '../common/mockUser';
import CorporateView from './CorporateView';
import TeamView from './TeamView';
import ServicesView from './ServicesView';
import FavoritesView from './FavoritesView';
import DownloadsView from './DownloadsView';
import { saveProfileImageToFirebase } from '../../utils/saveToFirebase';

const { height } = Dimensions.get('window');
const topOfView = Platform.OS === 'ios' ? 140 : 80;

const AddButton = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${height - topOfView}px;
  right: 10px;
`;

const ButtonText = styled(H3)`
  font-family: 'Avenir-Black';
`;

const ResourcesScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Resources_Screen_Visited', {
        screen: 'Resources Screen',
        purpose: 'User iond to Resources Screen',
      });
    }
  }, [isFocused]);

  const initialView = {
    name: Localized('CORPORATE'),
    testID: 'corporate_button',
  };
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        {view.name === Localized('CORPORATE') && (
          <CorporateView navigation={navigation} />
        )}
        {view.name === Localized('TEAM') && (
          <>
            <TeamView
              navigation={navigation}
              isAddFolderModalOpen={isAddFolderModalOpen}
              setIsAddFolderModalOpen={setIsAddFolderModalOpen}
            />
            <AddButton onPress={() => setIsAddFolderModalOpen(true)}>
              <ButtonText>+</ButtonText>
            </AddButton>
          </>
        )}
        {view.name === Localized('SERVICES') && <ServicesView />}
        {view.name === Localized('FAVORITES') && <FavoritesView />}
        {view.name === Localized('DOWNLOADS') && <DownloadsView />}
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

ResourcesScreen.propTypes = { navigation: PropTypes.object };

export default ResourcesScreen;
