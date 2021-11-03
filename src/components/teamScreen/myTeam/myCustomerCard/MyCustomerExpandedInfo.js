import React from 'react';
import { Flexbox, H6 } from '../../../common';
import OrdersContainer from '../OrdersContainer';
import { Localized } from '../../../../translations/Localized';

const MyCustomerExpandedInfo = () => {
  return (
    <Flexbox style={{ marginTop: 10 }}>
      <H6>{Localized('Orders')}</H6>
      <OrdersContainer orders={[]} />
    </Flexbox>
  );
};

export default MyCustomerExpandedInfo;
