import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Linking, Image, TouchableOpacity } from 'react-native';
import { H5, H6Secodnary } from '../../../common';
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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../../../contexts/AppContext';
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
  hasPermissions,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  return (
    <OuterContainer isExpanded={isExpanded} {...props}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setIsExpanded(false);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingStart: 12,
            paddingEnd: 10,
          }}>
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
                  onPress={() =>
                    navigation.navigate('Resources Asset Screen', {
                      title: asset.linkTitle.toUpperCase(),
                      url: asset.linkUrl,
                      contentType: asset.contentType,
                    })
                  }
                  key={asset.linkId}>
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
                  onPress={() => Linking.openURL(asset.linkUrl)}
                  key={asset.linkId}>
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
                  onPress={() => Linking.openURL(asset.linkUrl)}
                  key={asset.linkId}>
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
                  onPress={() =>
                    navigation.navigate('Resources Asset Screen', {
                      title: asset.linkTitle.toUpperCase(),
                      url: asset.linkUrl,
                      contentType: asset.contentType,
                    })
                  }>
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
          <H6Secodnary>{description}</H6Secodnary>
        </TitleAndDescription>
      </InnerContainer>
      <IconRow>
        {/* {isFavorite ? (
          <HeartFillIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.favoriteFillColor,
            }}
          />
        ) : (
          <HeartOutlineIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.primaryTextColor,
            }}
          />
        )} */}
        {hasPermissions && (
          <RemoveIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.primaryTextColor,
            }}
          />
        )}
        <TouchableOpacity onPress={onDownload}>
          <DownloadIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.primaryTextColor,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <ShareIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.primaryTextColor,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSend}>
          <SendIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.primaryTextColor,
            }}
          />
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
  hasPermissions: PropTypes.bool,
};
export default ExpandedProductCard;
