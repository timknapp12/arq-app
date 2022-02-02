import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H4Book } from '../../common';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import EmailIcon from '../../../../assets/icons/email-icon.svg';
import MessageIcon from '../../../../assets/icons/message-icon.svg';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';

const Container = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 64px;
  box-shadow: ${(props) => props.theme.dropShadow};
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;

const Row = styled.View`
  flex-direction: row;
`;

const ContactCalloutMenu = ({
  onEdit,
  onRemove,
  emailAddress,
  primaryPhone,
  sendEmail,
  sendText,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  const iconStyle = {
    marginEnd: 8,
    height: 24,
    width: 24,
    color: theme.primaryTextColor,
  };

  return (
    <Container {...props}>
      <CalloutButton onPress={onEdit}>
        <Row>
          <EditIcon style={iconStyle} />
          <H4Book>{Localized('Edit')}</H4Book>
        </Row>
      </CalloutButton>
      <CalloutButton onPress={onRemove}>
        <Row>
          <RemoveIcon style={iconStyle} />
          <H4Book>{Localized('Remove')}</H4Book>
        </Row>
      </CalloutButton>
      {emailAddress.length > 0 ? (
        <CalloutButton onPress={sendEmail}>
          <Row>
            <EmailIcon style={iconStyle} />
            <H4Book>{Localized('Email')}</H4Book>
          </Row>
        </CalloutButton>
      ) : null}
      {primaryPhone.length > 0 ? (
        <CalloutButton onPress={sendText}>
          <Row>
            <MessageIcon style={iconStyle} />
            <H4Book>{Localized('Text Message')}</H4Book>
          </Row>
        </CalloutButton>
      ) : null}
    </Container>
  );
};

ContactCalloutMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  emailAddress: PropTypes.string,
  primaryPhone: PropTypes.string,
  sendEmail: PropTypes.func.isRequired,
  sendText: PropTypes.func.isRequired,
};

export default ContactCalloutMenu;
