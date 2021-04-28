import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ResourceCard from './ResourceCard';
import * as Analytics from 'expo-firebase-analytics';
import { categories } from './mockTeamData';
import AddFolderModal from './AddFolderModal';

const TeamView = ({
  fadeOut,
  navigation,
  isAddFolderModalOpen,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  setIsAddFolderModalOpen,
}) => {
  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  // const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const navigateToResource = (item) => {
    fadeOut();
    navigation.navigate('Resources Category Screen', {
      title: item.title.toUpperCase(),
      assetList: item.assetList,
    });
    setIsCalloutOpenFromParent(false);
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.title.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 24) + '_category_tapped';
    Analytics.logEvent(shortenedTitle, {
      screen: 'Team Resources',
      purpose: `See details for ${item.title}`,
    });
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 10,
        }}
        accessibilityLabel="Team Resources"
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
      <AddFolderModal
        isAddFolderModalOpen={isAddFolderModalOpen}
        setIsAddFolderModalOpen={setIsAddFolderModalOpen}
      />
    </>
  );
};

TeamView.propTypes = {
  fadeOut: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  setIsCalloutOpenFromParent: PropTypes.func.isRequired,
  isAddFolderModalOpen: PropTypes.bool.isRequired,
  setIsAddFolderModalOpen: PropTypes.func.isRequired,
};

export default TeamView;
