import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Flexbox, H6Secondary, Gap } from '../../common';
import DownlineProfileInfo from '../myTeam/DownlineProfileInfo';
import { Localized } from '../../../translations/Localized';
import OrderHistoryCard from './OrderHistoryCard';
import { mockOrdersLongList } from '../myTeam/myAmbassadorCard/mockOrders';
import { OrderTableHeaderRow } from '../myTeam/myTeamCard.styles';

const OrderHistoryView = ({ member, level }) => {
  const renderItem = ({ item }) => <OrderHistoryCard order={item} />;
  return (
    <Flexbox width="95%" height="100%">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <DownlineProfileInfo member={member} level={level} />
      </View>
      <Gap />
      <Flexbox direction="row">
        <View style={{ width: 24 }} />
        <OrderTableHeaderRow>
          <H6Secondary>{`${Localized('Order')} #`}</H6Secondary>
          <H6Secondary>{Localized('Date')}</H6Secondary>
          <H6Secondary>{Localized('Total')}</H6Secondary>
          <H6Secondary style={{ marginEnd: 32 }}>PV</H6Secondary>
        </OrderTableHeaderRow>
      </Flexbox>
      <FlatList
        data={mockOrdersLongList}
        renderItem={renderItem}
        keyExtractor={(item) => item?.orderId.toString()}
      />
    </Flexbox>
  );
};

OrderHistoryView.propTypes = {
  member: PropTypes.object.isRequired,
  level: PropTypes.number,
};

export default OrderHistoryView;
