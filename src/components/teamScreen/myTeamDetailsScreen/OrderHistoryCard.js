import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, H6, Flexbox, ChevronIcon } from '../../common';
import AutoshipIcon from '../../../../assets/icons/AutoshipIcon.svg';
import { TouchableRow } from '../myTeam/myTeamCard.styles';
import AppContext from '../../../contexts/AppContext';

const options = {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
};

const OrderHistoryCard = ({ order }) => {
  const { theme, deviceLanguage } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const getLocalDate = (date) => {
    let [y, m, d, hh, mm, ss, ms] = date.match(/\d+/g);
    let regexDate = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
    let formattedDate = regexDate.toLocaleString(deviceLanguage, options);
    return formattedDate;
  };

  return (
    <Card style={{ marginTop: 8 }}>
      <Flexbox direction="row" justify="space-between" align="center">
        <TouchableRow
          style={{ width: '100%' }}
          onPress={() => setIsExpanded((state) => !state)}
        >
          {order?.type?.toLowerCase() === 'autoship' ? (
            <AutoshipIcon
              style={{
                height: 24,
                width: 24,
                color: theme.primaryTextColor,
                marginEnd: 4,
              }}
            />
          ) : (
            <View style={{ width: 24 }} />
          )}
          <Flexbox style={{ flex: 1 }} direction="row" justify="space-between">
            <H6>{order?.orderId}</H6>
            <H6>{getLocalDate(order?.dateOrder)}</H6>
            <H6>{order?.totalCost}</H6>
            <H6 style={{ marginEnd: 8 }}>{order?.pv}</H6>
          </Flexbox>
          <ChevronIcon isExpanded={isExpanded} />
        </TouchableRow>
      </Flexbox>
    </Card>
  );
};

OrderHistoryCard.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderHistoryCard;
