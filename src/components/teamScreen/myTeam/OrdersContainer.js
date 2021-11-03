import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Flexbox, H6, H6Secondary, Link } from '../../common';
import { mockOrdersShortList } from './myAmbassadorCard/mockOrders';
import AutoshipIcon from '../../../../assets/icons/AutoshipIcon.svg';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';
import { OrderTableHeaderRow, OrderTableRow } from './myTeamCard.styles';

const options = {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
};

const MyAmbassadorOrdersContainer = ({ orders }) => {
  const { theme, deviceLanguage } = useContext(AppContext);
  const { closeAllMenus } = useContext(MyTeamViewContext);
  // TODO remove console log
  console.log(`orders`, orders);

  const getLocalDate = (date) => {
    let [y, m, d, hh, mm, ss, ms] = date.match(/\d+/g);
    let regexDate = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
    let formattedDate = regexDate.toLocaleString(deviceLanguage, options);
    return formattedDate;
  };

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <>
        <Flexbox direction="row">
          <View style={{ width: 24 }} />
          <OrderTableHeaderRow>
            <H6Secondary>{`${Localized('Order')} #`}</H6Secondary>
            <H6Secondary>{Localized('Date')}</H6Secondary>
            <H6Secondary>{Localized('Total')}</H6Secondary>
            <H6Secondary>PV</H6Secondary>
          </OrderTableHeaderRow>
        </Flexbox>

        {mockOrdersShortList.map((item) => (
          <Flexbox key={item?.orderId} direction="row">
            {item?.type?.toLowerCase() === 'autoship' ? (
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
            <OrderTableRow>
              <H6>{item?.orderId}</H6>
              <H6>{getLocalDate(item?.dateOrder)}</H6>
              <H6>{item?.totalCost}</H6>
              <H6>{item?.pv}</H6>
            </OrderTableRow>
          </Flexbox>
        ))}
        <TouchableOpacity
          // TODO - replace console.log with real function to show more order history
          onPress={() => console.log('more orders pressed')}
          style={{
            padding: 8,
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
          }}
        >
          <Link>{Localized('More Orders').toUpperCase()}</Link>
        </TouchableOpacity>
      </>
    </TouchableWithoutFeedback>
  );
};

MyAmbassadorOrdersContainer.propTypes = { orders: PropTypes.array.isRequired };

export default MyAmbassadorOrdersContainer;
