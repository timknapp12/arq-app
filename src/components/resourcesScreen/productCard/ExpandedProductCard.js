import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  View,
  Linking,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { H4Book, H6Book } from '../../common';
import PdfIcon from '../../../../assets/icons/pdf-icon.svg';
import VideoIcon from '../../../../assets/icons/video-icon.svg';
import PodcastIcon from '../../../../assets/icons/podcast-icon.svg';
import ImageIcon from '../../../../assets/icons/image-icon.svg';
import HeartFillIcon from '../../../../assets/icons/heart-fill-icon.svg';
import HeartOutlineIcon from '../../../../assets/icons/heart-outline-icon.svg';
import DownloadIcon from '../../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../../contexts/AppContext';

const { width } = Dimensions.get('window');

const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 6px 0;
  border-radius: 5px;
  margin-bottom: 10px;
  height: ${(props) => (props.isExpanded ? 'auto' : '60px')};
  overflow: hidden;
`;

const InnerContainer = styled.View`
  width: 100%;
  padding: 0 6px;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageAndIconContainer = styled.View`
  width: 100%;
  flex-direction: row;
  display: ${(props) => (props.isExpanded ? 'flex' : 'none')};
`;

const IconRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const assetIconContainerWidth = 45;
const smallerImageWidth = width - assetIconContainerWidth - 40;
const smallerImageHeight = smallerImageWidth / 2;

const AssetIconContainer = styled.View`
  width: ${assetIconContainerWidth}px;
  align-items: flex-end;
`;

const TitleAndDescription = styled.View`
  flex: 1;
  padding: 4px 0;
`;

const ExpandedProductCard = ({
  title,
  url,
  isExpanded,
  setIsExpanded,
  description,
  navigation,
  isDownloaded,
  isFavorited,
  assetList,
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
            padding: 4,
          }}>
          <H4Book>{title}</H4Book>
          <MaterialCommunityIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            color={theme.activeTint}
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
                      title: asset.title.toUpperCase(),
                      url: asset.url,
                      contentType: asset.contentType,
                    })
                  }
                  key={asset.id}>
                  <PdfIcon
                    style={{
                      color: theme.activeTint,
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
                  onPress={() => Linking.openURL(asset.url)}
                  key={asset.id}>
                  <VideoIcon
                    style={{
                      color: theme.activeTint,
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
                  onPress={() => Linking.openURL(asset.url)}
                  key={asset.id}>
                  <PodcastIcon
                    style={{
                      color: theme.activeTint,
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
                  key={asset.id}
                  onPress={() =>
                    navigation.navigate('Resources Asset Screen', {
                      title: asset.title.toUpperCase(),
                      url: asset.url,
                      contentType: asset.contentType,
                    })
                  }>
                  <ImageIcon
                    style={{
                      color: theme.activeTint,
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
          <H6Book>{description}</H6Book>
        </TitleAndDescription>
      </InnerContainer>
      <IconRow>
        {isFavorited ? (
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
              color: theme.activeTint,
            }}
          />
        )}
        {isDownloaded ? (
          <RemoveIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.activeTint,
            }}
          />
        ) : (
          <DownloadIcon
            style={{
              marginEnd: 8,
              height: 24,
              width: 24,
              color: theme.activeTint,
            }}
          />
        )}
        <ShareIcon
          style={{
            marginEnd: 8,
            height: 24,
            width: 24,
            color: theme.activeTint,
          }}
        />
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
  isDownloaded: PropTypes.bool,
  isFavorited: PropTypes.bool,
  assetList: PropTypes.array,
};
export default ExpandedProductCard;
