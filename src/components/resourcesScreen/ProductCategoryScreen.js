import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScreenContainer, TopButtonBar, TertiaryButton } from '../common';
import ProductCard from './ProductCard';
import firebase from 'firebase/app';
import 'firebase/firestore';

// this will make the image a 2 x 1 ratio with taking padding into account
const { width } = Dimensions.get('window');
const imageHeight = width / 2 - 20;

const ProductCategoryScreen = ({ route, navigation }) => {
  const db = firebase.firestore();
  const { documentID } = route.params;
  const [categoryList, setCategoryList] = useState([]);
  //   console.log(`categoryList`, categoryList);
  const [view, setView] = useState({ title: '' });
  const [subcategoryList, setSubcategoryList] = useState([]);
  //   console.log(`subcategoryList`, subcategoryList);

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);

  const getSubcategory = (item) =>
    db
      .collection('corporate resources us market english language')
      .doc(documentID)
      .collection('product categories')
      .doc(item.id)
      .collection('list')
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        const productCategories = [];
        querySnapshot.forEach((doc) => {
          //   console.log(`doc.id`, doc.id);
          const resourceWithID = { id: doc.id, ...doc.data() };
          productCategories.push(resourceWithID);
        });
        setSubcategoryList(productCategories);
      });
  useEffect(() => {
    db.collection('corporate resources us market english language')
      .doc(documentID)
      .collection('product categories')
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        const productCategories = [];
        querySnapshot.forEach((doc) => {
          //   console.log(`doc.id`, doc.id);
          const resourceWithID = { id: doc.id, ...doc.data() };
          productCategories.push(resourceWithID);
        });
        // console.log(`productCategories`, productCategories);
        setCategoryList(productCategories);
        setView(productCategories[0]);
        getSubcategory(productCategories[0]);
      });
    return () => {
      setCategoryList([]);
    };
  }, []);

  const navigate = (item) => {
    setView(item);
    getSubcategory(item);
    // Analytics.logEvent(`${item.testID}_tapped`, {
    //   screen: 'ResourcesScreen',
    //   purpose: `See details for ${item.name}`,
    // });
  };
  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <ScreenContainer>
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
          style={{ zIndex: -1, width: '100%' }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 10,
            }}
            onStartShouldSetResponder={() => true}>
            <View style={{ width: '100%', marginBottom: 20 }}>
              <Image
                source={{ uri: view.url }}
                style={{ width: '100%', height: imageHeight }}
              />
            </View>
            {subcategoryList.map((item, index) => (
              <ProductCard
                isCalloutOpenFromParent={isCalloutOpenFromParent}
                setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                style={{ zIndex: -index }}
                key={item.title}
                source={item.url}
                title={item.title}
                description={item.description}
                onPress={() => {
                  setIsCalloutOpenFromParent(false);
                  navigation.navigate('Resources Asset Screen', {
                    title: item.title.toUpperCase(),
                    documentID: item.id,
                  });
                }}
              />
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ProductCategoryScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ProductCategoryScreen;
