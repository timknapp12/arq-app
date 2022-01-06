import React from 'react';
import PropTypes from 'prop-types';
import { Flexbox, H6 } from '../../../common';
import OrdersContainer from '../OrdersContainer';
import { Localized } from '../../../../translations/Localized';

const MyCustomerExpandedInfo = ({ level, member }) => {
  return (
    <Flexbox style={{ marginTop: 10 }}>
      <H6>{Localized('Orders')}</H6>
      <OrdersContainer level={level} member={member} />
    </Flexbox>
  );
};

MyCustomerExpandedInfo.propTypes = {
  level: PropTypes.number.isRequired,
  member: PropTypes.object.isRequired,
};

export default MyCustomerExpandedInfo;
