import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import PdfIcon from '../../../assets/icons/pdf-icon.svg';
import VideoIcon from '../../../assets/icons/video-icon.svg';
import PodcastIcon from '../../../assets/icons/podcast-icon.svg';
import ImageIcon from '../../../assets/icons/image-icon.svg';
import KebobIcon from '../../../assets/icons/kebob-icon.svg';
import HeartFillIcon from '../../../assets/icons/heart-fill-icon.svg';
import HeartOutlineIcon from '../../../assets/icons/heart-outline-icon.svg';
import DownloadIcon from '../../../assets/icons/download-icon.svg';
import ShareIcon from '../../../assets/icons/share-icon.svg';
import RemoveIcon from '../../../assets/icons/remove-icon.svg';
import UploadIcon from '../../../assets/icons/upload-icon.svg';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../contexts/AppContext';
import { H4Book, H5Black, H6Book, Flexbox } from '../common';

const { width } = Dimensions.get('window');

const ProductCardContainer = styled.View`
  width: 100%;
`;

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

const TitleAndDescription = styled.View`
  flex: 1;
  padding: 4px 0;
`;

const ImageAndIconContainer = styled.View`
  width: 100%;
  flex-direction: row;
  display: ${(props) => (props.isExpanded ? 'flex' : 'none')};
`;

const IconColumn = styled.View`
  height: 50px;
  justify-content: space-between;
`;

const IconRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const ProductCallout = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 60px;
`;

const assetIconContainerWidth = 45;
const smallerImageWidth = width - assetIconContainerWidth - 40;
const smallerImageHeight = smallerImageWidth / 2;

const AssetIconContainer = styled.View`
  width: ${assetIconContainerWidth}px;
  /* padding: 4px 0; */
  align-items: flex-end;
`;

const ProductCard = ({
  title,
  onPress,
  description,
  source,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  ...props
}) => {
  const { theme } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

  useEffect(() => {
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(false);
    }
    return () => {
      setIsCalloutOpen(false);
    };
  }, [isCalloutOpenFromParent]);

  const onCallout = async (e) => {
    e.stopPropagation();
    if (isCalloutOpen) {
      setIsCalloutOpen(false);
      setIsCalloutOpenFromParent(false);
    }
    if (!isCalloutOpen) {
      await setIsCalloutOpenFromParent(true);
      setIsCalloutOpen(true);
    }
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(true);
    }
  };
  return (
    <ProductCardContainer {...props}>
      <OuterContainer isExpanded={isExpanded}>
        {isExpanded && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 4,
            }}>
            <H4Book>{title}</H4Book>
            <TouchableOpacity
              onPress={() => {
                setIsExpanded((state) => !state);
              }}>
              <MaterialCommunityIcon
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                color={theme.activeTint}
                size={24}
              />
            </TouchableOpacity>
          </View>
        )}
        <ImageAndIconContainer isExpanded={isExpanded}>
          <Image
            style={{
              flex: 1,
              // width: smallerImageWidth,
              height: smallerImageHeight,
            }}
            source={{
              uri: source,
            }}
          />
          <AssetIconContainer>
            <TouchableOpacity style={{ padding: 0 }}>
              <PdfIcon
                style={{
                  color: theme.activeTint,
                  height: 40,
                  width: 40,
                  padding: 0,
                  // backgroundColor: 'red',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <VideoIcon
                style={{ color: theme.activeTint, height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <PodcastIcon
                style={{ color: theme.activeTint, height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <ImageIcon
                style={{ color: theme.activeTint, height: 40, width: 40 }}
              />
            </TouchableOpacity>
          </AssetIconContainer>
        </ImageAndIconContainer>
        <InnerContainer>
          {!isExpanded && <View style={{ width: 30 }} />}
          <TitleAndDescription>
            <TouchableOpacity onPress={onPress}>
              {!isExpanded && (
                <H5Black style={{ marginBottom: 4 }}>{title}</H5Black>
              )}
              <H6Book>{description}</H6Book>
            </TouchableOpacity>
          </TitleAndDescription>
          {!isExpanded && (
            <IconColumn>
              <TouchableOpacity
                onPress={() => {
                  setIsExpanded((state) => !state);
                }}>
                <MaterialCommunityIcon
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  color={theme.activeTint}
                  size={24}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={(e) => onCallout(e)}>
                <KebobIcon
                  style={{ height: 20, width: 20, color: theme.activeTint }}
                />
              </TouchableOpacity>
            </IconColumn>
          )}
        </InnerContainer>
        {isExpanded && (
          <IconRow>
            <HeartFillIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.favoriteFillColor,
              }}
            />
            <HeartOutlineIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <DownloadIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <ShareIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
          </IconRow>
        )}
      </OuterContainer>
      {/* TODO close the callout when a user taps another part of the screen  */}
      {/* TODO conditionally render the options in the callout  */}
      {isCalloutOpen && (
        <ProductCallout>
          <Flexbox direction="row" justify="flex-start">
            <HeartOutlineIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>Favorite</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <HeartFillIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.favoriteFillColor,
              }}
            />
            <H4Book>Favorite</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <DownloadIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>Download</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <ShareIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>Share</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <RemoveIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>Remove</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <UploadIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>Upload</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <EditIcon
              style={{
                marginEnd: 8,
                height: 24,
                width: 24,
                color: theme.activeTint,
              }}
            />
            <H4Book>Edit</H4Book>
          </Flexbox>
        </ProductCallout>
      )}
    </ProductCardContainer>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  description: PropTypes.string,
  source: PropTypes.string,
  /* callout from parent is so that tapping anywhere on the screen will close the callout */
  isCalloutOpenFromParent: PropTypes.bool,
  setIsCalloutOpenFromParent: PropTypes.func,
};

export default ProductCard;
