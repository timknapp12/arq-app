import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, H6 } from '../../common';
import OrderHistoryCardHeader from './OrderHistoryCardHeader';

const OrderHistoryCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card style={{ marginTop: 8 }}>
      <OrderHistoryCardHeader
        order={order}
        isExpanded={isExpanded}
        onPress={() => setIsExpanded((state) => !state)}
      />
      {isExpanded && <H6>Expanded</H6>}
    </Card>
  );
};

OrderHistoryCard.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderHistoryCard;
