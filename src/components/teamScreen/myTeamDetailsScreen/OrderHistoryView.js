import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Flexbox } from '../../common';
import DownlineProfileInfo from '../myTeam/DownlineProfileInfo';

const OrderHistoryView = ({ member, level }) => {
  return (
    <>
      <Flexbox direction="row" justify="space-between" align="flex-start">
        <DownlineProfileInfo member={member} level={level} />
      </Flexbox>
      <Text style={{ color: 'red' }}>Order History</Text>
    </>
  );
};

OrderHistoryView.propTypes = {
  member: PropTypes.object.isRequired,
  level: PropTypes.number,
};

export default OrderHistoryView;
