import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H4Book } from '../common';
import DownloadIcon from '../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../assets/icons/remove-icon.svg';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import SendIcon from '../../../assets/icons/send-icon.svg';
import LeadCaptureIcon from '../../../assets/icons/enrollment-icon.svg';
import AppContext from '../../contexts/AppContext';
import { Localized } from '../../translations/Localized';

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

const CalloutMenu = ({
  isOwner,
  contentType = 'image',
  onShare,
  onDownload = () => {},
  closeCallout = () => {},
  onEdit = () => {},
  onRemove = () => {},
  onSend = () => {},
  onLeadCapture = () => {},
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
      {isOwner && (
        <>
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
        </>
      )}
      {contentType !== 'video' && contentType !== 'podcast' && (
        <CalloutButton
          onPress={() => {
            onDownload();
            closeCallout();
          }}
        >
          <Row>
            <DownloadIcon style={iconStyle} />
            <H4Book>{Localized('Download')}</H4Book>
          </Row>
        </CalloutButton>
      )}
      <CalloutButton onPress={onShare}>
        <Row>
          <ShareIcon style={iconStyle} />
          <H4Book>{Localized('Share')}</H4Book>
        </Row>
      </CalloutButton>
      <CalloutButton onPress={onSend}>
        <Row>
          <SendIcon style={iconStyle} />
          <H4Book>{Localized('Send to Prospect')}</H4Book>
        </Row>
      </CalloutButton>
      <CalloutButton onPress={onLeadCapture}>
        <Row>
          <LeadCaptureIcon style={iconStyle} />
          <H4Book>{Localized('Lead Capture')}</H4Book>
        </Row>
      </CalloutButton>
    </Container>
  );
};

CalloutMenu.propTypes = {
  isOwner: PropTypes.bool,
  contentType: PropTypes.string,
  onShare: PropTypes.func,
  onDownload: PropTypes.func,
  closeCallout: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onSend: PropTypes.func,
  onLeadCapture: PropTypes.func,
};

export default CalloutMenu;
