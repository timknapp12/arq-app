import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H2Book, H4Book, H6, Flexbox, Link } from '../../common';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from '../../../../assets/icons/email-icon.svg';
import MessageIcon from '../../../../assets/icons/message-icon.svg';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import account from '../../../../assets/icons/ic_account.png';
import AppContext from '../../../contexts/AppContext';
import AddContactModal from '../AddContactModal';
import {
  CardContainer,
  Row,
  Stack,
  ExpandedImage,
  ExpandedImageDefault,
  Gap,
  IconRow,
} from './card.styles';
import ReadMore from 'react-native-read-more-text';
import { Localized } from '../../../translations/Localized';

const ExpandedContactCard = ({
  isCalloutOpenFromParent,
  toggleExpanded,
  data,
  thumbnailUrl,
  initials,
  onRemove,
  sendEmail,
  sendText,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const {
    firstName = '',
    lastName = '',
    primaryPhone = '',
    emailAddress = '',
    address,
    notes,
  } = data;

  const largeIconStyle = {
    color: theme.primaryTextColor,
    height: 42,
    width: 42,
  };
  const smallIconStyle = {
    color: theme.primaryTextColor,
    height: 36,
    width: 36,
    marginStart: 8,
  };

  const renderTruncatedFooter = (handlePress) => {
    return (
      <Link onPress={handlePress}>{Localized('Show More').toUpperCase()}</Link>
    );
  };

  const renderRevealedFooter = (handlePress) => {
    return (
      <Link onPress={handlePress}>{Localized('Show Less').toUpperCase()}</Link>
    );
  };

  return (
    <>
      <CardContainer {...props}>
        <TouchableOpacity
          activeOpacity={isCalloutOpenFromParent ? 1 : 0.2}
          onPress={toggleExpanded}>
          <Flexbox align="flex-end">
            <MaterialCommunityIcon
              name="chevron-up"
              color={theme.primaryTextColor}
              size={24}
            />
          </Flexbox>
          {thumbnailUrl ? (
            <ExpandedImage
              key={thumbnailUrl}
              source={{ uri: thumbnailUrl }}
              defualtSource={account}
            />
          ) : (
            <ExpandedImageDefault>
              <H2Book>{initials}</H2Book>
            </ExpandedImageDefault>
          )}
          <Stack expanded>
            <Row>
              {emailAddress ? (
                <TouchableOpacity onPress={sendEmail}>
                  <EmailIcon style={largeIconStyle} />
                </TouchableOpacity>
              ) : null}
              {primaryPhone ? (
                <TouchableOpacity onPress={sendText}>
                  <MessageIcon style={largeIconStyle} />
                </TouchableOpacity>
              ) : null}
            </Row>
            <H4Book>{`${firstName} ${lastName}`}</H4Book>
            {primaryPhone ? (
              <>
                <Gap />
                <H6>{primaryPhone}</H6>
              </>
            ) : null}
            {emailAddress ? (
              <>
                <Gap />
                <H6>{emailAddress}</H6>
              </>
            ) : null}
            {address?.address1 ? (
              <>
                <Gap />
                <H6>{address?.address1}</H6>
              </>
            ) : null}
            {address?.address2 ? <H6>{address?.address2}</H6> : null}
            <H6>{`${address?.city ?? ''} ${address?.state ?? ''} ${
              address?.zip ?? ''
            }`}</H6>
            {notes ? (
              <>
                <Gap />
                <Gap />
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}>
                  <H6>{notes}</H6>
                </ReadMore>
              </>
            ) : null}
          </Stack>
        </TouchableOpacity>

        <IconRow>
          <TouchableOpacity onPress={() => setIsAddContactModalOpen(true)}>
            <EditIcon style={smallIconStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onRemove}>
            <RemoveIcon style={smallIconStyle} />
          </TouchableOpacity>
        </IconRow>
      </CardContainer>
      {isAddContactModalOpen && (
        <AddContactModal
          isAddContactModalOpen={isAddContactModalOpen}
          onClose={() => setIsAddContactModalOpen(false)}
          data={data}
        />
      )}
    </>
  );
};

ExpandedContactCard.propTypes = {
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  thumbnailUrl: PropTypes.string,
  initials: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  sendText: PropTypes.func.isRequired,
};

export default ExpandedContactCard;
