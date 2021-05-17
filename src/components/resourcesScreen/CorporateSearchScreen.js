import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, Flexbox, Input } from '../common';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import AppContext from '../../contexts/AppContext';
import AssetCard from './assetCard/AssetCard';
import ProductCard from './productCard/ProductCard';
import DownloadToast from './DownloadToast';
import { categories } from './mockTeamData';
import firebase from 'firebase/app';
import 'firebase/firestore';

const CorporateSearchScreen = ({ route, navigation }) => {
  const { deviceLanguage } = useContext(AppContext);
  const { market } = route.params;
  console.log(`deviceLanguage`, deviceLanguage);
  console.log(`market`, market);
  const [value, setValue] = useState('');

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  // this is to disable navigation to an asset on android devices when a touch event happens on a callout menu that is rendered over the top of an asset card
  const [isNavDisabled, setIsNavDisabled] = useState(false);

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [toastProgress, setToastProgress] = useState(0);

  const setToastInfo = (title, body, visible, progress) => {
    setToastTitle(title);
    setToastBody(body);
    setIsToastVisible(visible);
    setToastProgress(progress);
  };

  // TODO: remove all of this firebase stuff and mock data when wiring up to graphql
  const db = firebase.firestore();
  const [productList, setProductList] = useState([]);

  const products = [];
  const getProductMockData = () => {
    db.collection('corporate resources us market en language')
      .doc('products')
      .collection('product categories')
      .doc('hemp')
      .collection('list')
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const resourceWithID = {
            id: doc.id,
            ...data,
          };
          products.push(resourceWithID);
        });
        setProductList(products);
      });
  };

  useEffect(() => {
    getProductMockData();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => setIsCalloutOpenFromParent(false)}
      style={{ flex: 1 }}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          paddingTop: 0,
          paddingBottom: 0,
          height: '100%',
        }}>
        <DownloadToast
          title={toastTitle}
          body={toastBody}
          visible={isToastVisible}
          progress={toastProgress}
        />
        <Flexbox padding={4} width="85%">
          <Input
            autoFocus
            testID="corporate-search-input"
            value={value}
            onChangeText={(text) => setValue(text)}
            returnKeyType="done"
          />
        </Flexbox>
        <ScrollView
          style={{ flex: 1, width: '100%', height: '100%' }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120,
            marginTop: 8,
          }}>
          <TouchableWithoutFeedback
            onPress={() => setIsCalloutOpenFromParent(false)}>
            <Flexbox
              justify="flex-start"
              padding={10}
              onStartShouldSetResponder={() => true}
              height="100%">
              {categories[0].assetList.map((item, index) => (
                <AssetCard
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  style={{ zIndex: -index }}
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  description={item.description}
                  contentType={item.contentType}
                  ext={item.ext}
                  navigation={navigation}
                  setToastInfo={setToastInfo}
                  setIsNavDisabled={setIsNavDisabled}
                  isNavDisabled={isNavDisabled}
                  hasPermissions
                  // TODO: get real data from asset and compare agaisnt associate id to determoine permissions
                  // hasPermissions={hasPermissions}
                />
              ))}
              {productList.map((item, index) => (
                <ProductCard
                  key={item.id}
                  style={{ zIndex: -index }}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  categoryID="hemp"
                  productID={item.id}
                  navigation={navigation}
                  isFavorite={false}
                  market={market}
                  onPress={() => {
                    setIsCalloutOpenFromParent(false);
                    navigation.navigate('Resources Asset Screen', {
                      title: item.title.toUpperCase(),
                      documentID: item.id,
                    });
                  }}
                />
              ))}
              {categories[0].assetList.map((item, index) => (
                <AssetCard
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  style={{ zIndex: -index }}
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  description={item.description}
                  contentType={item.contentType}
                  ext={item.ext}
                  navigation={navigation}
                  setToastInfo={setToastInfo}
                  setIsNavDisabled={setIsNavDisabled}
                  isNavDisabled={isNavDisabled}
                  hasPermissions
                  // TODO: get real data from asset and compare agaisnt associate id to determoine permissions
                  // hasPermissions={hasPermissions}
                />
              ))}
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

CorporateSearchScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default CorporateSearchScreen;
