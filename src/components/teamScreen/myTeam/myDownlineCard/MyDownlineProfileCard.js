import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Linking, TouchableOpacity } from 'react-native';
import { LoadingSpinner, H6, H6Secondary, Flexbox, Gap } from '../../../common';
import { useQuery } from '@apollo/client';
import EmailIcon from '../../../../../assets/icons/email-icon.svg';
import MessageIcon from '../../../../../assets/icons/message-icon.svg';
import CallIcon from '../../../../../assets/icons/CallIcon.svg';
import { GET_PROFILE } from '../../../../graphql/queries';
import AppContext from '../../../../contexts/AppContext';
import { Localized } from '../../../../translations/Localized';

const MyDownlineProfileCard = ({ associateId }) => {
  const { theme } = useContext(AppContext);
  const { data, loading } = useQuery(GET_PROFILE, {
    variables: { associateId },
  });

  const associate = data?.associates[0];

  const sendEmail = () => Linking.openURL(`mailto:${associate?.emailAddress}`);

  const makeCall = () =>
    Linking.openURL(`tel:${associate?.primaryPhoneNumber}`);

  const sendText = () =>
    Linking.openURL(`sms:${associate?.primaryPhoneNumber}`);

  const iconStyle = {
    height: 36,
    width: 36,
    color: theme.primaryTextColor,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const gapHeight = '4px';

  return (
    <View style={{ width: '100%' }}>
      <H6Secondary>{Localized('Display Name')}</H6Secondary>
      <H6>
        {associate?.displayName
          ? associate?.displayName
          : Localized('Not found on file')}
      </H6>

      <Gap height={gapHeight} />

      <Flexbox direction="row">
        <View>
          <H6Secondary>{Localized('Email')}</H6Secondary>
          <H6>
            {associate?.emailAddress
              ? associate?.emailAddress
              : Localized('Not found on file')}
          </H6>
        </View>
        <TouchableOpacity onPress={sendEmail}>
          <EmailIcon style={iconStyle} />
        </TouchableOpacity>
      </Flexbox>

      <Gap height={gapHeight} />

      <Flexbox direction="row">
        <View>
          <H6Secondary>{Localized('Phone Number')}</H6Secondary>
          <H6>
            {associate?.primaryPhoneNumber
              ? associate?.primaryPhoneNumber
              : Localized('Not found on file')}
          </H6>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={makeCall}>
            <CallIcon style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginStart: 4 }} onPress={sendText}>
            <MessageIcon style={iconStyle} />
          </TouchableOpacity>
        </View>
      </Flexbox>

      <Gap height={gapHeight} />

      <H6Secondary>{Localized('Ambassador ID')}</H6Secondary>
      <H6>
        {associate?.legacyAssociateId
          ? associate?.legacyAssociateId
          : Localized('Not found on file')}
      </H6>

      <Gap height={gapHeight} />

      <H6Secondary>{Localized('Address 1')}</H6Secondary>
      <H6>
        {associate?.address?.address1
          ? associate?.address?.address1
          : Localized('Not found on file')}
      </H6>

      <Gap height={gapHeight} />

      {associate?.address?.address2 ? (
        <>
          <H6Secondary>{Localized('Address 2')}</H6Secondary>
          <H6>{associate?.address?.address2}</H6>
        </>
      ) : null}

      {associate?.address?.address2 ? <Gap height={gapHeight} /> : null}

      <H6Secondary>{Localized('City')}</H6Secondary>
      <H6>
        {associate?.address?.city
          ? associate?.address?.city
          : Localized('Not found on file')}
      </H6>

      <Gap height={gapHeight} />

      <H6Secondary>{Localized('State')}</H6Secondary>
      <H6>
        {associate?.address?.state
          ? associate?.address?.state
          : Localized('Not found on file')}
      </H6>

      <Gap height={gapHeight} />

      <H6Secondary>{Localized('ZIP Code')}</H6Secondary>
      <H6>
        {associate?.address?.zip
          ? associate?.address?.zip
          : Localized('Not found on file')}
      </H6>

      <Gap height={gapHeight} />

      <H6Secondary>{Localized('Country')}</H6Secondary>
      <H6>
        {associate?.address?.countryCode
          ? associate?.address?.countryCode.toUpperCase()
          : Localized('Not found on file')}
      </H6>
    </View>
  );
};

MyDownlineProfileCard.propTypes = {
  associateId: PropTypes.number.isRequired,
};

export default MyDownlineProfileCard;
