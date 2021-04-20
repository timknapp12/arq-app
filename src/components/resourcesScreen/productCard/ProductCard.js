import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Share, Alert } from 'react-native';
import ExpandedProductCard from './ExpandedProductCard';
import CollapsedProductCard from './CollapsedProductCard';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ProductCardContainer = styled.View`
  width: 100%;
`;

const ProductCard = ({
  title,
  description,
  url,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  categoryID,
  productID,
  navigation,
  isFavorite,
  isDownloaded,
  ...props
}) => {
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
    if (isExpanded) {
      setIsCalloutOpen(false);
    }
    return () => {
      setIsCalloutOpen(false);
    };
  }, [isCalloutOpenFromParent, isExpanded]);

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

  const onShare = async () => {
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
          isDownloaded={isDownloaded}
          isFavorite={isFavorite}
          assetList={assetList}
          onShare={onShare}
        />
      ) : (
        <CollapsedProductCard
          title={title}
          description={description}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isCalloutOpenFromParent={isCalloutOpenFromParent}
          isCalloutOpen={isCalloutOpen}
          setIsCalloutOpen={setIsCalloutOpen}
          onCallout={onCallout}
          onShare={onShare}
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
  /* callout from parent is so that tapping anywhere on the screen will close the callout */
  isCalloutOpenFromParent: PropTypes.bool,
  setIsCalloutOpenFromParent: PropTypes.func,
  /* the category id will be something like "hemp", or "energy" */
  categoryID: PropTypes.string,
  /* the list id will be something like "q fuse plus", or "q focus" */
  productID: PropTypes.string,
  index: PropTypes.number,
  isFavorite: PropTypes.bool,
  isDownloaded: PropTypes.bool,
};

export default ProductCard;
