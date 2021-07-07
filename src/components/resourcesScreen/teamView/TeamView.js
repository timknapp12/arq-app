import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { View, Platform, TouchableOpacity, Alert } from 'react-native';
import { Flexbox, H5, MainScrollView } from '../../common';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import SwitchTeamIcon from '../../../../assets/icons/switch-team-icon.svg';
import ResourceCard from '../ResourceCard';
import * as Analytics from 'expo-firebase-analytics';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import AddFolderModal from './AddFolderModal';
import AppContext from '../../../contexts/AppContext';
import TeamMenu from './TeamMenu';
import AccessCodeModal from './AccessCodeModal';
import { Localized } from '../../../translations/Localized';
import {
  GET_USERS_ACCESS_CODES,
  GET_TEAM_RESOURCES,
} from '../../../graphql/queries';
import { ADD_TEAM_ACCESS_CODE } from '../../../graphql/mutations';
import {
  findTeamAssociateId,
  findAssociateIdInListOfTeams,
  findTeamAccessCode,
} from '../../../utils/teamResources/findTeamAssociateId';

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
  isMenuOpen,
}) => {
  const { theme, associateId, hasPermissions } = useContext(AppContext);
  console.log(`hasPermissions`, hasPermissions);

  // get all of the access codes that the user has subscribed to
  const { loading: loadingAccessCodes, data: userAccessCodesData } = useQuery(
    GET_USERS_ACCESS_CODES,
    {
      variables: { associateId },
      onError: (err) => console.log(`err`, err),
    },
  );
  console.log(`userAccessCodesData`, userAccessCodesData);

  const [isNavDisabled, setIsNavDisabled] = useState(false);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);

  const [selectedTeamName, setSelectedTeamName] = useState('');
  const [selectedTeamAccessCode, setSelectedTeamAccessCode] = useState('');
  // this is a flag so selected team name does not always reset with new data from the refetch query of access codes
  const [initialLoad, setInitialLoad] = useState(true);

  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isNewAccessCode, setIsNewAccessCode] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isError, setIsError] = useState(false);

  const userHasAlreadyCreatedATeam = findAssociateIdInListOfTeams(
    associateId,
    userAccessCodesData?.accesses ?? '',
  );

  const navigateToResource = (item) => {
    fadeOut();
    // when a callout menu item on android is tapped, the touch event bleeds through to the item underneath, causing unwanted events to fire. So this prevents that
    if (Platform.OS === 'android' && isNavDisabled) {
      setIsNavDisabled(false);
      return;
    }
    // this prevents a team resource folder opening when it is underneath a the main menu
    if (isMenuOpen && Platform.OS === 'android') {
      return fadeOut();
    }
    navigation.navigate('Team Resources Category Screen', {
      title: item.folderName.toUpperCase(),
      folderId: item.folderId,
      // TODO: integrate permissions with backend
      isOwner: isOwner,
      selectedTeamName: selectedTeamName,
    });
    setIsCalloutOpenFromParent(false);
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.folderName.split(' ').join('_');
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
      await setSelectedTeamName(teamName);
      setTeamName('');
      setAccessCode('');
      return setIsAccessCodeModalOpen(false);
    },
    onError: () => setIsError(true),
  });

  useEffect(() => {
    if (userAccessCodesData?.accesses[0]?.teamName && initialLoad) {
      const name = userAccessCodesData?.accesses[0]?.teamName
        ? userAccessCodesData?.accesses[0]?.teamName
        : '';
      setSelectedTeamName(name);
      setInitialLoad(false);
    }
  }, [userAccessCodesData, initialLoad]);

  const [
    getTeamResources,
    { loading: loadingResources, data: teamResourceData },
  ] = useLazyQuery(GET_TEAM_RESOURCES, {
    variables: { teams: [selectedTeamName] },
  });

  console.log(`teamResourceData`, teamResourceData);

  // each time a new team is selected, get resources for that team
  useEffect(() => {
    getTeamResources();
    const teamAssociateId = findTeamAssociateId(
      selectedTeamName,
      userAccessCodesData?.accesses ?? [],
    );
    const newTeamAccessCode = findTeamAccessCode(
      selectedTeamName,
      userAccessCodesData?.accesses ?? [],
    );
    setSelectedTeamAccessCode(newTeamAccessCode);
    if (teamAssociateId === associateId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [selectedTeamName]);
  console.log(`isOwner`, isOwner);

  const saveAccessCode = () => {
    if (!teamName) {
      return Alert.alert(Localized('Please enter a team name'));
    }
    if (!accessCode) {
      return Alert.alert(Localized('Please enter a team access code'));
    }
    addTeamAccessCode();
  };

  if (loadingAccessCodes || loadingResources) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FilterSearchBar
        onPress={() => {
          fadeOut();
          navigation.navigate('Team Search Screen', {
            accessCode: '3',
            title: selectedTeamName.toUpperCase(),
          });
        }}>
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
          onSelect={(name) => setSelectedTeamName(name)}
          setIsAccessCodeModalOpen={setIsAccessCodeModalOpen}
          setIsNewAccessCode={setIsNewAccessCode}
          hasPermissions={hasPermissions}
          userHasAlreadyCreatedATeam={userHasAlreadyCreatedATeam}
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
              key={item.folderId}
              folderId={item.folderId}
              url={item.pictureUrl}
              title={item.folderName}
              isWideLayout={item.isWideLayout}
              displayOrder={item.displayOrder}
              isOwner={isOwner}
              setIsNavDisabled={setIsNavDisabled}
              isMenuOpen={isMenuOpen}
              isTeamMenuOpen={isTeamMenuOpen}
              selectedTeamName={selectedTeamName}
              selectedTeamAccessCode={selectedTeamAccessCode}
              assetList={item.links}
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
          setSelectedTeamName={setSelectedTeamName}
        />
      )}
    </>
  );
};
// teamOwnerAssociateId
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
  isMenuOpen: PropTypes.bool.isRequired,
};

export default TeamView;
