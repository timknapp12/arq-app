import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  LogBox,
} from 'react-native';
import { useLazyQuery, NetworkStatus } from '@apollo/client';
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
  const viewInVisualTree = route?.params?.viewInVisualTree;
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

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

  const onPressCard = (item) => {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Flexbox width="100%" height="100%" justify="flex-start" padding={8}>
          <Flexbox padding={4}>
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
                  // setting key to index vs a unique id avoids data conflicts if the user scrolls really fast
                  keyExtractor={(_, index) => index.toString()}
                  onEndReachedThreshold={1}
                  onEndReached={handleOnEndReached}
                  onRefresh={() => {
                    refetch();
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
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

SearchVisualTreeScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SearchVisualTreeScreen;
