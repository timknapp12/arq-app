import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { View, Platform, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Flexbox, H5, MainScrollView } from '../../common';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import SwitchTeamIcon from '../../../../assets/icons/switch-team-icon.svg';
import ResourceCard from '../ResourceCard';
import * as Analytics from 'expo-firebase-analytics';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import AddFolderModal from './AddFolderModal';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import TabButtonContext from '../../../contexts/TabButtonContext';
import TeamMenu from './TeamMenu';
import AccessCodeModal from './AccessCodeModal';
import { Localized } from '../../../translations/Localized';
import {
  GET_USERS_ACCESS_CODES,
  GET_TEAM_RESOURCES,
} from '../../../graphql/queries';
import { ADD_TEAM_ACCESS_CODE } from '../../../graphql/mutations';
import {
  findTeamOwnerId,
  findTeamAccessCode,
} from '../../../utils/teamResources/findTeamResourceData';

const TeamView = ({
  closeMenus,
  navigation,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isAddFolderModalOpen,
  setIsAddFolderModalOpen,
  openTeamMenu,
  closeTeamMenu,
  isTeamMenuOpen,
  teamFadeAnim,
  isMenuOpen,
  isOwner,
  setIsOwner,
}) => {
  const { theme, associateId, hasPermissionsToWrite } = useContext(AppContext);
  const { alreadyHasTeam, showAddOptions } = useContext(LoginContext);
  const { setSelectedFolderName } = useContext(TabButtonContext);

  // get all of the access codes that the user has subscribed to
  const { loading: loadingAccessCodes, data: userAccessCodesData } = useQuery(
    GET_USERS_ACCESS_CODES,
    {
      variables: { associateId },
      onError: (err) => console.log(`err in get user's access codes`, err),
    },
  );

  const [isNavDisabled, setIsNavDisabled] = useState(false);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);

  const [selectedTeamName, setSelectedTeamName] = useState('');
  const [selectedTeamAccessCode, setSelectedTeamAccessCode] = useState('');
  // this is a flag so selected team name does not always reset with new data from the refetch query of access codes
  const [initialLoad, setInitialLoad] = useState(true);

  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isNewAccessCode, setIsNewAccessCode] = useState(false);
  const [isError, setIsError] = useState(false);

  // store data for last viewed team name
  const storeTeamName = async (value) => {
    try {
      await AsyncStorage.setItem('@lastViewedTeamName', value);
      setSelectedTeamName(value);
    } catch (e) {
      // saving error
    }
  };

  const getStoredTeamName = async (accesses) => {
    try {
      const value = await AsyncStorage.getItem('@lastViewedTeamName');
      if (value !== null) {
        return setSelectedTeamName(value);
      } else {
        return setSelectedTeamName(accesses?.[0]?.teamName ?? '');
      }
    } catch (e) {
      console.log(`e`, e);
      return setSelectedTeamName('');
    }
  };

  const navigateToResource = (item) => {
    closeMenus();
    // when a callout menu item on android is tapped, the touch event bleeds through to the item underneath, causing unwanted events to fire. So this prevents that
    if (Platform.OS === 'android' && isNavDisabled) {
      setIsNavDisabled(false);
      return;
    }
    // this prevents a team resource folder opening when it is underneath a the main menu
    // or if the navbar button is expanded and one of those add option buttons is tapped
    if (
      (isMenuOpen && Platform.OS === 'android') ||
      (showAddOptions && Platform.OS === 'android')
    ) {
      return closeMenus();
    }
    setSelectedFolderName(item?.folderName);
    navigation.navigate('Team Resources Category Screen', {
      title: item?.folderName.toUpperCase(),
      // TODO - check to see if we no longer need this param since we can find folder id in the tabButtonDataContainer
      folderId: item?.folderId,
      isOwner: isOwner,
      selectedTeamName: selectedTeamName,
    });
    setIsCalloutOpenFromParent(false);
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item?.folderName.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
      screen: 'Team Resources',
      purpose: `See details for ${item?.title}`,
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
    if (userAccessCodesData?.length < 1) {
      setIsAccessCodeModalOpen(true);
    }
    if (
      userAccessCodesData?.length < 1 &&
      userAccessCodesData.associateId === associateId
    ) {
      setIsNewAccessCode(true);
    }
  }, [userAccessCodesData]);

  const [addTeamAccessCode] = useMutation(ADD_TEAM_ACCESS_CODE, {
    variables: {
      associateId,
      teamName,
      accessCode,
      teamAccessId: 0,
    },
    refetchQueries: [
      { query: GET_USERS_ACCESS_CODES, variables: { associateId } },
    ],
    onCompleted: async () => {
      await storeTeamName(teamName);
      setTeamName('');
      setAccessCode('');
      return setIsAccessCodeModalOpen(false);
    },
    onError: () => setIsError(true),
  });

  useEffect(() => {
    if (userAccessCodesData?.accesses && initialLoad) {
      getStoredTeamName(userAccessCodesData?.accesses);
      setInitialLoad(false);
    }
  }, [userAccessCodesData, initialLoad]);

  const [
    getTeamResources,
    { loading: loadingResources, data: teamResourceData },
  ] = useLazyQuery(GET_TEAM_RESOURCES, {
    variables: { teams: [selectedTeamName] },
    onError: (error) => console.log(`error in get team resources`, error),
  });

  // each time a new team is selected, get resources for that team
  useEffect(() => {
    getTeamResources();
    const teamOwnerAssociateId = findTeamOwnerId(
      selectedTeamName,
      userAccessCodesData?.accesses ?? [],
    );
    const newTeamAccessCode = findTeamAccessCode(
      selectedTeamName,
      userAccessCodesData?.accesses ?? [],
    );
    setSelectedTeamAccessCode(newTeamAccessCode);
    if (teamOwnerAssociateId === associateId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    closeTeamMenu();
  }, [selectedTeamName, userAccessCodesData]);

  const saveAccessCode = () => {
    if (teamName.length < 4 || teamName.length > 20) {
      return Alert.alert(
        Localized('Team name must be between 4-20 characters'),
      );
    }
    if (accessCode.length < 4 || accessCode.length > 20) {
      return Alert.alert(
        Localized('Access code must be between 4-20 characters'),
      );
    }
    addTeamAccessCode();
  };

  const goToSearch = () => {
    closeMenus();
    navigation.navigate('Team Search Screen', {
      title: selectedTeamName.toUpperCase(),
      selectedTeamName,
      isOwner,
    });
  };

  if (loadingAccessCodes || loadingResources) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FilterSearchBar onPress={goToSearch}>
        <TouchableOpacity onPress={toggleTeamMenu}>
          <Flexbox direction="row" width="auto">
            <SwitchTeamIcon
              style={{
                height: 30,
                width: 30,
                color: theme.primaryTextColor,
                marginTop: -2,
                marginEnd: 6,
              }}
            />
            <H5>{selectedTeamName}</H5>
          </Flexbox>
        </TouchableOpacity>
      </FilterSearchBar>
      <Flexbox align="flex-start">
        <TeamMenu
          items={userAccessCodesData?.accesses}
          style={{ left: teamFadeAnim }}
          onClose={closeTeamMenu}
          onSelect={(name) => storeTeamName(name)}
          setIsAccessCodeModalOpen={setIsAccessCodeModalOpen}
          setIsNewAccessCode={setIsNewAccessCode}
          hasPermissionsToWrite={hasPermissionsToWrite}
          associateId={associateId}
          userHasAlreadyCreatedATeam={alreadyHasTeam}
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
          onStartShouldSetResponder={() => true}
        >
          {teamResourceData?.teamResources.length < 1 ? (
            <Flexbox>
              <H5>{Localized('There are no resources found')}</H5>
            </Flexbox>
          ) : null}
          {teamResourceData?.teamResources.map((item, index) => (
            <ResourceCard
              isCalloutOpenFromParent={isCalloutOpenFromParent}
              setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
              style={{ zIndex: -index }}
              key={item?.folderId}
              folderId={item?.folderId}
              folderName={item?.folderName}
              url={item?.pictureUrl}
              title={item?.folderName}
              isWideLayout={item?.isWideLayout}
              displayOrder={item?.displayOrder}
              isOwner={isOwner}
              setIsNavDisabled={setIsNavDisabled}
              isMenuOpen={isMenuOpen}
              isTeamMenuOpen={isTeamMenuOpen}
              selectedTeamName={selectedTeamName}
              selectedTeamAccessCode={selectedTeamAccessCode}
              assetList={item?.links}
              numberOfTeamFolders={teamResourceData?.teamResources.length}
              onPress={() => {
                navigateToResource(item);
              }}
            />
          ))}
        </View>
      </MainScrollView>
      {isAddFolderModalOpen && (
        <AddFolderModal
          visible={isAddFolderModalOpen}
          onClose={() => setIsAddFolderModalOpen(false)}
          selectedTeamName={selectedTeamName}
          selectedTeamAccessCode={selectedTeamAccessCode}
          displayOrder={teamResourceData?.teamResources?.length + 1}
        />
      )}
      {isAccessCodeModalOpen && (
        <AccessCodeModal
          visible={isAccessCodeModalOpen}
          onClose={() => setIsAccessCodeModalOpen(false)}
          onSave={saveAccessCode}
          testID="access-code-input"
          teamName={teamName}
          setTeamName={setTeamName}
          accessCode={accessCode}
          setAccessCode={setAccessCode}
          isNew={isNewAccessCode}
          isError={isError}
          setIsError={setIsError}
          setSelectedTeamName={storeTeamName}
        />
      )}
    </>
  );
};

TeamView.propTypes = {
  closeMenus: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  isCalloutOpenFromParent: PropTypes.bool.isRequired,
  setIsCalloutOpenFromParent: PropTypes.func.isRequired,
  isAddFolderModalOpen: PropTypes.bool.isRequired,
  setIsAddFolderModalOpen: PropTypes.func.isRequired,
  openTeamMenu: PropTypes.func,
  closeTeamMenu: PropTypes.func,
  isTeamMenuOpen: PropTypes.bool,
  teamFadeAnim: PropTypes.object,
  isMenuOpen: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  setIsOwner: PropTypes.func.isRequired,
};

export default TeamView;
