import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ScreenContainer, Flexbox } from '../common';
import AssetCard from './assetCard/AssetCard';
import DownloadToast from './DownloadToast';
import AppContext from '../../contexts/AppContext';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ResourcesCategoryScreen = ({ route, navigation }) => {
  const { deviceLanguage } = useContext(AppContext);
  const db = firebase.firestore();
  const { documentID, assetList, hasPermissions, market } = route.params;
  const [categoryList, setCategoryList] = useState(assetList || []);
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

  // this will get data from firebase for corporate assets, but data for team assets will just be passed as a prop called assetList
  useEffect(() => {
    if (documentID) {
      db.collection(
        `corporate resources ${market} market ${deviceLanguage} language`,
      )
        .doc(documentID)
        .collection('assets')
        .orderBy('order', 'asc')
        .get()
        .then((querySnapshot) => {
          const corporateResources = [];
          querySnapshot.forEach((doc) => {
            const resourceWithID = { id: doc.id, ...doc.data() };
            corporateResources.push(resourceWithID);
          });
          setCategoryList(corporateResources);
        });
    }
    return () => {
      setCategoryList([]);
    };
  }, []);

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  // this is to disable navigation to an asset on android devices when a touch event happens on a callout menu that is rendered over the top of an asset card
  const [isNavDisabled, setIsNavDisabled] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <ScreenContainer style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ScrollView
          onStartShouldSetResponder={() => true}
          style={{ zIndex: -1, width: '100%' }}
          contentContainerStyle={{
            paddingBottom: 120,
          }}>
          <TouchableWithoutFeedback
            onPress={() => setIsCalloutOpenFromParent(false)}>
            <Flexbox
              justify="flex-start"
              height="100%"
              padding={10}
              onStartShouldSetResponder={() => true}>
              <DownloadToast
                title={toastTitle}
                body={toastBody}
                visible={isToastVisible}
                progress={toastProgress}
              />

              {categoryList.map((item, index) => (
                <AssetCard
                  isCalloutOpenFromParent={isCalloutOpenFromParent}
                  setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                  style={{ zIndex: -index }}
                  key={item.title}
                  url={item.url}
                  title={item.title}
                  description={item.description}
                  contentType={item.contentType}
                  ext={item.ext}
                  navigation={navigation}
                  setToastInfo={setToastInfo}
                  setIsNavDisabled={setIsNavDisabled}
                  isNavDisabled={isNavDisabled}
                  hasPermissions={hasPermissions}
                />
              ))}
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ResourcesCategoryScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  assetList: PropTypes.array,
};

export default ResourcesCategoryScreen;
