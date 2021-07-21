import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H4Book } from '../common';
// TODO put heart icons back when we have backend support
// import HeartFillIcon from '../../../assets/icons/heart-fill-icon.svg';
// import HeartOutlineIcon from '../../../assets/icons/heart-outline-icon.svg';
import DownloadIcon from '../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../assets/icons/remove-icon.svg';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import SendIcon from '../../../assets/icons/send-icon.svg';
import AppContext from '../../contexts/AppContext';
import { Localized, initLanguage } from '../../translations/Localized';

const Container = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 64px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;

const Row = styled.View`
  flex-direction: row;
`;

const CalloutMenu = ({
  // isFavorite,
  // setIsFavorite,
  isOwner,
  contentType = 'image',
  onShare,
  onDownload = () => {},
  closeCallout = () => {},
  onEdit = () => {},
  onRemove = () => {},
  onSend = () => {},
  ...props
}) => {
  initLanguage();
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
      {/* {isFavorite ? (
        <CalloutButton onPress={() => setIsFavorite(false)}>
          <Row >
            <HeartFillIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.favoriteFillColor,
              }}
            />
            <H4Book>{Localized('Favorite')}</H4Book>
          </Row>
        </CalloutButton>
      ) : (
        <CalloutButton onPress={() => setIsFavorite(true)}>
          <Row >
            <HeartOutlineIcon
              style={iconStyle}
            />
            <H4Book>{Localized('Favorite')}</H4Book>
          </Row>
        </CalloutButton>
      )} */}
      {contentType !== 'video' && (
        <CalloutButton
          onPress={() => {
            onDownload();
            closeCallout();
          }}>
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
    </Container>
  );
};

CalloutMenu.propTypes = {
  isFavorite: PropTypes.bool,
  setIsFavorite: PropTypes.func,
  isOwner: PropTypes.bool,
  contentType: PropTypes.string,
  onShare: PropTypes.func,
  onDownload: PropTypes.func,
  closeCallout: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onSend: PropTypes.func,
};

export default CalloutMenu;
