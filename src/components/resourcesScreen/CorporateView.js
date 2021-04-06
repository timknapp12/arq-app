import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { ResourcesCard } from '../common';

const CorporateView = ({ navigation }) => {
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
        <ResourcesCard
          onPress={() =>
            navigation.navigate('Resources Category Screen', {
              title: 'Compensation'.toUpperCase(),
            })
          }
          title="Compensation"
          source="https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/resources%2Fcompensation_355x176.jpg?alt=media&token=e905eef7-7b20-4e0e-8083-e0c029f526cf"></ResourcesCard>
        <ResourcesCard />
        <ResourcesCard isLayoutWide />
        <ResourcesCard />
        <ResourcesCard />
        <ResourcesCard isLayoutWide />
        <ResourcesCard />
        <ResourcesCard />
      </View>
    </ScrollView>
  );
};

CorporateView.propTypes = {
  navigation: PropTypes.object,
};

export default CorporateView;
