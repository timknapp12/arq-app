import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { Dimensions, Animated, Easing, Alert } from 'react-native';
import TabButtonContext from '../contexts/TabButtonContext';
import AccessCodeModal from '../components/resourcesScreen/teamView/AccessCodeModal';
import AddContactModal from '../components/prospectsScreen/AddContactModal';
import AddFolderModal from '../components/resourcesScreen/teamView/AddFolderModal';
import UploadAssetModal from '../components/resourcesScreen/teamView/UploadAssetModal';
import AppContext from '../contexts/AppContext';
import LoginContext from '../contexts/LoginContext';
import { Localized } from '../translations/Localized';
import { ADD_TEAM_ACCESS_CODE } from '../graphql/mutations';
import {
  // GET_USERS_ACCESS_CODES,
  GET_TEAM_RESOURCES,
} from '../graphql/queries';
import { findPropInArray } from '../utils/teamResources/findTeamResourceData';

const { width: screenWidth } = Dimensions.get('screen');
const duration = 250;

const TabButtonDataContainer = ({ children }) => {
  const { associateId, hasPermissionsToWrite } = useContext(AppContext);
  const {
    showAddOptions,
    setShowAddOptions,
    usersTeamInfo,
    refetchUserAccessCodes,
    alreadyHasTeam,
  } = useContext(LoginContext);

  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [isUploadAssetModalOpen, setIsUploadAssetModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  // Animations for main buttons and smaller buttons that pop up
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;
  const rowWidthAnim = useRef(new Animated.Value(120)).current;
  const rowTopAnim = useRef(new Animated.Value(0)).current;
  // source for roateAnim https://javascript.plainenglish.io/creating-a-rotation-animation-in-react-native-45c3f2973d62
  const [rotateAnim] = useState(new Animated.Value(0));

  const openAddOptions = () => {
    setShowAddOptions(true);
    Animated.parallel([
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowWidthAnim, {
        toValue: screenWidth / 2,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowTopAnim, {
        toValue: -46,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const closeAddOptions = () => {
    Animated.parallel([
      Animated.timing(buttonScaleAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowWidthAnim, {
        toValue: 120,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rowTopAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => setShowAddOptions(false));
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  // when the user navigates between tabs, this will ensure that it is animated to a closed state
  useEffect(() => {
    if (!showAddOptions) {
      closeAddOptions();
    }
  }, [showAddOptions]);

  // CREATE A TEAM
  // alert in case the user needs to create a team
  const showAlertThatUserHasNoTeam = () => {
    Alert.alert(
      Localized('You have not created a team yet'),
      Localized('Would you like to create a team?'),
      [
        {
          text: Localized('No').toUpperCase(),
          style: 'cancel',
          onPress: () => console.log('cancel'),
        },
        {
          text: Localized('Yes').toUpperCase(),
          onPress: () => setIsAccessCodeModalOpen(true),
        },
      ],
    );
  };

  // alert if they have not created a folder yet
  const showAlertThatUserHasNoFolders = () => {
    Alert.alert(
      Localized('You have not created any folders yet'),
      Localized('Would you like to create a folder?'),
      [
        {
          text: Localized('No').toUpperCase(),
          style: 'cancel',
          onPress: () => console.log('cancel'),
        },
        {
          text: Localized('Yes').toUpperCase(),
          onPress: () => setIsAccessCodeModalOpen(true),
        },
      ],
    );
  };

  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isError, setIsError] = useState(false);

  const [addTeamAccessCode] = useMutation(ADD_TEAM_ACCESS_CODE, {
    variables: {
      associateId,
      teamName,
      accessCode,
      teamAccessId: 0,
    },
    // we might not need the refecthQueries if the refetchUserAccessCodes works well in the onCompleted
    // refetchQueries: [
    //   { query: GET_USERS_ACCESS_CODES, variables: { associateId } },
    // ],
    onCompleted: () => {
      refetchUserAccessCodes();
      setTeamName('');
      setAccessCode('');
      return setIsAccessCodeModalOpen(false);
    },
    onError: () => setIsError(true),
  });

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

  console.log(`usersTeamInfo?.teamName`, usersTeamInfo?.teamName);
  // GET TEAM RESOURCES
  const { data: teamResourceData } = useQuery(GET_TEAM_RESOURCES, {
    variables: { teams: [usersTeamInfo?.teamName] },
    onError: (e) =>
      console.log(`error in get team resources in TabButtonContainer.js`, e),
  });

  const reshapedFolders = teamResourceData?.teamResources?.map((item) => ({
    label: item?.folderName,
    value: item?.folderName,
  }));

  const [selectedFolderName, setSelectedFolderName] = useState('');
  console.log(`selectedFolderName`, selectedFolderName);

  useEffect(() => {
    if (teamResourceData?.teamResources) {
      const initialFolderName =
        teamResourceData?.teamResources?.[0]?.folderName;
      setSelectedFolderName(initialFolderName);
    }
  }, [teamResourceData?.teamResources]);

  const [selectedTeamFolderId, setSelectedTeamFolderId] = useState(null);
  const [assetsInSelectedFolder, setAssetsInSelectedFolder] = useState([]);
  console.log(`selectedTeamFolderId`, selectedTeamFolderId);
  console.log(`assetsInSelectedFolder`, assetsInSelectedFolder);

  useEffect(() => {
    if (selectedFolderName) {
      const teamFolderId = findPropInArray(
        teamResourceData?.teamResources,
        selectedFolderName,
        'folderName',
        'folderId',
      );
      setSelectedTeamFolderId(teamFolderId);
      const assetsInFolder = findPropInArray(
        teamResourceData?.teamResources,
        selectedFolderName,
        'folderName',
        'links',
      );
      setAssetsInSelectedFolder(assetsInFolder);
    }
  }, [selectedFolderName]);

  // if user is not ruby or higher, have the button allow them to add a prospect
  // if user is ruby or higher, give them all of the add options and make the button toggle the options menu
  const handleMainAddButton = () => {
    if (hasPermissionsToWrite) {
      showAddOptions ? closeAddOptions() : openAddOptions();
    } else {
      setIsAddContactModalOpen(true);
    }
  };

  const handleAddProspect = () => {
    setIsAddContactModalOpen(true);
    closeAddOptions();
  };

  const handleAddFolder = () => {
    if (alreadyHasTeam) {
      setIsAddFolderModalOpen(true);
      closeAddOptions();
    } else {
      showAlertThatUserHasNoTeam();
      closeAddOptions();
    }
  };

  const handleAddAsset = () => {
    if (alreadyHasTeam) {
      reshapedFolders?.length > 0
        ? setIsUploadAssetModalOpen(true)
        : showAlertThatUserHasNoFolders();
      closeAddOptions();
    } else {
      showAlertThatUserHasNoTeam();
      closeAddOptions();
    }
  };

  return (
    <>
      <TabButtonContext.Provider
        value={{
          buttonScaleAnim,
          rowWidthAnim,
          rowTopAnim,
          spin,
          openAddOptions,
          closeAddOptions,
          setIsAddContactModalOpen,
          setIsAddFolderModalOpen,
          setIsUploadAssetModalOpen,
          showAlertThatUserHasNoTeam,
          showAlertThatUserHasNoFolders,
          folderId: selectedTeamFolderId,
          displayOrder: assetsInSelectedFolder?.length + 1,
          reshapedFolders,
          selectedFolderName,
          setSelectedFolderName,
          handleMainAddButton,
          handleAddProspect,
          handleAddFolder,
          handleAddAsset,
        }}
      >
        <>
          {children}
          {isUploadAssetModalOpen && (
            <UploadAssetModal
              visible={isUploadAssetModalOpen}
              onClose={() => {
                setIsUploadAssetModalOpen(false);
              }}
              selectedTeamName={usersTeamInfo?.teamName}
              folderId={selectedTeamFolderId}
              displayOrder={assetsInSelectedFolder?.length + 1}
              reshapedFolders={reshapedFolders}
              selectedFolderName={selectedFolderName}
              setSelectedFolderName={setSelectedFolderName}
            />
          )}
        </>
      </TabButtonContext.Provider>
      {isAddContactModalOpen && (
        <AddContactModal
          isAddContactModalOpen={isAddContactModalOpen}
          onClose={() => setIsAddContactModalOpen(false)}
          newContact={true}
        />
      )}
      {isAccessCodeModalOpen && (
        <AccessCodeModal
          visible={isAccessCodeModalOpen}
          onClose={() => setIsAccessCodeModalOpen(false)}
          onSave={saveAccessCode}
          teamName={teamName}
          setTeamName={setTeamName}
          accessCode={accessCode}
          setAccessCode={setAccessCode}
          isNew
          isError={isError}
          setIsError={setIsError}
        />
      )}
      {isAddFolderModalOpen && (
        <AddFolderModal
          visible={isAddFolderModalOpen}
          onClose={() => setIsAddFolderModalOpen(false)}
          selectedTeamName={usersTeamInfo?.teamName}
          selectedTeamAccessCode={usersTeamInfo?.accessCode}
          displayOrder={teamResourceData?.teamResources?.length + 1}
        />
      )}
    </>
  );
};

TabButtonDataContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default TabButtonDataContainer;
