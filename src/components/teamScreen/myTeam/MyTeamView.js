import React, { useState, useRef, useContext } from 'react';
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
import { Localized } from '../../../translations/Localized';
import MyTeamList from './MyTeamList';

const MyTeamView = ({ ...props }) => {
  const { theme } = useContext(AppContext);

  const [sortBy, setSortBy] = useState('AMBASSADOR');

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

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback {...props} onPress={() => closeFilterMenu()}>
      <Flexbox
        align="center"
        justify="flex-start"
        height="100%"
        style={{ zIndex: -1 }}
      >
        <FilterSearchBar
          onPress={() =>
            navigation.navigate('Search Downline Screen', {
              title: 'Search',
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
          <H4 style={{ textAlign: 'center' }}>
            {Localized(
              sortBy === 'AMBASSADOR' ? 'My Ambassadors' : 'My Customers',
            )}
          </H4>
        </FilterSearchBar>

        <Flexbox>
          <FilterOrgMenu
            onClose={closeFilterMenu}
            setSortBy={setSortBy}
            style={{ left: fadeAnim }}
          />
        </Flexbox>

        <MyTeamList sortBy={sortBy} />
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

export default MyTeamView;
