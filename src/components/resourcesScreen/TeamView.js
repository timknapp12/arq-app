import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { Flexbox, H5 } from '../common';
import FilterSearchBar from './FilterSearchBar';
import FilterIcon from '../../../assets/icons/filter-icon.svg';
import ResourceCard from './ResourceCard';
import * as Analytics from 'expo-firebase-analytics';
import { categories } from './mockTeamData';
import AddFolderModal from './AddFolderModal';
import AppContext from '../../contexts/AppContext';

const TeamView = ({
  fadeOut,
  navigation,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isAddFolderModalOpen,
  setIsAddFolderModalOpen,
}) => {
  const { theme } = useContext(AppContext);
  const [isNavDisabled, setIsNavDisabled] = useState(false);

  const navigateToResource = (item) => {
    fadeOut();
    // when a callout menu item on android is tapped, the touch event bleeds through to the item underneath, causing unwanted events to fire. So this prevents that
    if (Platform.OS === 'android' && isNavDisabled) {
      setIsNavDisabled(false);
      return;
    }
    navigation.navigate('Resources Category Screen', {
      title: item.title.toUpperCase(),
      teamAssetList: item.assetList,
      // TODO: integrate permissions with backend
      hasPermissions: true,
    });
    setIsCalloutOpenFromParent(false);
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.title.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
      screen: 'Team Resources',
      purpose: `See details for ${item.title}`,
    });
  };

  return (
    <>
      <FilterSearchBar
        onPress={() => navigation.navigate('Team Search Screen')}>
        <Flexbox direction="row" width="auto">
          <FilterIcon
            style={{
              height: 30,
              width: 30,
              color: theme.primaryTextColor,
              marginTop: -2,
            }}
          />
          <H5>Team Awesome!</H5>
        </Flexbox>
      </FilterSearchBar>
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
            // TODO: integrate hasPermissions prop with backend
            hasPermissions={true}
            setIsNavDisabled={setIsNavDisabled}
            onPress={() => {
              navigateToResource(item);
            }}
          />
        ))}
      </View>
      <AddFolderModal
        visible={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
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
