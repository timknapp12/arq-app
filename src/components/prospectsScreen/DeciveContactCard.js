import React from 'react';
import PropTypes from 'prop-types';
import { H2Book, H4Book, H6 } from '../common';
import {
  CardContainer,
  Row,
  CollapsedImage,
  CollapsedImageDefault,
  Stack,
} from './contactCard/card.styles';

const DeciveContactCard = ({ contact }) => {
  console.log(`contact`, contact);
  const initials = `${contact?.firstName?.charAt(0)}${contact?.lastName?.charAt(
    0,
  )}`;

  return (
    <CardContainer>
      <Row>
        {contact?.image ? (
          <CollapsedImage source={{ uri: contact?.image }} />
        ) : (
          <CollapsedImageDefault>
            <H2Book>{initials}</H2Book>
          </CollapsedImageDefault>
        )}
        <Stack>
          <H4Book>{`${contact?.firstName} ${contact?.lastName}`}</H4Book>
          {contact?.phoneNumbers ? (
            <H6>{contact?.phoneNumbers[0]?.number}</H6>
          ) : null}
          {contact?.emails ? <H6>{contact?.emails[0]?.email}</H6> : null}
        </Stack>
      </Row>
    </CardContainer>
  );
};

DeciveContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default DeciveContactCard;
