import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Share, Alert } from 'react-native';
import AppContext from '../../../contexts/AppContext';
import ExpandedProductCard from './ExpandedProductCard';
import CollapsedProductCard from './CollapsedProductCard';
import MultiAssetMenu from '../MultiAssetMenu';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getProductAssets } from '../../../utils/firebase/getCorporateProducts';
import { downloadFile } from '../../../utils/downloadFile';
import { Localized, initLanguage } from '../../../translations/Localized';

const ProductCardContainer = styled.View`
  width: 100%;
`;

const ProductCard = ({
  title,
  description,
  url,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  setDisableTouchEvent,
  categoryID,
  productID,
  navigation,
  setToastInfo,
  isFavorite,
  market,
  ...props
}) => {
  initLanguage();
  const { deviceLanguage } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  const [assetList, setAssetList] = useState([]);
  const [isMultiAssetMenuOpen, setIsMultiAssetMenuOpen] = useState(false);
  const [multiAssetMenuTitle, setMultiAssetMenuTitle] = useState('');

  const db = firebase.firestore();

  useEffect(() => {
    getProductAssets(
      db,
      market,
      deviceLanguage,
      setAssetList,
      categoryID,
      productID,
    );
  }, []);

  useEffect(() => {
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(false);
    }
    if (!isCalloutOpenFromParent && isMultiAssetMenuOpen) {
      setIsMultiAssetMenuOpen(false);
    }
    if (isExpanded) {
      setIsCalloutOpen(false);
    }
    return () => {
      setIsCalloutOpen(false);
    };
  }, [isCalloutOpenFromParent, isExpanded, isMultiAssetMenuOpen]);

  const onCallout = async (e) => {
    e.stopPropagation();
    if (isCalloutOpen) {
      await setDisableTouchEvent(false);
      setIsCalloutOpen(false);
      setIsCalloutOpenFromParent(false);
    } else if (!isCalloutOpen) {
      await setIsCalloutOpenFromParent(true);
      setIsCalloutOpen(true);
    }
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(true);
    }
  };

  const shareSingleUrl = async (url) => {
    try {
      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
    setIsCalloutOpen(false);
    setIsCalloutOpenFromParent(false);
    setIsMultiAssetMenuOpen(false);
  };
  // This function will automatically open the device share option if there is only one item, and open the popup to select an asset if there are multiple items
  const onShare = async () => {
    if (assetList.length === 1) {
      return shareSingleUrl(assetList[0].url);
    } else {
      await setIsCalloutOpenFromParent(true);
      await setDisableTouchEvent(true);
      setIsMultiAssetMenuOpen(true);
      setMultiAssetMenuTitle(Localized('Share'));
    }
  };

  const downloadSingleItem = async (item) => {
    const { url, title, contentType, ext } = item;
    const filename = `${title.split(' ').join('')}.${ext ?? ''}`;
    try {
      await downloadFile(url, filename, contentType, setToastInfo);
    } catch (error) {
      console.log(`error`, error);
    }
    setIsCalloutOpen(false);
    setIsCalloutOpenFromParent(false);
    setIsMultiAssetMenuOpen(false);
  };

  // This function will automatically download if there is only one item, and open the popup to select an asset if there are multiple items
  const onDownload = async () => {
    if (assetList.length === 1) {
      return downloadSingleItem(assetList[0]);
    } else {
      await setIsCalloutOpenFromParent(true);
      await setDisableTouchEvent(true);
      setIsMultiAssetMenuOpen(true);
      setMultiAssetMenuTitle(Localized('Download'));
    }
  };

  const onAction = async (item) => {
    if (multiAssetMenuTitle === Localized('Share')) {
      return shareSingleUrl(item.url);
    }
    if (multiAssetMenuTitle === Localized('Download')) {
      return downloadSingleItem(item);
    }
  };

  return (
    <ProductCardContainer {...props}>
      {isExpanded ? (
        <ExpandedProductCard
          title={title}
          url={url}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          description={description}
          navigation={navigation}
          isFavorite={isFavorite}
          assetList={assetList}
          onShare={onShare}
          onDownload={onDownload}
        />
      ) : (
        <CollapsedProductCard
          title={title}
          url={url}
          description={description}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isCalloutOpenFromParent={isCalloutOpenFromParent}
          isCalloutOpen={isCalloutOpen}
          setIsCalloutOpen={setIsCalloutOpen}
          onCallout={onCallout}
          onShare={onShare}
          onDownload={onDownload}
        />
      )}
      {isMultiAssetMenuOpen && (
        <MultiAssetMenu
          title={multiAssetMenuTitle}
          options={assetList}
          onPress={onAction}
          onClose={() => {
            setIsMultiAssetMenuOpen(false);
            setIsCalloutOpenFromParent(false);
          }}
        />
      )}
    </ProductCardContainer>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  navigation: PropTypes.object,
  setToastInfo: PropTypes.func,
  /* callout from parent is so that tapping anywhere on the screen will close the callout */
  isCalloutOpenFromParent: PropTypes.bool,
  setIsCalloutOpenFromParent: PropTypes.func,
  setDisableTouchEvent: PropTypes.func,
  /* the category id will be something like "hemp", or "energy" */
  categoryID: PropTypes.string,
  /* the list id will be something like "q fuse plus", or "q focus" */
  productID: PropTypes.string,
  index: PropTypes.number,
  market: PropTypes.string,
  isFavorite: PropTypes.bool,
};

export default ProductCard;
