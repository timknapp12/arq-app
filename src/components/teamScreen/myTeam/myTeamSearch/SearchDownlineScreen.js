import React, { useState, useContext, useRef } from 'react';
import {
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { ScreenContainer, Flexbox, Input } from '../../../common';
import FilterIcon from '../../../../../assets/icons/filter-icon.svg';
import DownlineProfileInfoContainer from '../DownlineProfileInfoContainer';
// TODO - delete mock results once real data is received
import { searchResults } from '../mockSearchResults';
import AppContext from '../../../../contexts/AppContext';
import { CardContainer } from '../myTeamCard.styles';
import MyTeamSearchFilterMenu from './MyTeamSearchFilterMenu';

const SearchDownlineScreen = () => {
  const { theme } = useContext(AppContext);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDropdownStatus, setSelectedDropdownStatus] = useState('');
  const [selectedRank, setSelectedRank] = useState('all');

  const [searchTerm, setSearchTerm] = useState('');

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(-300)).current;

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
      toValue: -300,
      duration: 700,
      useNativeDriver: false,
    }).start(() => setIsFilterMenuOpen(false));
  };

  const toggleMenu = () => {
    if (isFilterMenuOpen) {
      return closeFilterMenu();
    } else {
      openFilterMenu();
      Keyboard.dismiss();
    }
  };

  const renderItem = ({ item }) => (
    <CardContainer order={item} style={{ width: '100%' }}>
      <DownlineProfileInfoContainer
        showChevron={false}
        member={item}
        onPress={closeFilterMenu}
      />
    </CardContainer>
  );

  return (
    <ScreenContainer
      style={{
        justifyContent: 'flex-start',
        paddingTop: 0,
        paddingBottom: 0,
        height: '100%',
      }}
    >
      <Flexbox width="100%" height="100%">
        <Flexbox direction="row" justify="space-between" padding={8}>
          <TouchableOpacity style={{ padding: 4 }} onPress={toggleMenu}>
            <FilterIcon
              style={{
                height: 30,
                width: 30,
                color: theme.primaryTextColor,
              }}
            />
          </TouchableOpacity>
          <Flexbox width="75%">
            <Input
              testID="propsect-search-input"
              value={searchTerm}
              onChangeText={(text) => {
                setSearchTerm(text);
                closeFilterMenu();
              }}
              onFocus={closeFilterMenu}
              returnKeyType="done"
              placeholder="Search by first and last name"
              placeholderTextColor={theme.placeholderTextColor}
            />
          </Flexbox>
          <View
            style={{
              width: 10,
            }}
          />
        </Flexbox>

        {isFilterMenuOpen && (
          <Flexbox align="flex-start">
            <MyTeamSearchFilterMenu
              style={{ left: fadeAnim }}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedDropdownStatus={selectedDropdownStatus}
              setSelectedDropdownStatus={setSelectedDropdownStatus}
              selectedRank={selectedRank}
              setSelectedRank={setSelectedRank}
              onClose={closeFilterMenu}
            />
          </Flexbox>
        )}

        <Flexbox width="95%" style={{ zIndex: -1 }}>
          <FlatList
            style={{ width: '100%', marginBottom: 50 }}
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item?.associate?.associateId?.toString()}
          />
        </Flexbox>
      </Flexbox>
    </ScreenContainer>
  );
};

export default SearchDownlineScreen;
