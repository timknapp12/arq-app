import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, Flexbox, Input } from '../../common';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import AppContext from '../../../contexts/AppContext';
import AssetCard from '../assetCard/AssetCard';
import ProductCard from './productCard/ProductCard';
import DownloadToast from '../DownloadToast';
import debounce from 'lodash.debounce';

const CorporateSearchScreen = ({ route, navigation }) => {
  const { deviceLanguage } = useContext(AppContext);
  const { marketId } = route.params;
  console.log(`deviceLanguage`, deviceLanguage);
  console.log(`marketId`, marketId);
  const [value, setValue] = useState('Search feature is not quite ready yet');
  const [productList, setProductList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  console.log(`setProductList`, setProductList);
  console.log(`setSearchResults`, setSearchResults);
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

  const searchResources = () => {};
  const debounceSearch = useCallback(
    debounce((value) => searchResources(value), 1000),
    [],
  );

  const handleChange = (value) => {
    setValue(value);
    debounceSearch(value);
  };

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
            onChangeText={handleChange}
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
              {productList.map((item, index) => (
                <ProductCard
                  key={item.id}
                  style={{ zIndex: -index }}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  navigation={navigation}
                  isFavorite={false}
                  onPress={() => {
                    setIsCalloutOpenFromParent(false);
                    navigation.navigate('Resources Asset Screen', {
                      title: item.title.toUpperCase(),
                      documentID: item.id,
                    });
                  }}
                />
              ))}
              {searchResults.map((item, index) => (
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
