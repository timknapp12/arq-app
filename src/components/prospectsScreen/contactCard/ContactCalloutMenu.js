import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H4Book } from '../../common';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import MoveIcon from '../../../../assets/icons/move-icon.svg';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import EmailIcon from '../../../../assets/icons/email-icon.svg';
import MessageIcon from '../../../../assets/icons/message-icon.svg';
import AppContext from '../../../contexts/AppContext';
import ProspectsContext from '../../../contexts/ProspectsContext';
import { Localized, initLanguage } from '../../../translations/Localized';

const Container = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 72px;
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
  onMove,
  onRemove,
  email,
  phone,
  ...props
}) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const { view, onEmail, onMessage } = useContext(ProspectsContext);

  const iconStyle = {
    marginEnd: 8,
    height: 24,
    width: 24,
    color: theme.primaryTextColor,
  };

  const moveText =
    view.name === Localized('PROSPECTS')
      ? Localized('Move to Partners')
      : Localized('Move to Prospects');

  return (
    <Container {...props}>
      <CalloutButton onPress={onEdit}>
        <Row>
          <EditIcon style={iconStyle} />
          <H4Book>{Localized('Edit')}</H4Book>
        </Row>
      </CalloutButton>
      <CalloutButton onPress={onMove}>
        <Row>
          <MoveIcon style={iconStyle} />
          <H4Book>{moveText ? moveText : ''}</H4Book>
        </Row>
      </CalloutButton>
      <CalloutButton onPress={onRemove}>
        <Row>
          <RemoveIcon style={iconStyle} />
          <H4Book>{Localized('Remove')}</H4Book>
        </Row>
      </CalloutButton>
      {email.length > 0 ? (
        <CalloutButton onPress={() => onEmail(email)}>
          <Row>
            <EmailIcon style={iconStyle} />
            <H4Book>{Localized('Email')}</H4Book>
          </Row>
        </CalloutButton>
      ) : null}
      {phone.length > 0 ? (
        <CalloutButton onPress={() => onMessage(phone)}>
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
  onMove: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
};

export default ContactCalloutMenu;
