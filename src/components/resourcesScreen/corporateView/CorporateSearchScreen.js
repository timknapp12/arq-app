import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { ScreenContainer, Flexbox, Input } from '../../common';
import {
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  View,
} from 'react-native';
import AppContext from '../../../contexts/AppContext';
import AssetCard from '../assetCard/AssetCard';
import ProductCard from './productCard/ProductCard';
import DownloadToast from '../DownloadToast';
import { SEARCH_RESOURCES } from '../../../graphql/queries';

const CorporateSearchScreen = ({ route, navigation }) => {
  const { deviceLanguage, theme } = useContext(AppContext);
  const { marketId } = route.params;
  console.log(`deviceLanguage`, deviceLanguage);
  console.log(`marketId`, marketId);
  const [value, setValue] = useState('');

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  // this is to disable navigation to an asset on android devices when a touch event happens on a callout menu that is rendered over the top of an asset card
  const [disableTouchEvent, setDisableTouchEvent] = useState(false);
  // e.stopPropagation() does not work on android on an element that is absolute positioned so it has to be done manually
  const dismiss = () => {
    if (Platform.OS === 'android' && disableTouchEvent) {
      return;
    }
    setIsCalloutOpenFromParent(false);
  };
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

  const [searchResources, { loading, data }] = useLazyQuery(SEARCH_RESOURCES);

  const debounceSearch = useCallback(
    debounce(
      (value) =>
        value.length > 0 &&
        searchResources({
          variables: { countries: marketId, searchList: value },
        }),
      1000,
    ),
    [],
  );

  const handleChange = (value) => {
    setValue(value);
    debounceSearch(value);
  };

  return (
    <TouchableWithoutFeedback onPress={dismiss} style={{ flex: 1 }}>
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
          {loading ? (
            <ActivityIndicator
              style={{ marginTop: 30 }}
              size="large"
              color={theme.disabledBackgroundColor}
            />
          ) : (
            <TouchableWithoutFeedback onPress={dismiss}>
              <Flexbox
                justify="flex-start"
                padding={10}
                onStartShouldSetResponder={() => true}
                height="100%">
                <View style={{ zIndex: 1 }}>
                  {data?.searchResources?.productFolders?.map(
                    (item, index) =>
                      // ensure the product has links so an empty folder is not displayed, or a category folder like "Hemp" or "Energy"
                      item.links.length > 0 && (
                        <ProductCard
                          key={item.folderId}
                          style={{ zIndex: -index }}
                          title={item.folderName}
                          description={item.folderDescription}
                          url={item.pictureUrl}
                          isCalloutOpenFromParent={isCalloutOpenFromParent}
                          setIsCalloutOpenFromParent={
                            setIsCalloutOpenFromParent
                          }
                          setDisableTouchEvent={setDisableTouchEvent}
                          navigation={navigation}
                          setToastInfo={setToastInfo}
                          isFavorite={false}
                          assetList={item.links}
                          onPress={() => {
                            setIsCalloutOpenFromParent(false);
                            navigation.navigate('Resources Asset Screen', {
                              title: item.title.toUpperCase(),
                            });
                          }}
                        />
                      ),
                  )}
                </View>
                <View style={{ zIndex: -1 }}>
                  {data?.searchResources?.links?.map((item, index) => (
                    <AssetCard
                      isCalloutOpenFromParent={isCalloutOpenFromParent}
                      setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                      style={{ zIndex: -index }}
                      key={item.linkId}
                      linkId={item.linkId}
                      url={item.linkUrl}
                      title={item.linkTitle}
                      description={item.linkDescription}
                      contentType={item.contentType}
                      ext={item.extension}
                      navigation={navigation}
                      setToastInfo={setToastInfo}
                      setIsNavDisabled={setIsNavDisabled}
                      isNavDisabled={isNavDisabled}
                      hasPermissions
                      // TODO: get real data from asset and compare agaisnt associate id to determoine permissions
                      // hasPermissions={hasPermissions}
                    />
                  ))}
                </View>
              </Flexbox>
            </TouchableWithoutFeedback>
          )}
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
