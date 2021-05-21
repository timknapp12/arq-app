import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Platform, TouchableOpacity, Alert } from 'react-native';
import { Flexbox, H5, MainScrollView } from '../../common';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import FilterIcon from '../../../../assets/icons/filter-icon.svg';
import ResourceCard from '../ResourceCard';
import * as Analytics from 'expo-firebase-analytics';
// TODO: remove mock data when we get real data
import { categories, teamCodes } from './mockTeamData';
import AddFolderModal from './AddFolderModal';
import AppContext from '../../../contexts/AppContext';
import TeamMenu from './TeamMenu';
import AccessCodeModal from './AccessCodeModal';
import { Localized } from '../../../translations/Localized';

const TeamView = ({
  fadeOut,
  navigation,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isAddFolderModalOpen,
  setIsAddFolderModalOpen,
  openTeamMenu,
  closeTeamMenu,
  isTeamMenuOpen,
  teamFadeAnim,
  // TODO: integrate hasPermissions prop with backend
  hasPermissions,
}) => {
  const { theme } = useContext(AppContext);
  const [isNavDisabled, setIsNavDisabled] = useState(false);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const initialCode = teamCodes[0].name;
  const [selectedAccessCode, setSelectedAccessCode] = useState(initialCode);
  const [accessCode, setAccessCode] = useState('');
  const [isNewAccessCode, setIsNewAccessCode] = useState(false);

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

  const toggleTeamMenu = () => {
    if (isTeamMenuOpen) {
      closeTeamMenu();
      setIsNavDisabled(false);
    } else {
      setIsNavDisabled(true);
      openTeamMenu();
    }
  };
  // this helps allow proper navigation of folders on android
  useEffect(() => {
    if (!isTeamMenuOpen) {
      setIsNavDisabled(false);
    }
  }, [isTeamMenuOpen]);

  useEffect(() => {
    if (teamCodes.length < 1) {
      setIsAccessCodeModalOpen(true);
    }
    if (hasPermissions) {
      setIsNewAccessCode(true);
    }
  }, [teamCodes]);

  const saveAccessCode = () => {
    if (!accessCode) {
      return Alert.alert(Localized('Please enter a team access code'));
    }
    // TODO: fire mutation to find access code in database
    setSelectedAccessCode(accessCode);
    return setIsAccessCodeModalOpen(false);
  };

  return (
    <>
      <FilterSearchBar
        onPress={() => {
          // TODO pass in a real access code
          fadeOut();
          navigation.navigate('Team Search Screen', {
            accessCode: '3',
            title: selectedAccessCode.toUpperCase(),
          });
        }}>
        <TouchableOpacity onPress={toggleTeamMenu}>
          <Flexbox direction="row" width="auto">
            <FilterIcon
              style={{
                height: 30,
                width: 30,
                color: theme.primaryTextColor,
                marginTop: -2,
                marginEnd: 6,
              }}
            />
            <H5>{selectedAccessCode}</H5>
          </Flexbox>
        </TouchableOpacity>
      </FilterSearchBar>
      <Flexbox align="flex-start">
        <TeamMenu
          items={teamCodes}
          style={{ left: teamFadeAnim }}
          onClose={closeTeamMenu}
          onSelect={(name) => setSelectedAccessCode(name)}
          setIsAccessCodeModalOpen={setIsAccessCodeModalOpen}
          setIsNewAccessCode={setIsNewAccessCode}
          // TODO: wire up permissions from backend - see if user qualifies to add access codes
          hasPermissions={true}
        />
      </Flexbox>
      <MainScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 10,
          }}
          accessibilityLabel="Team Resources"
          onStartShouldSetResponder={() => true}>
          {categories.length < 1 ? (
            <Flexbox>
              <H5>
                {Localized('There are no resources found for this access code')}
              </H5>
            </Flexbox>
          ) : null}
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
      </MainScrollView>
      <AddFolderModal
        visible={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
      />
      <AccessCodeModal
        visible={isAccessCodeModalOpen}
        onClose={() => setIsAccessCodeModalOpen(false)}
        onSave={saveAccessCode}
        testID="access-code-input"
        value={accessCode}
        onChangeText={(text) => setAccessCode(text)}
        isNew={isNewAccessCode}
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
  openTeamMenu: PropTypes.func,
  closeTeamMenu: PropTypes.func,
  isTeamMenuOpen: PropTypes.bool,
  teamFadeAnim: PropTypes.object,
  hasPermissions: PropTypes.bool,
};

export default TeamView;
