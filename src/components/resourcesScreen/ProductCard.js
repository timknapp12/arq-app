import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import PdfIcon from '../../../assets/icons/pdf-icon.svg';
import VideoIcon from '../../../assets/icons/video-icon.svg';
import PodcastIcon from '../../../assets/icons/podcast-icon.svg';
import ImageIcon from '../../../assets/icons/image-icon.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
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
                <MaterialIcon
                  name="more-vert"
                  color={theme.activeTint}
                  size={20}
                />
              </TouchableOpacity>
            </IconColumn>
          )}
        </InnerContainer>
        {isExpanded && (
          <IconRow>
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="heart-outline"
              size={20}
              color={theme.activeTint}
            />
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="download-outline"
              size={20}
              color={theme.activeTint}
            />
            <IonIcon
              style={{ marginEnd: 8 }}
              name="share-social-outline"
              size={20}
              strokeWidth={1}
              color={theme.activeTint}
            />
          </IconRow>
        )}
      </OuterContainer>
      {/* TODO close the callout when a user taps another part of the screen  */}
      {/* TODO conditionally render the options in the callout  */}
      {isCalloutOpen && (
        <ProductCallout>
          <Flexbox direction="row" justify="flex-start">
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="heart"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Favorite</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="download"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Download</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialCommunityIcon
              style={{ marginEnd: 8 }}
              name="share-variant"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Share</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialIcon
              style={{ marginEnd: 8 }}
              name="remove-circle"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Remove</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialIcon
              style={{ marginEnd: 8 }}
              name="file-upload"
              size={20}
              color={theme.activeTint}
            />
            <H4Book>Upload</H4Book>
          </Flexbox>
          <Flexbox direction="row" justify="flex-start">
            <MaterialIcon
              style={{ marginEnd: 8 }}
              name="edit"
              size={20}
              color={theme.activeTint}
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
