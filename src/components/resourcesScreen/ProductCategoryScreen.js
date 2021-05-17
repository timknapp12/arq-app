import React, { useState, useEffect, useContext } from 'react';
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
import DownloadToast from './DownloadToast';
import AppContext from '../../contexts/AppContext';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  getCorporateProductCategories,
  getCorporateProducts,
} from '../../utils/firebase/getCorporateProducts';

// this will make the image a 2 x 1 ratio with taking padding into account
const { width } = Dimensions.get('window');
const imageHeight = width / 2 - 20;

const ProductCategoryScreen = ({ route, navigation }) => {
  const { deviceLanguage } = useContext(AppContext);
  const { market } = route.params;
  const db = firebase.firestore();
  const [categoryList, setCategoryList] = useState([]);
  const [view, setView] = useState({ title: '' });
  const [subcategoryList, setSubcategoryList] = useState([]);

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

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);

  useEffect(() => {
    getCorporateProductCategories(
      db,
      market,
      deviceLanguage,
      setCategoryList,
      navigate,
    );
  }, []);

  const navigate = (item) => {
    setView(item);
    getCorporateProducts(
      db,
      market,
      deviceLanguage,
      setSubcategoryList,
      item.id,
    );
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.title.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
      screen: 'Corporate Products',
      purpose: `See details for ${item.title}`,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <ScreenContainer style={{ paddingTop: 0, paddingBottom: 0 }}>
        <DownloadToast
          title={toastTitle}
          body={toastBody}
          visible={isToastVisible}
          progress={toastProgress}
        />
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
                  setToastInfo={setToastInfo}
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
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ProductCategoryScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default ProductCategoryScreen;
