import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Flexbox, ChevronIcon } from '../../common';
import AutoshipIcon from '../../../../assets/icons/AutoshipIcon.svg';
import {
  TouchableRow,
  HorizontalScrollViewCell,
  H6RightMargin,
} from '../myTeam/myTeamCard.styles';
import AppContext from '../../../contexts/AppContext';
import getLocalDate from '../../../translations/getLocalDate/getLocalDate';

const OrderHistoryCardHeader = ({ order, isExpanded, onPress }) => {
  const { theme, deviceLanguage } = useContext(AppContext);

  const formattedDate = getLocalDate(order?.dateOrder, deviceLanguage);

  return (
    <Flexbox direction="row" justify="space-between" align="center">
      <TouchableRow
        style={{ width: '100%' }}
        onPress={onPress}
        activeOpacity={1}
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
          <View style={{ width: 28 }} />
        )}
        <ScrollView
          horizontal
          contentContainerStyle={{
            flex: 1,
            paddingEnd: 12,
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={{ width: '100%' }}
          >
            <Flexbox
              direction="row"
              justify="space-between"
              style={{ flex: 1 }}
            >
              <HorizontalScrollViewCell minWidth="25%" justify="flex-start">
                <H6RightMargin>{order?.orderId}</H6RightMargin>
              </HorizontalScrollViewCell>
              <HorizontalScrollViewCell minWidth="30%">
                <H6RightMargin>{formattedDate}</H6RightMargin>
              </HorizontalScrollViewCell>
              <HorizontalScrollViewCell minWidth="30%">
                <H6RightMargin>{`$${order?.totalCost.toFixed(
                  2,
                )}`}</H6RightMargin>
              </HorizontalScrollViewCell>
              <HorizontalScrollViewCell justify="flex-end" minWidth="20%">
                <H6RightMargin>{order?.pv}</H6RightMargin>
              </HorizontalScrollViewCell>
            </Flexbox>
          </TouchableOpacity>
        </ScrollView>
        <ChevronIcon isExpanded={isExpanded} />
      </TouchableRow>
    </Flexbox>
  );
};

OrderHistoryCardHeader.propTypes = {
  order: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default OrderHistoryCardHeader;
