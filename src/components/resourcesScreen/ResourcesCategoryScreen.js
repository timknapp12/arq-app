import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ScreenContainer, Flexbox } from '../common';
import AssetCard from './AssetCard';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ResourcesCategoryScreen = ({ route, navigation }) => {
  const db = firebase.firestore();
  const { documentID, assetList } = route.params;
  const [categoryList, setCategoryList] = useState(assetList || []);
  // this will get data from firebase for corporate assets, but data for team assets will just be passed as a prop called assetList
  useEffect(() => {
    if (documentID) {
      db.collection('corporate resources us market english language')
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
                  navigation={navigation}
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

ResourcesCategoryScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  assetList: PropTypes.array,
};

export default ResourcesCategoryScreen;
