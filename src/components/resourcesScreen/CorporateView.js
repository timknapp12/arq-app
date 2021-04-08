import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { ResourcesCard } from '../common';
import firebase from 'firebase/app';
import 'firebase/firestore';

const CorporateView = ({ navigation }) => {
  const db = firebase.firestore();
  const [resourceList, setResourceList] = useState([]);

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
        {resourceList.map((item) => (
          <ResourcesCard
            key={item.title}
            source={item.url}
            title={item.title}
            onPress={() =>
              item.id === 'products'
                ? navigation.navigate('Product Category Screen', {
                    title: item.title.toUpperCase(),
                    documentID: item.id,
                  })
                : navigation.navigate('Resources Category Screen', {
                    title: item.title.toUpperCase(),
                    documentID: item.id,
                  })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

CorporateView.propTypes = {
  navigation: PropTypes.object,
};

export default CorporateView;
