import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, FlatList } from 'react-native';
import { useLazyQuery, NetworkStatus } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import {
  ScreenContainer,
  Flexbox,
  H6,
  Input,
  LoadingSpinner,
} from '../../common';
import { Localized } from '../../../translations/Localized';
import { SEARCH_TREE } from '../../../graphql/queries';
import { CardContainer } from '../myTeam/myTeamCard.styles';
import DownlineProfileInfoContainer from '../myTeam/DownlineProfileInfoContainer';
import AppContext from '../../../contexts/AppContext';

const SearchVisualTreeScreen = ({ route }) => {
  const selectedPane = route?.params?.selectedPane;
  const paneOneSearchId = route?.params?.paneOneSearchId;
  const paneTwoSearchId = route?.params?.paneTwoSearchId;
  const paneThreeSearchId = route?.params?.paneThreeSearchId;

  const { theme } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [reshapedData, setReshapedData] = useState([]);
  const [hasSearchCompleted, setHasSearchCompleted] = useState(false);

  const variables = {
    first: 50,
    name: searchTerm,
    status: null,
    type: 'AMBASSADOR',
    rankName: null,
  };

  const [searchTree, { loading, data, fetchMore, refetch, networkStatus }] =
    useLazyQuery(SEARCH_TREE, {
      onError: (err) => console.log(`err in searchTree:`, err),
      onCompleted: () => {
        setHasSearchCompleted(true);
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
  const handleChange = (value) => {
    setSearchTerm(value);
    setHasSearchCompleted(false);
  };

  const navigation = useNavigation();

  const viewInMyTeamView = (item) => {
    navigation.navigate('Team Screen', {
      // searchId: item?.uplineTreeNode?.legacyAssociateId,
      // selectedMemberId: item?.associate?.associateId,
      // levelInTree: item?.depth - 2,
      paneOneSearchId:
        selectedPane === 1
          ? item?.associate?.legacyAssociateId
          : paneOneSearchId,
      paneTwoSearchId:
        selectedPane === 2
          ? item?.associate?.legacyAssociateId
          : paneTwoSearchId,
      paneThreeSearchId:
        selectedPane === 3
          ? item?.associate?.legacyAssociateId
          : paneThreeSearchId,
    });
  };

  const onPressCard = (item) => {
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
        <Flexbox padding={4}>
          <Input
            autoFocus
            testID="propsect-search-input"
            value={searchTerm}
            onChangeText={handleChange}
            returnKeyType="done"
            placeholder="Search by first and last name"
            placeholderTextColor={theme.placeholderTextColor}
          />
        </Flexbox>

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
                  // setHasSearchCompleted(false);
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

SearchVisualTreeScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SearchVisualTreeScreen;
