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

const MyTeamView = () => {
  const { theme } = useContext(AppContext);

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
    <TouchableWithoutFeedback onPress={() => closeFilterMenu()}>
      <Flexbox align="flex-start" justify="flex-start" height="100%">
        <Flexbox justify="flex-start">
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
              {Localized('My Ambassadors')}
            </H4>
          </FilterSearchBar>
          <Flexbox>
            <FilterOrgMenu style={{ left: fadeAnim }} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

export default MyTeamView;
