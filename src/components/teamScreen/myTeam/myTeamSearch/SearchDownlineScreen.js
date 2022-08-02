import React, { useState, useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { useLazyQuery, NetworkStatus } from '@apollo/client';
import debounce from 'lodash.debounce';
import * as Analytics from 'expo-firebase-analytics';
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
import MyTeamSearchFilterModal from './MyTeamSearchFilterModal';
import { SEARCH_TREE } from '../../../../graphql/queries';
import { Localized } from '../../../../translations/Localized';

const SearchDownlineScreen = ({ route }) => {
  const viewInVisualTree = route?.params?.viewInVisualTree;
  const viewInMyTeamView = route?.params?.viewInMyTeamView;

  const { theme } = useContext(AppContext);

  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDropdownStatus, setSelectedDropdownStatus] =
    useState('DOCU_SIGN_HOLD');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedRank, setSelectedRank] = useState('ALL');

  const [searchTerm, setSearchTerm] = useState('');
  const [reshapedData, setReshapedData] = useState([]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [hasSearchCompleted, setHasSearchCompleted] = useState(false);
  const [hasUserSubmittedNewFilter, setHasUserSubmittedNewFilter] =
    useState(false);

  const variables = {
    first: 50,
    name: searchTerm,
    status: selectedStatus === 'ALL' ? null : selectedStatus,
    type: selectedType === 'ALL' ? null : selectedType,
    rankName: selectedRank === 'ALL' ? null : selectedRank,
  };

  const logAnalytics = (status, type, rankName) => {
    const formattedName = rankName.split(' ').join('_');
    Analytics.logEvent(`fltr_tm_srch_status_${status}`);
    Analytics.logEvent(`fltr_tm_srch_status_${type}`);
    Analytics.logEvent(`fltr_tm_srch_status_${formattedName}`);
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
    logAnalytics(selectedStatus, selectedType, selectedRank);
    return () => {
      setReshapedData([]);
      setIsFilterModalOpen(false);
    };
  }, [data]);

  const debounceSearch = useCallback(
    debounce(
      (variables) =>
        searchTree({
          variables: variables,
        }),
      700,
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
  }, [hasUserSubmittedNewFilter, searchTerm]);

  const handleChange = (value) => {
    setSearchTerm(value);
    setHasSearchCompleted(false);
  };

  const viewItemInMyTeamView = (item) => {
    const uplineId = item?.uplineTreeNode?.legacyAssociateId;
    const selectedMemberId = item?.associate?.associateId;
    const levelInTree = item?.depth - 2;
    viewInMyTeamView(uplineId, selectedMemberId, levelInTree);
  };

  const onPressCard = (item) => {
    if (Platform.OS === 'android' && isFilterModalOpen) {
      return;
    }
    viewItemInMyTeamView(item);
  };

  const viewItemInVisualTree = (item) => {
    viewInVisualTree(item);
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
        // showVisualTreeIcon
        viewItemInVisualTree={() => viewItemInVisualTree(item)}
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
          <TouchableOpacity
            style={{ padding: 4 }}
            onPress={() => setIsFilterModalOpen((state) => !state)}
          >
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
              returnKeyType="done"
              placeholder={Localized('Search by first and last name')}
              placeholderTextColor={theme.placeholderTextColor}
            />
          </Flexbox>
          <View
            style={{
              width: 10,
            }}
          />
        </Flexbox>

        {isFilterModalOpen && (
          <Flexbox align="flex-start">
            <MyTeamSearchFilterModal
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedDropdownStatus={selectedDropdownStatus}
              setSelectedDropdownStatus={setSelectedDropdownStatus}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedRank={selectedRank}
              setSelectedRank={setSelectedRank}
              onClose={() => setIsFilterModalOpen(false)}
              setHasUserSubmittedNewFilter={setHasUserSubmittedNewFilter}
              setHasSearchCompleted={setHasSearchCompleted}
              visible={isFilterModalOpen}
            />
          </Flexbox>
        )}
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
                keyExtractor={(_, index) => index.toString()}
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
      </Flexbox>
    </ScreenContainer>
  );
};

SearchDownlineScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SearchDownlineScreen;
