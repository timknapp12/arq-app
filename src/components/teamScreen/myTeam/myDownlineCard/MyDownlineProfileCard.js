import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Linking, TouchableOpacity } from 'react-native';
import { LoadingSpinner, H6, H6Secondary, Flexbox } from '../../../common';
import { useQuery } from '@apollo/client';
import * as Clipboard from 'expo-clipboard';
import EmailIcon from '../../../../../assets/icons/email-icon.svg';
import MessageIcon from '../../../../../assets/icons/message-icon.svg';
import CallIcon from '../../../../../assets/icons/CallIcon.svg';
import CopyIcon from '../../../../../assets/icons/CopytoClipboardIcon.svg';
import { GET_PROFILE } from '../../../../graphql/queries';
import AppContext from '../../../../contexts/AppContext';
import LoginContext from '../../../../contexts/LoginContext';
import { Localized } from '../../../../translations/Localized';

const MyDownlineProfileCard = ({ associateId }) => {
  const { theme } = useContext(AppContext);
  const { shopQUrl } = useContext(LoginContext);
  const { data, loading } = useQuery(GET_PROFILE, {
    variables: { associateId },
  });

  const associate = data?.associates[0];
  const storeUrl = `${shopQUrl}${associate?.associateSlugs?.[0]?.slug}`;

  const sendEmail = () => Linking.openURL(`mailto:${associate?.emailAddress}`);

  const makeCall = () =>
    Linking.openURL(`tel:${associate?.primaryPhoneNumber}`);

  const sendText = () =>
    Linking.openURL(`sms:${associate?.primaryPhoneNumber}`);

  const copyToClipboard = () => Clipboard.setString(storeUrl);

  const iconStyle = {
    height: 20,
    width: 20,
    color: theme.primaryTextColor,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{ width: '100%' }}>
      <H6>{Localized('Display Name')}</H6>
      <H6Secondary>{associate?.displayName}</H6Secondary>
      <Flexbox direction="row">
        <H6>{Localized('Email')}</H6>
        <TouchableOpacity onPress={sendEmail}>
          <EmailIcon style={iconStyle} />
        </TouchableOpacity>
      </Flexbox>
      <H6Secondary>{associate?.emailAddress}</H6Secondary>
      <Flexbox direction="row">
        <H6>{Localized('Phone Number')}</H6>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={makeCall}>
            <CallIcon style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginStart: 4 }} onPress={sendText}>
            <MessageIcon style={iconStyle} />
          </TouchableOpacity>
        </View>
      </Flexbox>
      <H6Secondary>{associate?.primaryPhoneNumber}</H6Secondary>
      <H6>{Localized('Ambassador ID')}</H6>
      <H6Secondary>{associate?.legacyAssociateId}</H6Secondary>
      <Flexbox direction="row">
        <H6>{Localized('ShopQ Website')}</H6>
        <TouchableOpacity onPress={copyToClipboard}>
          <CopyIcon style={iconStyle} />
        </TouchableOpacity>
      </Flexbox>

      <H6Secondary>{storeUrl}</H6Secondary>
      <H6>{Localized('Address 1')}</H6>
      <H6Secondary>{associate?.address?.address1}</H6Secondary>
      {associate?.address?.address2 ? (
        <>
          <H6>{Localized('Address 2')}</H6>
          <H6Secondary>{associate?.address?.address2}</H6Secondary>
        </>
      ) : null}
      <H6>{Localized('City')}</H6>
      <H6Secondary>{associate?.address?.city}</H6Secondary>
      <H6>{Localized('State')}</H6>
      <H6Secondary>{associate?.address?.state}</H6Secondary>
      <H6>{Localized('ZIP Code')}</H6>
      <H6Secondary>{associate?.address?.zip}</H6Secondary>
      <H6>{Localized('Country')}</H6>
      <H6Secondary>{associate?.address?.countryCode.toUpperCase()}</H6Secondary>
    </View>
  );
};

MyDownlineProfileCard.propTypes = {
  associateId: PropTypes.number.isRequired,
};

export default MyDownlineProfileCard;
