import React, { useState, useContext } from 'react';
import { FlatList, View } from 'react-native';
import { ScreenContainer, Flexbox, Input } from '../../common';
import FilterIcon from '../../../../assets/icons/filter-icon.svg';
import DownlineProfileInfoContainer from './DownlineProfileInfoContainer';
import { searchResults } from './mockSearchResults';
import AppContext from '../../../contexts/AppContext';
import { CardContainer } from './myTeamCard.styles';

const SearchDownlineScreen = () => {
  const { theme } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const renderItem = ({ item }) => (
    <CardContainer order={item} style={{ width: '100%' }}>
      <DownlineProfileInfoContainer member={item} />
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
          <FilterIcon
            style={{
              height: 30,
              width: 30,
              color: theme.primaryTextColor,
            }}
          />
          <Flexbox width="75%">
            <Input
              autoFocus
              testID="propsect-search-input"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
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
        <Flexbox width="95%" style={{ marginTop: 12 }}>
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
