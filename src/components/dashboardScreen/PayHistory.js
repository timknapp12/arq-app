import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { Flexbox, LoadingSpinner } from '../common';
import PayHistoryCard from './PayHistoryCard';
import { GET_PAY_HISTORY } from '../../graphql/queries';

const renderItem = ({ item }) => <PayHistoryCard item={item} />;

const PayHistory = () => {
  const { data, loading } = useQuery(GET_PAY_HISTORY, {
    onError: (err) => console.log('error in Get Pay History:', err),
  });

  const filtered = data?.associateTotalPayouts.filter(
    (item) => item.isDisbursed,
  );

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Flexbox style={{ height: '100%' }}>
      <FlatList
        style={{ width: '100%', padding: 8 }}
        contentContainerStyle={{ paddingBottom: 180 }}
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item?.dateCreated}
      />
    </Flexbox>
  );
};

export default PayHistory;
