import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { ScreenContainer, ResourcesCard } from '../common';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ResourcesCategoryScreen = ({ route, navigation }) => {
  const db = firebase.firestore();
  const { documentID } = route.params;
  const [categoryList, setCategoryList] = useState([]);
  console.log(`categoryList`, categoryList);

  useEffect(() => {
    db.collection('corporate resources us market english language')
      .doc(documentID)
      .collection('list')
      .orderBy('order', 'asc')
      .get()
      .then((querySnapshot) => {
        const corporateResources = [];
        querySnapshot.forEach((doc) => {
          console.log(`doc.id`, doc.id);
          const resourceWithID = { id: doc.id, ...doc.data() };
          corporateResources.push(resourceWithID);
        });
        setCategoryList(corporateResources);
      });
    return () => {
      setCategoryList([]);
    };
  }, []);

  return (
    <ScreenContainer>
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
          {categoryList.map((item) => (
            <ResourcesCard
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

ResourcesCategoryScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ResourcesCategoryScreen;
