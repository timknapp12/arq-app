import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Flexbox, H6, H6Heavy } from '../common';
import AppContext from '../../contexts/AppContext';
import getLocalDate from '../../translations/getLocalDate/getLocalDate';
require('number-to-locale-string-polyfill');

export const Container = styled.View`
  width: 100%;
  border-radius: 5px;
  justify-content: center;
  background-color: ${(props) => props.theme.cardBackgroundColor};
`;

const DateContainer = styled.View`
  height: 100%;
  min-width: 120px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
`;

const options = 'DD MMM YYYY';

const stringify = (number) =>
  number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const PayHistoryCard = ({ item }) => {
  const { deviceLanguage } = useContext(AppContext);

  const completed = item?.disbursements?.find(
    (disbursement) => disbursement.paymentStatus === 'COMPLETED',
  );

  const initialDate = getLocalDate(
    item.dateCreated,
    deviceLanguage || 'en',
    options,
  );
  // for some stupid reason the date was defaulting to German on first render, so putting it in a useEffect should make sure it updates
  const [date, setDate] = useState(initialDate);
  useEffect(() => {
    if (deviceLanguage && item.dateCreated) {
      const formattedDate = getLocalDate(
        item.dateCreated,
        deviceLanguage || 'en',
        options,
      );
      setTimeout(() => {
        setDate(formattedDate);
      }, 50);
    }
  }, [deviceLanguage, item]);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: completed?.currency || 'USD',
      currencyDisplay: 'symbol',
    });
  };

  const total = formatCurrency(completed?.amountInCurrency);
  const symbol = total.substring(0, 1);
  const number = stringify(completed?.amountInCurrency.toFixed(2));

  return (
    <Container
      onStartShouldSetResponder={() => true}
      style={{ marginTop: 8, height: 60, padding: 0 }}
    >
      <Flexbox direction="row" align="center" height="100%">
        <DateContainer>
          <H6 style={{ opacity: 1 }}>{date}</H6>
        </DateContainer>
        <Flexbox style={{ flex: 1 }}>
          <H6Heavy>{`${symbol}${number} (${completed?.currency})`}</H6Heavy>
        </Flexbox>
      </Flexbox>
    </Container>
  );
};

PayHistoryCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PayHistoryCard;
