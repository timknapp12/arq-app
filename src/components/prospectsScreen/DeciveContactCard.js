import React from 'react';
import PropTypes from 'prop-types';
import { H2Book, H4Book, H6 } from '../common';
import {
  TouchableCardContainer,
  Row,
  CollapsedImage,
  CollapsedImageDefault,
  Stack,
} from './contactCard/card.styles';

const DeciveContactCard = ({ contact, setContactInfo, onClose, ...props }) => {
  const initials = `${contact?.firstName?.charAt(0) ?? ''}${
    contact?.lastName?.charAt(0) ?? ''
  }`;

  const importData = async () => {
    await setContactInfo({
      prospectId: '',
      thumbnailUrl: contact?.image?.uri ?? '',
      firstName: contact?.firstName ?? '',
      lastName: contact?.lastName ?? '',
      displayName: contact?.nickname ?? '',
      emailAddress: contact?.emails[0]?.email ?? '',
      primaryPhone: contact?.phoneNumbers[0]?.number ?? '',
      notes: '',
      address: {
        address1: contact?.addresses[0]?.street ?? '',
        address2: '',
        city: contact?.addresses[0]?.city ?? '',
        state: contact?.addresses[0]?.region ?? '',
        zip: contact?.addresses[0]?.postalCode ?? '',
        countryCode: contact?.addresses[0]?.isoCountryCode ?? '',
      },
    });
    onClose();
  };

  return (
    <TouchableCardContainer onPress={importData} {...props}>
      <Row>
        {contact?.image?.uri ? (
          <CollapsedImage source={{ uri: contact?.image?.uri }} />
        ) : (
          <CollapsedImageDefault>
            <H2Book>{initials}</H2Book>
          </CollapsedImageDefault>
        )}
        <Stack>
          <H4Book>{`${contact?.firstName ?? ''} ${
            contact?.lastName ?? ''
          }`}</H4Book>
          {contact?.phoneNumbers ? (
            <H6>{contact?.phoneNumbers[0]?.number ?? ''}</H6>
          ) : null}
          {contact?.emails ? <H6>{contact?.emails[0]?.email ?? ''}</H6> : null}
        </Stack>
      </Row>
    </TouchableCardContainer>
  );
};

DeciveContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  setContactInfo: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeciveContactCard;
