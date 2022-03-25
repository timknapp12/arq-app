import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Flexbox, H4 } from '../../common';
import FilterOrgMenu from './FilterOrgMenu';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import FilterIcon from '../../../../assets/icons/filter-icon.svg';
import AppContext from '../../../contexts/AppContext';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
import TeamScreenContext from '../../../contexts/TeamScreenContext';
import { Localized } from '../../../translations/Localized';
import MyTeamList from './MyTeamList';
import { maxWidth } from '../../../styles/constants';

const MyTeamView = () => {
  const { theme } = useContext(AppContext);
  const {
    closeMenus,
    legacyAssociateId,
    setLegacyAssociateId,
    sortBy,
    setSortBy,
    levelInTree,
    viewInVisualTree,
  } = useContext(TeamScreenContext);

  const [myTeamViewHeader, setMyTeamViewHeader] = useState('');
  const [currentMembersUplineId, setCurrentMembersUplineId] = useState(null);

  useEffect(() => {
    if (levelInTree === 0) {
      const header =
        sortBy === 'AMBASSADOR'
          ? Localized('My Ambassadors')
          : sortBy === 'PREFERRED'
          ? Localized('My Customers')
          : Localized('My Organization');
      setMyTeamViewHeader(header);
    }
  }, [sortBy, levelInTree]);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(-250)).current;

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
      toValue: -250,
      duration: 700,
      useNativeDriver: false,
    }).start(() => setIsFilterMenuOpen(false));
  };

  const onCloseFilterMenu = () => {
    closeFilterMenu();
    setLegacyAssociateId(legacyAssociateId);
  };

  const navigation = useNavigation();

  // this will close the filter menu on this view, but also from the parent 1- the main side menu, 2- the notifications dropdown, 3- expanded button options from the navbar add button
  const closeAllMenus = () => {
    closeFilterMenu();
    closeMenus();
  };

  return (
    <MyTeamViewContext.Provider
      value={{
        closeAllMenus,
        setMyTeamViewHeader,
        currentMembersUplineId,
        setCurrentMembersUplineId,
        isFilterMenuOpen,
      }}
    >
      <TouchableWithoutFeedback onPress={() => closeAllMenus()}>
        <Flexbox
          align="center"
          justify="flex-start"
          height="100%"
          style={{ zIndex: -1, maxWidth }}
        >
          <FilterSearchBar
            onPress={() =>
              navigation.navigate('Search Downline Screen', {
                title: Localized('Search My Team'),
                viewInVisualTree: viewInVisualTree,
              })
            }
          >
            <TouchableOpacity
              onPress={isFilterMenuOpen ? closeFilterMenu : openFilterMenu}
            >
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
            <H4 style={{ textAlign: 'center' }}>{myTeamViewHeader}</H4>
          </FilterSearchBar>

          {isFilterMenuOpen && (
            <Flexbox>
              <FilterOrgMenu
                style={{ left: fadeAnim }}
                onClose={onCloseFilterMenu}
                setSortBy={setSortBy}
              />
            </Flexbox>
          )}

          <MyTeamList />
        </Flexbox>
      </TouchableWithoutFeedback>
    </MyTeamViewContext.Provider>
  );
};

export default MyTeamView;
