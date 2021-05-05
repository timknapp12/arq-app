import React, { useEffect, useState, useRef, useContext } from 'react';
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
  H5,
} from '../common';
import MainHeader from '../mainHeader/MainHeader';
import { Localized, initLanguage } from '../../translations/Localized';
import FilterSearchBar from './FilterSearchBar';
import PopoutMenu from '../mainMenu/PopoutMenu';
import MyInfoModal from '../mainMenu/MyInfoModal';
import SettingsModal from '../mainMenu/SettingsModal';
import FilterIcon from '../../../assets/icons/filter-icon.svg';
// TODO remove this once we get real data
import { mockUser } from '../common/mockUser';
import CorporateView from './CorporateView';
import TeamView from './TeamView';
import ServicesView from './ServicesView';
import FavoritesView from './FavoritesView';
import AppContext from '../../contexts/AppContext';
import { saveProfileImageToFirebase } from '../../utils/firebase/saveProfileImageToFirebase';

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
  right: 12px;
`;

const ButtonText = styled(H3)`
  font-family: 'Avenir-Black';
`;

const ResourcesScreen = ({ navigation }) => {
  initLanguage();
  const { theme, storeTimeStamp } = useContext(AppContext);
  storeTimeStamp();
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
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('CORPORATE'), testID: 'corporate_button' },
    { name: Localized('TEAM'), testID: 'team_button' },
    { name: Localized('SERVICES'), testID: 'services_button' },
    // { name: Localized('FAVORITES'), testID: 'favorites_button' },
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
    <TouchableWithoutFeedback
      onPress={() => {
        setIsCalloutOpenFromParent(false);
        fadeOut();
      }}>
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 220,
          }}
          style={{
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}>
          {view.name === Localized('CORPORATE') && (
            <CorporateView fadeOut={fadeOut} navigation={navigation} />
          )}
          {view.name === Localized('TEAM') && (
            <>
              <FilterSearchBar>
                <Flexbox direction="row" width="auto">
                  <FilterIcon
                    style={{
                      height: 30,
                      width: 30,
                      color: theme.primaryTextColor,
                      marginTop: -2,
                    }}
                  />
                  <H5>Team Awesome!</H5>
                </Flexbox>
              </FilterSearchBar>
              <TeamView
                fadeOut={fadeOut}
                navigation={navigation}
                isCalloutOpenFromParent={isCalloutOpenFromParent}
                setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                isAddFolderModalOpen={isAddFolderModalOpen}
                setIsAddFolderModalOpen={setIsAddFolderModalOpen}
              />
            </>
          )}
          {view.name === Localized('SERVICES') && <ServicesView />}
          {view.name === Localized('FAVORITES') && <FavoritesView />}
        </ScrollView>
        {view.name === Localized('TEAM') && (
          <AddButton
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

ResourcesScreen.propTypes = {
  navigation: PropTypes.object,
  fadeOut: PropTypes.func,
};

export default ResourcesScreen;
