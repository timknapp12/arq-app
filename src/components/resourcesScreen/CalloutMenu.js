import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H4Book, Flexbox } from '../common';
import HeartFillIcon from '../../../assets/icons/heart-fill-icon.svg';
import HeartOutlineIcon from '../../../assets/icons/heart-outline-icon.svg';
import DownloadIcon from '../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../assets/icons/remove-icon.svg';
import UploadIcon from '../../../assets/icons/upload-icon.svg';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import AppContext from '../../contexts/AppContext';
import { Localized, initLanguage } from '../../translations/Localized';

const Container = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 64px;
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;

const CalloutMenu = ({
  isFavorite,
  setIsFavorite,
  isAssetDownloaded,
  setIsAssetDownloaded,
  hasPermissions,
}) => {
  initLanguage();
  const { theme } = useContext(AppContext);

  return (
    <Container>
      {isFavorite ? (
        <CalloutButton onPress={() => setIsFavorite(false)}>
          <Flexbox direction="row" justify="flex-start">
            <HeartFillIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.favoriteFillColor,
              }}
            />
            <H4Book>{Localized('Favorite')}</H4Book>
          </Flexbox>
        </CalloutButton>
      ) : (
        <CalloutButton onPress={() => setIsFavorite(true)}>
          <Flexbox direction="row" justify="flex-start">
            <HeartOutlineIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.favoriteFillColor,
              }}
            />
            <H4Book>{Localized('Favorite')}</H4Book>
          </Flexbox>
        </CalloutButton>
      )}
      {isAssetDownloaded ? (
        <CalloutButton onPress={() => setIsAssetDownloaded(false)}>
          <Flexbox direction="row" justify="flex-start">
            <RemoveIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>{Localized('Remove')}</H4Book>
          </Flexbox>
        </CalloutButton>
      ) : (
        <CalloutButton onPress={() => setIsAssetDownloaded(true)}>
          <Flexbox direction="row" justify="flex-start">
            <DownloadIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>{Localized('Download')}</H4Book>
          </Flexbox>
        </CalloutButton>
      )}
      <CalloutButton onPress={() => {}}>
        <Flexbox direction="row" justify="flex-start">
          <ShareIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.activeTint,
            }}
          />
          <H4Book>{Localized('Share')}</H4Book>
        </Flexbox>
      </CalloutButton>
      {hasPermissions && (
        <>
          <CalloutButton>
            <Flexbox direction="row" justify="flex-start">
              <UploadIcon
                style={{
                  marginEnd: 8,
                  height: 24,
                  width: 24,
                  color: theme.activeTint,
                }}
              />
              <H4Book>{Localized('Upload')}</H4Book>
            </Flexbox>
          </CalloutButton>
          <CalloutButton>
            <Flexbox direction="row" justify="flex-start">
              <EditIcon
                style={{
                  marginEnd: 8,
                  height: 24,
                  width: 24,
                  color: theme.activeTint,
                }}
              />
              <H4Book>{Localized('Edit')}</H4Book>
            </Flexbox>
          </CalloutButton>
        </>
      )}
    </Container>
  );
};

CalloutMenu.propTypes = {
  isFavorite: PropTypes.bool,
  setIsFavorite: PropTypes.func,
  isAssetDownloaded: PropTypes.bool,
  setIsAssetDownloaded: PropTypes.func,
  hasPermissions: PropTypes.bool,
};

export default CalloutMenu;
