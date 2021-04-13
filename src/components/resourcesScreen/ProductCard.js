import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../contexts/AppContext';
import { H4Book, H5Black, H6Book, Flexbox } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import firebase from 'firebase/app';
import 'firebase/firestore';

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
  align-items: flex-end;
`;

const ProductCard = ({
  title,
  description,
  source,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  categoryID,
  productID,
  navigation,
  ...props
}) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  const [assetList, setAssetList] = useState([]);
  const db = firebase.firestore();

  const getAssetList = (categoryID, productID) =>
    db
      .collection('corporate resources us market english language')
      .doc('products')
      .collection('product categories')
      .doc(categoryID)
      .collection('list')
      .doc(productID)
      .collection('assets')
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        const assetList = [];
        querySnapshot.forEach((doc) => {
          const assetWithID = {
            id: doc.id,
            ...doc.data(),
          };
          assetList.push(assetWithID);
        });
        setAssetList(assetList);
      });

  useEffect(() => {
    getAssetList(categoryID, productID);
  }, []);

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
  // this renders the card that is collapsed - below this component is the expanded card
  if (!isExpanded) {
    return (
      <ProductCardContainer {...props}>
        <OuterContainer isExpanded={isExpanded}>
          <InnerContainer>
            <View style={{ width: 30 }} />
            <TitleAndDescription>
              <H5Black style={{ marginBottom: 4 }}>{title}</H5Black>
              <H6Book
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ flex: 1 }}>
                {description}
              </H6Book>
            </TitleAndDescription>
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
          </InnerContainer>
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
        </OuterContainer>
        {/* TODO conditionally render the options in the callout  */}
        {isCalloutOpen && (
          <ProductCallout>
            <GestureTouchable onPress={() => console.log('this is pressed')}>
              <Flexbox direction="row" justify="flex-start">
                <HeartOutlineIcon
                  style={{
                    marginEnd: 8,
                    height: 24,
                    width: 24,
                    color: theme.activeTint,
                  }}
                />
                <H4Book>{Localized('Favorite')}</H4Book>
              </Flexbox>
            </GestureTouchable>
            <GestureTouchable onPress={() => console.log('this is pressed')}>
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
            </GestureTouchable>
            <GestureTouchable>
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
            </GestureTouchable>
            <GestureTouchable>
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
            </GestureTouchable>
            <GestureTouchable>
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
            </GestureTouchable>
            <GestureTouchable>
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
            </GestureTouchable>
            <GestureTouchable>
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
            </GestureTouchable>
          </ProductCallout>
        )}
      </ProductCardContainer>
    );
  }
  // render the card that is expanded
  return (
    <ProductCardContainer {...props}>
      <OuterContainer isExpanded={isExpanded}>
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
        <ImageAndIconContainer isExpanded={isExpanded}>
          <Image
            style={{
              flex: 1,
              height: smallerImageHeight,
            }}
            source={{
              uri: source,
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
                  <TouchableOpacity key={asset.id}>
                    <ImageIcon
                      onPress={() =>
                        navigation.navigate('Resources Asset Screen', {
                          title: asset.title.toUpperCase(),
                          url: asset.url,
                          contentType: asset.contentType,
                        })
                      }
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
      </OuterContainer>
    </ProductCardContainer>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  source: PropTypes.string,
  navigation: PropTypes.object,
  /* callout from parent is so that tapping anywhere on the screen will close the callout */
  isCalloutOpenFromParent: PropTypes.bool,
  setIsCalloutOpenFromParent: PropTypes.func,
  /* the category id will be something like "hemp", or "energy" */
  categoryID: PropTypes.string,
  /* the list id will be something like "q fuse plus", or "q focus" */
  productID: PropTypes.string,
};

export default ProductCard;
