import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery, NetworkStatus } from '@apollo/client';
import debounce from 'lodash.debounce';
import {
  ScreenContainer,
  Flexbox,
  Input,
  LoadingSpinner,
  H6,
} from '../../../common';
import FilterIcon from '../../../../../assets/icons/filter-icon.svg';
import DownlineProfileInfoContainer from '../DownlineProfileInfoContainer';
import AppContext from '../../../../contexts/AppContext';
import { CardContainer } from '../myTeamCard.styles';
import MyTeamSearchFilterMenu from './MyTeamSearchFilterMenu';
import { SEARCH_TREE } from '../../../../graphql/queries';
import { Localized } from '../../../../translations/Localized';

const SearchDownlineScreen = () => {
  const { theme } = useContext(AppContext);

  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDropdownStatus, setSelectedDropdownStatus] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedRank, setSelectedRank] = useState('ALL');

  const [searchTerm, setSearchTerm] = useState('');
  const [reshapedData, setReshapedData] = useState([]);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(-300)).current;
  const [hasSearchCompleted, setHasSearchCompleted] = useState(false);
  const [hasUserSubmittedNewFilter, setHasUserSubmittedNewFilter] =
    useState(false);

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
    first: 50,
    name: searchTerm,
    status: selectedStatus === 'ALL' ? null : selectedStatus,
    type: selectedType === 'ALL' ? null : selectedType,
    rankName: selectedRank === 'ALL' ? null : selectedRank,
  };

  const [searchTree, { loading, data, fetchMore, refetch, networkStatus }] =
    useLazyQuery(SEARCH_TREE, {
      onError: (err) => console.log(`err in searchTree:`, err),
      onCompleted: () => {
        setHasSearchCompleted(true);
        setHasUserSubmittedNewFilter(false);
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    const reformattedData = data?.searchTree?.nodes?.map((item) => ({
      ...item,
      associate: {
        associateId: item.associateId,
        legacyAssociateId: item.legacyAssociateId,
        firstName: item.firstName,
        lastName: item.lastName,
        profileUrl: item.profileUrl,
        associateType: item.associateType,
        associateStatus: item.associateStatus,
      },
    }));
    setReshapedData(reformattedData);
    return () => {
      setReshapedData([]);
      setIsFilterMenuOpen(false);
    };
  }, [data]);

  const debounceSearch = useCallback(
    debounce(
      (variables) =>
        searchTree({
          variables: variables,
        }),
      1000,
    ),
    [],
  );

  useEffect(() => {
    if (searchTerm.length > 0) {
      debounceSearch(variables);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (hasUserSubmittedNewFilter && searchTerm.length > 0) {
      searchTree({
        variables: variables,
      });
    }
  }, [hasUserSubmittedNewFilter]);

  const handleChange = (value) => {
    setSearchTerm(value);
    closeFilterMenu();
    setHasSearchCompleted(false);
  };

  const navigation = useNavigation();

  const viewInMyTeamView = (item) => {
    navigation.navigate('Team Screen', {
      searchId: item?.uplineTreeNode?.legacyAssociateId,
      selectedMemberId: item?.associate?.associateId,
      levelInTree: item?.depth - 2,
    });
  };

  const onPressCard = (item) => {
    if (Platform.OS === 'android' && isFilterMenuOpen) {
      return;
    }
    viewInMyTeamView(item);
  };

  const refreshing = networkStatus === NetworkStatus.refetch;

  const handleOnEndReached = () => {
    if (data.searchTree.pageInfo.hasNextPage)
      return fetchMore({
        variables: {
          ...variables,
          name: searchTerm,
          after: data.searchTree.pageInfo.endCursor,
        },
      });
  };

  const renderItem = ({ item }) => (
    <CardContainer order={item} style={{ width: '100%' }}>
      <DownlineProfileInfoContainer
        level={item?.depth - 1}
        cardIsExpandable={false}
        member={item}
        onPress={() => onPressCard(item)}
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
      <Flexbox width="100%" height="100%" justify="flex-start" padding={8}>
        <Flexbox direction="row" justify="space-between">
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
              setHasUserSubmittedNewFilter={setHasUserSubmittedNewFilter}
              setHasSearchCompleted={setHasSearchCompleted}
            />
          </Flexbox>
        )}
        <TouchableWithoutFeedback onPress={closeFilterMenu}>
          <Flexbox
            style={{
              height: '100%',
              zIndex: -2,
              marginTop: 6,
            }}
          >
            {loading && !hasSearchCompleted && (
              <LoadingSpinner style={{ marginTop: 10 }} size="large" />
            )}

            {reshapedData?.length > 0 || !hasSearchCompleted ? (
              <Flexbox width="95%" style={{ zIndex: -1 }}>
                <FlatList
                  style={{
                    width: '100%',
                    marginBottom: 30,
                  }}
                  data={reshapedData}
                  renderItem={renderItem}
                  keyExtractor={(item) =>
                    item?.associate?.associateId?.toString()
                  }
                  onEndReachedThreshold={1}
                  onEndReached={handleOnEndReached}
                  onRefresh={() => {
                    refetch();
                    setHasSearchCompleted(false);
                  }}
                  refreshing={refreshing}
                  onScroll={Keyboard.dismiss}
                />
              </Flexbox>
            ) : (
              <H6>{Localized('Item not found')}</H6>
            )}
          </Flexbox>
        </TouchableWithoutFeedback>
      </Flexbox>
    </ScreenContainer>
  );
};

export default SearchDownlineScreen;
