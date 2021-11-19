import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  View,
  FlatList,
} from 'react-native';
import { Flexbox, H5, Gap } from '../../common';
import FilterIcon from '../../../../assets/icons/filter-icon.svg';
import AppContext from '../../../contexts/AppContext';
import LeaderboardFilterMenu from './LeaderboardFilterMenu';
import LeaderboardTabs from './LeaderboardTabs';
import { searchResults } from '../myTeam/mockSearchResults';
import StandingsCard from './StandingsCard';

const LeaderbaordView = ({ closeMenus, ...props }) => {
  const { theme } = useContext(AppContext);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('company');
  const [sortBy, setSortBy] = useState('Ambassador Enrollments');

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

  // this will close the filter menu on this view, but also from the parent 1- the main side menu, 2- the notifications dropdown, 3- expanded button options from the navbar add button
  const closeAllMenus = () => {
    closeFilterMenu();
    closeMenus();
  };

  const renderItem = ({ item }) => (
    <StandingsCard item={item} closeAllMenus={closeAllMenus} />
  );

  return (
    <TouchableWithoutFeedback {...props} onPress={() => closeAllMenus()}>
      <Flexbox
        align="flex-start"
        justify="flex-start"
        width="95%"
        height="100%"
        padding={4}
        style={{ zIndex: -1, maxWidth: 425 }}
      >
        <LeaderboardTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          closeAllMenus={closeAllMenus}
        />
        <Gap height="4px" />
        <Flexbox direction="row">
          <TouchableOpacity
            onPress={isFilterMenuOpen ? closeFilterMenu : openFilterMenu}
          >
            <FilterIcon
              style={{
                height: 30,
                width: 30,
                color: theme.primaryTextColor,
              }}
            />
          </TouchableOpacity>

          <H5>{sortBy}</H5>

          <View style={{ width: 30 }} />
        </Flexbox>
        {isFilterMenuOpen && (
          <Flexbox align="flex-start">
            <LeaderboardFilterMenu
              style={{ left: fadeAnim }}
              onClose={closeMenus}
              setSortBy={setSortBy}
            />
          </Flexbox>
        )}
        <Gap height="4px" />
        <Flexbox width="100%" style={{ zIndex: -1, marginBottom: 50 }}>
          <FlatList
            style={{ width: '100%', marginBottom: 90 }}
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item?.associate?.associateId?.toString()}
          />
        </Flexbox>
      </Flexbox>
    </TouchableWithoutFeedback>
  );
};

LeaderbaordView.propTypes = {
  closeMenus: PropTypes.func.isRequired,
};

export default LeaderbaordView;
