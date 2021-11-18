import React, { useState, useContext, useRef, useCallback } from 'react';
import {
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import {
  ScreenContainer,
  Flexbox,
  Input,
  LoadingSpinner,
} from '../../../common';
import FilterIcon from '../../../../../assets/icons/filter-icon.svg';
import DownlineProfileInfoContainer from '../DownlineProfileInfoContainer';
// TODO - delete mock results once real data is received
import { searchResults } from '../mockSearchResults';
import AppContext from '../../../../contexts/AppContext';
import { CardContainer } from '../myTeamCard.styles';
import MyTeamSearchFilterMenu from './MyTeamSearchFilterMenu';
import { SEARCH_TREE } from '../../../../graphql/queries';

const SearchDownlineScreen = () => {
  const { theme } = useContext(AppContext);

  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDropdownStatus, setSelectedDropdownStatus] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedRank, setSelectedRank] = useState('Gold');

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

  const variables = {
    firstName: 'Kristin',
    lastName: 'Adams',
    status: selectedStatus === 'ALL' ? null : selectedStatus,
    type: selectedType === 'ALL' ? null : selectedType,
    rankName: selectedRank === 'ALL' ? null : selectedRank,
  };

  const [searchTree, { loading, data }] = useLazyQuery(SEARCH_TREE, {
    onError: (err) => console.log(`err in searchTree:`, err),
  });

  const debounceSearch = useCallback(
    debounce(
      (value) =>
        value.length > 0 &&
        searchTree({
          variables: variables,
        }),
      1000,
    ),
    [],
  );

  const handleChange = (value) => {
    setSearchTerm(value);
    closeFilterMenu();
    debounceSearch(value);
  };

  const navigation = useNavigation();

  const viewInMyTeamView = (item) => {
    navigation.navigate('Team Screen', {
      searchId: item?.associate?.legacyAssociateId,
    });
  };

  const onPress = (item) => {
    if (Platform.OS === 'android' && isFilterMenuOpen) {
      return;
    } else {
      closeFilterMenu();
      viewInMyTeamView(item);
    }
  };

  const renderItem = ({ item }) => (
    <CardContainer order={item} style={{ width: '100%' }}>
      <DownlineProfileInfoContainer
        showChevron={false}
        member={item}
        onPress={() => onPress(item)}
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
      <Flexbox width="100%" height="100%" justify="flex-start">
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
              autoFocus
              testID="propsect-search-input"
              value={searchTerm}
              onChangeText={handleChange}
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
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedRank={selectedRank}
              setSelectedRank={setSelectedRank}
              onClose={closeFilterMenu}
            />
          </Flexbox>
        )}
        {loading && <LoadingSpinner style={{ marginTop: 10 }} size="large" />}

        {data ? (
          <Flexbox width="95%" style={{ zIndex: -1 }}>
            <FlatList
              style={{ width: '100%', marginBottom: 50 }}
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={(item) => item?.associate?.associateId?.toString()}
            />
          </Flexbox>
        ) : null}
      </Flexbox>
    </ScreenContainer>
  );
};

export default SearchDownlineScreen;
