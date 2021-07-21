import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {
  ScreenContainer,
  TopButtonBar,
  TertiaryButton,
  Flexbox,
} from '../../common';
import ProductCard from './productCard/ProductCard';
import DownloadToast from '../DownloadToast';
import * as Analytics from 'expo-firebase-analytics';

// this will make the image a 2 x 1 ratio with taking padding into account
const { width } = Dimensions.get('window');
const imageHeight = width / 2 - 20;

const ProductCategoryScreen = ({ route, navigation }) => {
  const { categoryList } = route.params;
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
  const [disableTouchEvent, setDisableTouchEvent] = useState(false);
  // e.stopPropagation() does not work on android on an element that is absolute positioned so it has to be done manually
  const dismiss = () => {
    if (Platform.OS === 'android' && disableTouchEvent) {
      return;
    }
    setIsCalloutOpenFromParent(false);
  };

  useEffect(() => {
    navigate(categoryList?.[0]);
  }, []);

  const navigate = (item) => {
    setView(item);
    setSubcategoryList(item?.childFolders);

    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item?.folderName.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
      screen: 'Corporate Products',
      purpose: `See details for ${item?.folderName}`,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      <ScreenContainer style={{ paddingTop: 0, paddingBottom: 0 }}>
        <DownloadToast
          title={toastTitle}
          body={toastBody}
          visible={isToastVisible}
          progress={toastProgress}
        />
        <TopButtonBar>
          {categoryList.map((item) => (
            <TertiaryButton
              style={{ marginRight: 15 }}
              onPress={() => navigate(item)}
              selected={view?.folderName === item?.folderName}
              key={item?.folderId}>
              {item?.folderName.toUpperCase()}
            </TertiaryButton>
          ))}
        </TopButtonBar>
        <ScrollView
          onStartShouldSetResponder={() => true}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 120 }}>
          <TouchableWithoutFeedback onPress={dismiss}>
            <Flexbox
              justify="flex-start"
              height="100%"
              padding={10}
              onStartShouldSetResponder={() => true}>
              <View style={{ width: '100%', marginBottom: 20 }}>
                <Image
                  source={{ uri: view.pictureUrl }}
                  style={{ width: '100%', height: imageHeight }}
                />
              </View>
              {subcategoryList.map((item, index) => (
                <ProductCard
                  key={item?.folderId}
                  style={{ zIndex: -index }}
                  title={item?.folderName}
                  description={item?.folderDescription}
                  url={item?.pictureUrl}
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  setDisableTouchEvent={setDisableTouchEvent}
                  navigation={navigation}
                  setToastInfo={setToastInfo}
                  isFavorite={false}
                  assetList={item?.links}
                  onPress={() => {
                    setIsCalloutOpenFromParent(false);
                    navigation.navigate('Resources Asset Screen', {
                      title: item?.folderName.toUpperCase(),
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
