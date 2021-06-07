import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Analytics from 'expo-firebase-analytics';
import { useIsFocused } from '@react-navigation/native';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  ScreenContainer,
  H4,
  TertiaryButton,
  TopButtonBar,
  Flexbox,
  AddButton,
  ButtonText,
} from '../common';
import FilterIcon from '../../../assets/icons/filter-icon.svg';
import FilterSearchBar from '../filterSearchBar/FilterSearchBar';
import FilterMenu from './FilterMenu';
import AppContext from '../../contexts/AppContext';
import ProspectsContext from '../../contexts/ProspectsContext';
import ProspectsView from './ProspectsView';
import { initLanguage, Localized } from '../../translations/Localized';

const ProspectsScreen = ({ navigation }) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const isFocused = useIsFocused();

  const initialView = {
    name: Localized('PROSPECTS'),
    testID: 'prospects_button',
  };
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isTouchDisabled, setIsTouchDisabled] = useState(false);
  const [view, setView] = useState(initialView);

  const tertiaryButtonText = [
    { name: Localized('PROSPECTS'), testID: 'prospects_button' },
    { name: Localized('PARTNERS'), testID: 'partners_button' },
  ];

  const navigate = (item) => {
    // close callout
    setView(item);
    Analytics.logEvent(`${item.testID}_tapped`, {
      screen: 'ProspectsScreen',
      purpose: `See details for ${item.name}`,
    });
  };

  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Prospects_Screen_Visited', {
        screen: 'Prospects Screen',
        purpose: 'User navigated to Prospects Screen',
      });
    }
  }, [isFocused]);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(-500)).current;

  const openFilterMenu = () => {
    setIsFilterMenuOpen(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const closeFilterMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: -500,
      duration: 700,
      useNativeDriver: false,
    }).start(() => setIsFilterMenuOpen(false));
  };

  return (
    <ProspectsContext.Provider
      value={{
        isCalloutOpenFromParent,
        setIsCalloutOpenFromParent,
        isTouchDisabled,
        setIsTouchDisabled,
        isFilterMenuOpen,
        closeFilterMenu,
        view,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          closeFilterMenu();
          setIsCalloutOpenFromParent(false);
        }}>
        <ScreenContainer
          style={{
            justifyContent: 'flex-start',
            paddingTop: 0,
            paddingBottom: 0,
          }}>
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
          <FilterSearchBar
            onPress={() =>
              navigation.navigate('Prospects Search Screen', {
                title: view.name,
              })
            }>
            <TouchableOpacity
              onPress={isFilterMenuOpen ? closeFilterMenu : openFilterMenu}>
              <Flexbox direction="row" width="auto">
                <FilterIcon
                  style={{
                    height: 30,
                    width: 30,
                    color: theme.primaryTextColor,
                    marginTop: -2,
                    marginEnd: 6,
                  }}
                />
              </Flexbox>
            </TouchableOpacity>
          </FilterSearchBar>
          <Flexbox>
            <FilterMenu style={{ left: fadeAnim }} />
          </Flexbox>
          {view.name === Localized('PROSPECTS') && <ProspectsView />}
          {view.name === Localized('PARTNERS') && <H4>PARTNERS</H4>}
          <AddButton bottom="130px">
            <ButtonText>+</ButtonText>
          </AddButton>
        </ScreenContainer>
      </TouchableWithoutFeedback>
    </ProspectsContext.Provider>
  );
};

ProspectsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProspectsScreen;
