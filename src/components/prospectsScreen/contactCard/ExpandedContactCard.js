import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from '../../../../assets/icons/email-icon.svg';
import MessageIcon from '../../../../assets/icons/message-icon.svg';
import account from '../../../../assets/icons/ic_account.png';
import { H2Book, H4Book, H6, Flexbox } from '../../common';
import AppContext from '../../../contexts/AppContext';
import {
  CardContainer,
  Row,
  Stack,
  ExpandedImage,
  ExpandedImageDefault,
  Gap,
} from './card.styles';

const ExpandedContactCard = ({ toggleExpanded, data, initials, ...props }) => {
  const { theme } = useContext(AppContext);
  const {
    image,
    firstName,
    lastName,
    phone,
    email,
    address1,
    address2,
    city,
    state,
    zipcode,
  } = data;
  const iconStyle = { color: theme.primaryTextColor, height: 42, width: 42 };
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
        {image.url ? (
          <ExpandedImage source={{ uri: image.url }} defualtSource={account} />
        ) : (
          <ExpandedImageDefault>
            <H2Book>{initials}</H2Book>
          </ExpandedImageDefault>
        )}
        <Stack expanded>
          <Row>
            {email ? (
              <TouchableOpacity>
                <EmailIcon style={iconStyle} />
              </TouchableOpacity>
            ) : null}
            {phone ? (
              <TouchableOpacity>
                <MessageIcon style={iconStyle} />
              </TouchableOpacity>
            ) : null}
          </Row>
          <H4Book>{`${firstName} ${lastName}`}</H4Book>
          <Gap />
          {phone ? <H6>{phone}</H6> : null}
          <Gap />
          {email ? <H6>{email}</H6> : null}
          <Gap />
          {address1 ? <H6>{address1}</H6> : null}
          {address2 ? <H6>{address2}</H6> : null}
          <H6>{`${city}, ${state} ${zipcode}`}</H6>
        </Stack>
      </TouchableOpacity>
    </CardContainer>
  );
};

ExpandedContactCard.propTypes = {
  toggleExpanded: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  initials: PropTypes.string.isRequired,
};

export default ExpandedContactCard;
