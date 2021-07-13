import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from '../../../../assets/icons/email-icon.svg';
import MessageIcon from '../../../../assets/icons/message-icon.svg';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import MoveIcon from '../../../../assets/icons/move-icon.svg';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import account from '../../../../assets/icons/ic_account.png';
import { H2Book, H4Book, H6, Flexbox } from '../../common';
import AppContext from '../../../contexts/AppContext';
import ProspectsContext from '../../../contexts/ProspectsContext';
import {
  CardContainer,
  Row,
  Stack,
  ExpandedImage,
  ExpandedImageDefault,
  Gap,
  IconRow,
} from './card.styles';

const ExpandedContactCard = ({ toggleExpanded, data, initials, ...props }) => {
  const { theme } = useContext(AppContext);
  const { onEmail, onMessage } = useContext(ProspectsContext);
  const {
    thumbnailUrl,
    firstName,
    lastName,
    primaryPhone,
    emailAddress,
    address,
  } = data;

  const { address1, address2, city, state, zipcode } = address;

  const largeIconStyle = {
    color: theme.primaryTextColor,
    height: 42,
    width: 42,
  };
  const smallIconStyle = {
    color: theme.primaryTextColor,
    height: 24,
    width: 24,
    marginStart: 8,
  };
  return (
    <CardContainer {...props}>
      <TouchableOpacity onPress={toggleExpanded}>
        <Flexbox align="flex-end">
          <MaterialCommunityIcon
            name="chevron-up"
            color={theme.primaryTextColor}
            size={24}
          />
        </Flexbox>
        {thumbnailUrl ? (
          <ExpandedImage
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
              <TouchableOpacity onPress={() => onEmail(emailAddress)}>
                <EmailIcon style={largeIconStyle} />
              </TouchableOpacity>
            ) : null}
            {primaryPhone ? (
              <TouchableOpacity onPress={() => onMessage(primaryPhone)}>
                <MessageIcon style={largeIconStyle} />
              </TouchableOpacity>
            ) : null}
          </Row>
          <H4Book>{`${firstName} ${lastName}`}</H4Book>
          <Gap />
          {primaryPhone ? <H6>{primaryPhone}</H6> : null}
          <Gap />
          {emailAddress ? <H6>{emailAddress}</H6> : null}
          <Gap />
          {address1 ? <H6>{address1}</H6> : null}
          {address2 ? <H6>{address2}</H6> : null}
          <H6>{`${city}, ${state} ${zipcode}`}</H6>
        </Stack>
      </TouchableOpacity>
      <IconRow>
        <TouchableOpacity>
          <EditIcon style={smallIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MoveIcon style={smallIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity>
          <RemoveIcon style={smallIconStyle} />
        </TouchableOpacity>
      </IconRow>
    </CardContainer>
  );
};

ExpandedContactCard.propTypes = {
  toggleExpanded: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  initials: PropTypes.string.isRequired,
};

export default ExpandedContactCard;
