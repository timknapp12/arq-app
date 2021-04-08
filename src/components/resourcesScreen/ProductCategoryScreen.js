import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Image } from 'react-native';
import {
  ScreenContainer,
  AssetCard,
  TopButtonBar,
  TertiaryButton,
} from '../common';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ProductCategoryScreen = ({ route, navigation }) => {
  const db = firebase.firestore();
  const { documentID } = route.params;
  const [categoryList, setCategoryList] = useState([]);
  console.log(`categoryList`, categoryList);
  const [view, setView] = useState({ title: '' });
  const [subcategoryList, setSubcategoryList] = useState([]);
  console.log(`subcategoryList`, subcategoryList);

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
          console.log(`doc.id`, doc.id);
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
          console.log(`doc.id`, doc.id);
          const resourceWithID = { id: doc.id, ...doc.data() };
          productCategories.push(resourceWithID);
        });
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
  //   console.log(`view`, view);
  return (
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
              style={{ width: '100%', height: 176 }}
            />
          </View>
          {subcategoryList.map((item) => (
            <AssetCard
              key={item.title}
              source={item.url}
              title={item.title}
              onPress={() =>
                navigation.navigate('Resources Asset Screen', {
                  title: item.title.toUpperCase(),
                  documentID: item.id,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

ProductCategoryScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ProductCategoryScreen;
