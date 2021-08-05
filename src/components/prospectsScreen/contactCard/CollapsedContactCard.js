import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H2Book, H4Book, H6 } from '../../common';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import account from '../../../../assets/icons/ic_account.png';
import AddContactModal from '../AddContactModal';
import AppContext from '../../../contexts/AppContext';
import ProspectsContext from '../../../contexts/ProspectsContext';
import {
  CardContainer,
  Row,
  Stack,
  IconColumn,
  CollapsedImage,
  CollapsedImageDefault,
} from './card.styles';
import ContactCalloutMenu from './ContactCalloutMenu';

const CollapsedContactCard = ({
  toggleExpanded,
  data,
  initials,
  isCalloutOpen,
  onCallout,
  isFilterMenuOpen,
  onRemove,
  sendEmail,
  sendText,
  ...props
}) => {
  const { theme } = useContext(AppContext);
  const { isCalloutOpenFromParent } = useContext(ProspectsContext);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const { thumbnailUrl, firstName, lastName, primaryPhone, emailAddress } =
    data;
  return (
    <>
      <CardContainer {...props}>
        <TouchableOpacity
          /* active opacity changes depending on whether the touch event is outside the click boundary of the menu */
          activeOpacity={isFilterMenuOpen || isCalloutOpenFromParent ? 1 : 0.2}
          onPress={toggleExpanded}>
          <Row>
            {thumbnailUrl ? (
              <CollapsedImage
                source={{ uri: thumbnailUrl }}
                defualtSource={account}
              />
            ) : (
              <CollapsedImageDefault>
                <H2Book>{initials}</H2Book>
              </CollapsedImageDefault>
            )}
            <Stack>
              <H4Book>{`${firstName} ${lastName}`}</H4Book>
              {primaryPhone ? <H6>{primaryPhone}</H6> : null}
              {emailAddress ? <H6>{emailAddress}</H6> : null}
            </Stack>
            <IconColumn>
              <MaterialCommunityIcon
                name="chevron-down"
                color={theme.primaryTextColor}
                size={24}
              />
              <TouchableOpacity onPress={onCallout}>
                <KebobIcon
                  style={{
                    height: 20,
                    width: 20,
                    color: theme.primaryTextColor,
                  }}
                />
              </TouchableOpacity>
            </IconColumn>
          </Row>
          {isCalloutOpen && (
            <ContactCalloutMenu
              onEdit={() => setIsAddContactModalOpen(true)}
              onRemove={onRemove}
              emailAddress={emailAddress}
              primaryPhone={primaryPhone}
              sendEmail={sendEmail}
              sendText={sendText}
            />
          )}
        </TouchableOpacity>
      </CardContainer>
      {isAddContactModalOpen && (
        <AddContactModal
          isAddContactModalOpen={isAddContactModalOpen}
          onClose={() => {
            onCallout();
            setIsAddContactModalOpen(false);
          }}
          data={data}
        />
      )}
    </>
  );
};

CollapsedContactCard.propTypes = {
  toggleExpanded: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  initials: PropTypes.string.isRequired,
  isCalloutOpen: PropTypes.bool.isRequired,
  onCallout: PropTypes.func.isRequired,
  isFilterMenuOpen: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  sendText: PropTypes.func.isRequired,
};

export default CollapsedContactCard;
