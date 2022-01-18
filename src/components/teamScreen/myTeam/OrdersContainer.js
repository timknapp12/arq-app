import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Flexbox, H6Secondary, Link, LoadingSpinner } from '../../common';
import AutoshipIcon from '../../../../assets/icons/AutoshipIcon.svg';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';
import { GET_ORDERS } from '../../../graphql/queries';
import {
  OrderTableHeaderRow,
  OrderTableRow,
  HorizontalScrollViewCell,
  H6RightMargin,
} from './myTeamCard.styles';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';

const OrdersContainer = ({ member, level = 0 }) => {
  const { theme, deviceLanguage } = useContext(AppContext);
  const { closeAllMenus } = useContext(MyTeamViewContext);

  const [shortList, setShortList] = useState([]);

  const { data, loading } = useQuery(GET_ORDERS, {
    variables: { associateId: member?.associate?.associateId },
    onError: (err) => console.log(`error in OrdersContainer.js`, err),
  });

  useEffect(() => {
    if (data) {
      const shortOrderList = data?.orders?.slice(0, 5);
      setShortList(shortOrderList);
    }
    return () => {
      setShortList([]);
    };
  }, [data]);

  const navigation = useNavigation();
  const navigateToOrderHistory = () =>
    navigation.navigate('My Team Details Screen', {
      title: Localized('Order History'),
      member,
      level,
      viewType: 'orderHistory',
    });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <TouchableWithoutFeedback onPress={closeAllMenus}>
      <>
        <Flexbox direction="row">
          <View style={{ width: 24 }} />
          <ScrollView
            horizontal
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <OrderTableHeaderRow>
              <HorizontalScrollViewCell minWidth="25%" justify="flex-start">
                <H6Secondary>{`${Localized('Order')} #`}</H6Secondary>
              </HorizontalScrollViewCell>
              <HorizontalScrollViewCell minWidth="25%" justify="center">
                <H6Secondary>{Localized('Date')}</H6Secondary>
              </HorizontalScrollViewCell>
              <HorizontalScrollViewCell minWidth="20%">
                <H6Secondary>{Localized('Total')}</H6Secondary>
              </HorizontalScrollViewCell>
              <HorizontalScrollViewCell minWidth="25%">
                <H6Secondary>PV</H6Secondary>
              </HorizontalScrollViewCell>
            </OrderTableHeaderRow>
          </ScrollView>
        </Flexbox>

        {shortList.map((order) => (
          <Flexbox key={order?.orderId} direction="row" justify="flex-end">
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
              <View style={{ width: 28 }} />
            )}
            <ScrollView
              horizontal
              contentContainerStyle={{
                flex: 1,
              }}
            >
              <OrderTableRow onStartShouldSetResponder={() => true}>
                <HorizontalScrollViewCell minWidth="25%" justify="flex-start">
                  <H6RightMargin>{order?.orderId}</H6RightMargin>
                </HorizontalScrollViewCell>
                <HorizontalScrollViewCell minWidth="25%" justify="flex-start">
                  <H6RightMargin>
                    {getLocalDate(order?.dateOrder, deviceLanguage)}
                  </H6RightMargin>
                </HorizontalScrollViewCell>
                <HorizontalScrollViewCell>
                  <H6RightMargin>{`$${order?.totalCost.toFixed(
                    2,
                  )}`}</H6RightMargin>
                </HorizontalScrollViewCell>
                <HorizontalScrollViewCell minWidth="20%">
                  <H6RightMargin>{order?.pv}</H6RightMargin>
                </HorizontalScrollViewCell>
              </OrderTableRow>
            </ScrollView>
          </Flexbox>
        ))}
        {data?.orders.length > 0 ? (
          <TouchableOpacity
            onPress={navigateToOrderHistory}
            style={{
              padding: 8,
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
            }}
          >
            <Link>{Localized('More Orders').toUpperCase()}</Link>
          </TouchableOpacity>
        ) : null}
      </>
    </TouchableWithoutFeedback>
  );
};

OrdersContainer.propTypes = {
  member: PropTypes.object.isRequired,
  level: PropTypes.number,
};

export default OrdersContainer;
