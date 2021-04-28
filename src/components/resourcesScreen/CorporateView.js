import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import ResourceCard from './ResourceCard';
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase/app';
import 'firebase/firestore';

const CorporateView = ({ navigation, fadeOut }) => {
  const db = firebase.firestore();
  const [resourceList, setResourceList] = useState([]);
  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);

  const navigateToResource = (item) => {
    fadeOut();
    if (item.id === 'products') {
      navigation.navigate('Product Category Screen', {
        title: item.title.toUpperCase(),
      });
    } else {
      navigation.navigate('Resources Category Screen', {
        title: item.title.toUpperCase(),
        documentID: item.id,
      });
    }
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.title.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 24) + '_category_tapped';
    Analytics.logEvent(shortenedTitle, {
      screen: 'Corporate Resources',
      purpose: `See details for ${item.title}`,
    });
  };

  useEffect(() => {
    db.collection('corporate resources us market english language')
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        const corporateResources = [];
        querySnapshot.forEach((doc) => {
          const resourceWithID = { id: doc.id, ...doc.data() };
          corporateResources.push(resourceWithID);
        });
        setResourceList(corporateResources);
      });
    return () => {
      setResourceList([]);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 10,
        }}
        accessibilityLabel="Corporate Resources"
        onStartShouldSetResponder={() => true}>
        {resourceList.map((item, index) => (
          <ResourceCard
            isCalloutOpenFromParent={isCalloutOpenFromParent}
            setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
            style={{ zIndex: -index }}
            key={item.title}
            url={item.url}
            title={item.title}
            onPress={() => {
              setIsCalloutOpenFromParent(false);
              navigateToResource(item);
            }}
          />
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

CorporateView.propTypes = {
  navigation: PropTypes.object,
  fadeOut: PropTypes.func,
};

export default CorporateView;
