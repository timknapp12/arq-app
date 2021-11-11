import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Card, H6, Gap } from '../../common';
import OrderHistoryCardHeader from './OrderHistoryCardHeader';
import { countProductsInOrderDetails } from '../../../utils/teamView/countProductsInOrderDetails';
import { Localized } from '../../../translations/Localized';
import {
  OrderDetailsContainer,
  OrderDetailTitleContainer,
  OrderDetailRow,
  HorizontalScrollViewCell,
  H6RightMargin,
} from '../myTeam/myTeamCard.styles';

const OrderHistoryCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const orderDetailLength = countProductsInOrderDetails(order?.orderDetails);

  const productTotalLabel =
    orderDetailLength === 1
      ? `1 ${Localized('Product')}`
      : `${orderDetailLength} ${Localized('Products')}`;

  return (
    <Card style={{ marginTop: 8 }}>
      <OrderHistoryCardHeader
        order={order}
        isExpanded={isExpanded}
        onPress={() => setIsExpanded((state) => !state)}
      />
      {isExpanded && (
        <View>
          {order.orderDetails.map((item) => (
            <ScrollView
              horizontal
              contentContainerStyle={{
                flex: 1,
              }}
              key={item.orderDetailId}
            >
              <OrderDetailsContainer>
                <OrderDetailTitleContainer>
                  <H6RightMargin>{item?.productName}</H6RightMargin>
                </OrderDetailTitleContainer>
                <HorizontalScrollViewCell>
                  <H6RightMargin>{item?.quantity}</H6RightMargin>
                </HorizontalScrollViewCell>
                <HorizontalScrollViewCell>
                  <H6RightMargin>{`PV-${item?.pv}`}</H6RightMargin>
                </HorizontalScrollViewCell>
                <HorizontalScrollViewCell>
                  <H6RightMargin>{`$${item?.amount.toFixed(2)}`}</H6RightMargin>
                </HorizontalScrollViewCell>
              </OrderDetailsContainer>
            </ScrollView>
          ))}
          <OrderDetailRow>
            <H6>PV</H6>
            <H6>{order?.pv}</H6>
          </OrderDetailRow>
          <OrderDetailRow>
            <H6>{productTotalLabel}</H6>
            <H6>{`$${order?.totalCost.toFixed(2)}`}</H6>
          </OrderDetailRow>
          <Gap />
          <OrderDetailRow>
            <H6>{Localized('Total')}</H6>
            <H6>{`$${order?.totalCost.toFixed(2)}`}</H6>
          </OrderDetailRow>
        </View>
      )}
    </Card>
  );
};

OrderHistoryCard.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderHistoryCard;
