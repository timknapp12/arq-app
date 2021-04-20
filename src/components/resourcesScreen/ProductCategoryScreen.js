import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  ScreenContainer,
  TopButtonBar,
  TertiaryButton,
  Flexbox,
} from '../common';
import ProductCard from './productCard/ProductCard';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase/app';
import 'firebase/firestore';

// this will make the image a 2 x 1 ratio with taking padding into account
const { width } = Dimensions.get('window');
const imageHeight = width / 2 - 20;

const ProductCategoryScreen = ({ navigation }) => {
  const db = firebase.firestore();
  const [categoryList, setCategoryList] = useState([]);
  const [view, setView] = useState({ title: '' });
  const [subcategoryList, setSubcategoryList] = useState([]);

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const categoryRef = db
    .collection('corporate resources us market english language')
    .doc('products')
    .collection('product categories');

  const getSubcategory = (item) => {
    const listRef = categoryRef.doc(item.id).collection('list');
    listRef
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        const subcategories = [];
        querySnapshot.forEach((doc) => {
          const resourceWithID = {
            id: doc.id,
            ...doc.data(),
          };
          subcategories.push(resourceWithID);
        });
        setSubcategoryList(subcategories);
      });
  };

  useEffect(() => {
    categoryRef
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        const productCategories = [];
        querySnapshot.forEach((doc) => {
          const resourceWithID = { id: doc.id, ...doc.data() };
          productCategories.push(resourceWithID);
        });
        setCategoryList(productCategories);
        navigate(productCategories[0]);
      });
    return () => {
      setCategoryList([]);
    };
  }, []);

  const navigate = (item) => {
    setView(item);
    getSubcategory(item);
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.title.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 24) + '_category_tapped';
    Analytics.logEvent(shortenedTitle, {
      screen: 'Corporate Products',
      purpose: `See details for ${item.title}`,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <ScreenContainer style={{ paddingTop: 0, paddingBottom: 0 }}>
        <TopButtonBar>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categoryList.map((item) => (
              <TertiaryButton
                style={{ marginRight: 15 }}
                onPress={() => navigate(item)}
                selected={view.title === item.title}
                key={item.title}>
                {item.title.toUpperCase()}
              </TertiaryButton>
            ))}
          </ScrollView>
        </TopButtonBar>
        <ScrollView
          onStartShouldSetResponder={() => true}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 120 }}>
          <TouchableWithoutFeedback
            onPress={() => setIsCalloutOpenFromParent(false)}>
            <Flexbox
              justify="flex-start"
              height="100%"
              padding={10}
              onStartShouldSetResponder={() => true}>
              <View style={{ width: '100%', marginBottom: 20 }}>
                <Image
                  source={{ uri: view.url }}
                  style={{ width: '100%', height: imageHeight }}
                />
              </View>
              {subcategoryList.map((item, index) => (
                <ProductCard
                  key={item.id}
                  style={{ zIndex: -index }}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  categoryID={view.id}
                  productID={item.id}
                  navigation={navigation}
                  isFavorite={false}
                  isDownloaded={false}
                  onPress={() => {
                    setIsCalloutOpenFromParent(false);
                    navigation.navigate('Resources Asset Screen', {
                      title: item.title.toUpperCase(),
                      documentID: item.id,
                    });
                  }}
                />
              ))}
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ProductCategoryScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProductCategoryScreen;
