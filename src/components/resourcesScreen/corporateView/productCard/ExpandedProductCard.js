import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Linking, Image, TouchableOpacity, Alert } from 'react-native';
import { H5, H6Secondary } from '../../../common';
import PdfIcon from '../../../../../assets/icons/pdf-icon.svg';
import VideoIcon from '../../../../../assets/icons/video-icon.svg';
import PodcastIcon from '../../../../../assets/icons/podcast-icon.svg';
import ImageIcon from '../../../../../assets/icons/image-icon.svg';
// TODO put heart icons back when we have backend support
// import HeartFillIcon from '../../../../../assets/icons/heart-fill-icon.svg';
// import HeartOutlineIcon from '../../../../../assets/icons/heart-outline-icon.svg';
import DownloadIcon from '../../../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../../../assets/icons/remove-icon.svg';
import SendIcon from '../../../../../assets/icons/send-icon.svg';
import LeadCaptureIcon from '../../../../../assets/icons/enrollment-icon.svg';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../../../contexts/AppContext';
import { Localized } from '../../../../translations/Localized';
import {
  OuterContainer,
  InnerContainer,
  ImageAndIconContainer,
  IconRow,
  smallerImageHeight,
  AssetIconContainer,
  TitleAndDescription,
} from './ExpandedProductCard.styles';

const ExpandedProductCard = ({
  // isFavorite,
  title,
  url,
  isExpanded,
  setIsExpanded,
  description,
  navigation,
  assetList,
  onDownload,
  onShare,
  onSend,
  onLeadCapture,
  hasPermissionsToWrite,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  const smallIconStyle = {
    color: theme.primaryTextColor,
    height: 36,
    width: 36,
    marginStart: 8,
  };

  const openAsset = (asset) => {
    if (asset?.linkUrl?.length < 1) {
      return Alert.alert(Localized('Item not found'));
    }
    if (asset.contentType === 'pdf' || asset.contentType === 'image') {
      navigation.navigate('Resources Asset Screen', {
        title: asset.linkTitle.toUpperCase(),
        url: asset.linkUrl,
        contentType: asset.contentType,
      });
    } else {
      Linking.openURL(asset.linkUrl);
    }
  };

  return (
    <OuterContainer isExpanded={isExpanded} {...props}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setIsExpanded(false);
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingStart: 12,
            paddingEnd: 10,
          }}
        >
          <H5 ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1 }}>
            {title}
          </H5>
          <MaterialCommunityIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            color={theme.primaryTextColor}
            size={24}
          />
        </View>
      </TouchableOpacity>
      <ImageAndIconContainer isExpanded={isExpanded}>
        <Image
          style={{
            flex: 1,
            height: smallerImageHeight,
          }}
          source={{
            uri: url,
          }}
        />
        <AssetIconContainer>
          {assetList.map((asset) => {
            if (asset.contentType === 'pdf') {
              return (
                <TouchableOpacity
                  onPress={() => openAsset(asset)}
                  key={asset.linkId}
                >
                  <PdfIcon
                    style={{
                      color: theme.primaryTextColor,
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
              );
            }
            if (asset.contentType === 'video') {
              return (
                <TouchableOpacity
                  onPress={() => openAsset(asset)}
                  key={asset.linkId}
                >
                  <VideoIcon
                    style={{
                      color: theme.primaryTextColor,
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
              );
            }
            if (asset.contentType === 'podcast') {
              return (
                <TouchableOpacity
                  onPress={() => openAsset(asset)}
                  key={asset.linkId}
                >
                  <PodcastIcon
                    style={{
                      color: theme.primaryTextColor,
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
              );
            }
            if (asset.contentType === 'image') {
              return (
                <TouchableOpacity
                  key={asset.linkId}
                  onPress={() => openAsset(asset)}
                >
                  <ImageIcon
                    style={{
                      color: theme.primaryTextColor,
                      height: 40,
                      width: 40,
                    }}
                  />
                </TouchableOpacity>
              );
            }
          })}
        </AssetIconContainer>
      </ImageAndIconContainer>
      <InnerContainer>
        <TitleAndDescription>
          <H6Secondary>{description}</H6Secondary>
        </TitleAndDescription>
      </InnerContainer>
      <IconRow>
        {/* {isFavorite ? (
          <HeartFillIcon
            style={smallIconStyle}
          />
        ) : (
          <HeartOutlineIcon
            style={smallIconStyle}
          />
        )} */}
        {hasPermissionsToWrite && <RemoveIcon style={smallIconStyle} />}
        <TouchableOpacity onPress={onDownload}>
          <DownloadIcon style={smallIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <ShareIcon style={smallIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSend}>
          <SendIcon style={smallIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLeadCapture}>
          <LeadCaptureIcon style={smallIconStyle} />
        </TouchableOpacity>
      </IconRow>
    </OuterContainer>
  );
};

ExpandedProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  navigation: PropTypes.object,
  isExpanded: PropTypes.bool,
  setIsExpanded: PropTypes.func,
  isFavorite: PropTypes.bool,
  assetList: PropTypes.array,
  onDownload: PropTypes.func,
  onShare: PropTypes.func,
  onSend: PropTypes.func,
  onLeadCapture: PropTypes.func,
  hasPermissionsToWrite: PropTypes.bool,
};
export default ExpandedProductCard;
