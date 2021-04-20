import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import ResourceCard from './ResourceCard';
import * as Analytics from 'expo-firebase-analytics';
import { categories } from './mockTeamData';

const TeamView = ({ navigation }) => {
  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);

  const navigateToResource = (item) => {
    navigation.navigate('Resources Category Screen', {
      title: item.title.toUpperCase(),
      assetList: item.assetList,
    });

    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = `${item.title
      .split(' ')
      .join('_')
      .splice(0, 24)}_category_tapped`;
    Analytics.logEvent(formattedTitle, {
      screen: 'Team Resources',
      purpose: `See details for ${item.title}`,
    });
  };

  return (
    <ScrollView
      onStartShouldSetResponder={() => true}
      style={{ zIndex: -1, width: '100%' }}
      contentContainerStyle={{
        paddingBottom: 200,
      }}>
      <TouchableWithoutFeedback
        onPress={() => setIsCalloutOpenFromParent(false)}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 10,
          }}
          onStartShouldSetResponder={() => true}>
          {categories.map((item, index) => (
            <ResourceCard
              isCalloutOpenFromParent={isCalloutOpenFromParent}
              setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
              style={{ zIndex: -index }}
              key={item.title}
              url={item.url}
              title={item.title}
              isWideLayout={item.isWideLayout}
              hasPermissions={true}
              onPress={() => {
                setIsCalloutOpenFromParent(false);
                navigateToResource(item);
              }}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

TeamView.propTypes = {
  navigation: PropTypes.object,
};

export default TeamView;
