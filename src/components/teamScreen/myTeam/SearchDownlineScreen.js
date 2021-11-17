import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { ScreenContainer, Flexbox, Input } from '../../common';
import DownlineProfileInfoContainer from './DownlineProfileInfoContainer';
import { searchResults } from './mockSearchResults';
import { CardContainer } from './myTeamCard.styles';

const SearchDownlineScreen = () => {
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
      <Flexbox width="100%" style={{ flex: 1 }}>
        <Flexbox width="85%" style={{ marginTop: 18 }} padding={4}>
          <Input
            autoFocus
            testID="propsect-search-input"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            returnKeyType="done"
          />
        </Flexbox>
        <Flexbox width="95%" style={{ marginTop: 10 }}>
          <FlatList
            style={{ width: '100%', marginBottom: 60 }}
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
