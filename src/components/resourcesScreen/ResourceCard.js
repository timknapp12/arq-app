import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import baseImage from '../../../assets/icons/image.png';
import KebobIcon from '../../../assets/icons/kebob-icon.svg';
import RemoveIcon from '../../../assets/icons/remove-icon.svg';
import UploadIcon from '../../../assets/icons/upload-icon.svg';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import TabButtonContext from '../../contexts/TabButtonContext';
import { H6, H4Book, Flexbox } from '../common';
import { Localized } from '../../translations/Localized';
import AddFolderModal from './teamView/AddFolderModal';
import UploadAssetModal from './teamView/UploadAssetModal';
import {
  CardContainer,
  CardImage,
  CardFooter,
  ResourceCallout,
  CalloutButton,
} from './resourceCard.styles';
import { DELETE_FOLDER } from '../../graphql/mutations';
import { GET_TEAM_RESOURCES } from '../../graphql/queries';

const ResourceCard = ({
  folderId,
  folderName,
  url,
  isWideLayout = true,
  displayOrder,
  title,
  onPress,
  isOwner,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  isMenuOpen,
  isTeamMenuOpen,
  selectedTeamName,
  selectedTeamAccessCode,
  // assetList,
  numberOfTeamFolders,
  // this prop is passed from TeamView.js so that on android the touch event doesn't persists through the callout menu to the resource card underneath
  setIsNavDisabled = () => {},
  ...props
}) => {
  const { theme } = useContext(AppContext);
  const { displayNotifications } = useContext(LoginContext);
  const { setSelectedFolderName } = useContext(TabButtonContext);

  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isUploadAssetModalOpen, setIsUploadAssetModalOpen] = useState(false);

  useEffect(() => {
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(false);
    }
    return () => {
      setIsCalloutOpen(false);
    };
  }, [isCalloutOpenFromParent]);

  useEffect(() => {
    if (!isCalloutOpen) {
      setIsNavDisabled(false);
    }
  }, [isCalloutOpen]);

  const closeCallout = () => {
    setIsCalloutOpen(false);
    setIsCalloutOpenFromParent(false);
  };

  const onCallout = async () => {
    if (isCalloutOpen) {
      closeCallout();
    } else if (!isCalloutOpen) {
      await setIsCalloutOpenFromParent(true);
      setIsCalloutOpen(true);
      setIsNavDisabled(true);
    }
    if (isCalloutOpenFromParent) {
      setIsCalloutOpenFromParent(false);
    } else if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(true);
      setIsNavDisabled(true);
    }
  };

  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    variables: { folderId },
    refetchQueries: [
      { query: GET_TEAM_RESOURCES, variables: { teams: [selectedTeamName] } },
    ],
    onCompleted: () => closeCallout(),
    onError: (error) => console.log(`error in delete folder`, error),
  });

  const onRemove = () =>
    Alert.alert(
      `${Localized('Remove')} "${title}"?`,
      Localized(
        'Removing this will delete all of its content. Do you wish to continue?',
      ),
      [
        {
          text: Localized('Cancel'),
          onPress: () => {
            closeCallout();
          },
          style: 'cancel',
        },
        {
          text: Localized('Yes'),
          onPress: () => deleteFolder(),
        },
      ],
      { cancelable: false },
    );

  return (
    <CardContainer isWideLayout={isWideLayout} {...props}>
      <TouchableOpacity
        /* active opacity changes depending on whether the touch event is outside the click boundary of the menu */
        activeOpacity={
          isMenuOpen || isTeamMenuOpen || displayNotifications ? 1 : 0.2
        }
        onPress={onPress}
      >
        <CardImage source={{ uri: url }} defaultSource={baseImage} />
      </TouchableOpacity>

      <CardFooter>
        <TouchableOpacity
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={onPress}
        >
          <H6>{title}</H6>
        </TouchableOpacity>

        {isOwner && (
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 6,
              }}
              onPress={onCallout}
            >
              <KebobIcon
                style={{ height: 20, width: 20, color: theme.activeTint }}
              />
            </TouchableOpacity>
          </View>
        )}
      </CardFooter>
      {isCalloutOpen && (
        <ResourceCallout>
          <CalloutButton
            onPress={() => {
              setIsAddFolderModalOpen(true);
            }}
          >
            <Flexbox direction="row" justify="flex-start">
              <EditIcon
                style={{
                  marginEnd: 8,
                  height: 24,
                  width: 24,
                  color: theme.activeTint,
                }}
              />
              <H4Book>{Localized('Edit')}</H4Book>
            </Flexbox>
          </CalloutButton>
          <CalloutButton
            onPress={() => {
              setIsUploadAssetModalOpen(true);
              setSelectedFolderName(folderName);
            }}
          >
            <Flexbox direction="row" justify="flex-start">
              <UploadIcon
                style={{
                  marginEnd: 8,
                  height: 24,
                  width: 24,
                  color: theme.activeTint,
                }}
              />
              <H4Book>{Localized('Upload')}</H4Book>
            </Flexbox>
          </CalloutButton>
          {numberOfTeamFolders !== 1 ? (
            <CalloutButton onPress={onRemove}>
              <Flexbox direction="row" justify="flex-start">
                <RemoveIcon
                  style={{
                    marginEnd: 8,
                    height: 24,
                    width: 24,
                    color: theme.activeTint,
                  }}
                />
                <H4Book>{Localized('Remove')}</H4Book>
              </Flexbox>
            </CalloutButton>
          ) : null}
        </ResourceCallout>
      )}
      {isAddFolderModalOpen && (
        <AddFolderModal
          visible={isAddFolderModalOpen}
          onClose={() => {
            setIsAddFolderModalOpen(false);
            closeCallout();
          }}
          editMode
          folderId={folderId}
          folderTitle={title}
          folderUrl={url}
          folderIsWideLayout={isWideLayout}
          displayOrder={displayOrder}
          selectedTeamName={selectedTeamName}
          selectedTeamAccessCode={selectedTeamAccessCode}
        />
      )}
      {isUploadAssetModalOpen && (
        <UploadAssetModal
          visible={isUploadAssetModalOpen}
          onClose={() => {
            setIsUploadAssetModalOpen(false);
            closeCallout();
          }}
          selectedTeamName={selectedTeamName}
        />
      )}
    </CardContainer>
  );
};

ResourceCard.propTypes = {
  folderId: PropTypes.number,
  folderName: PropTypes.string,
  title: PropTypes.string,
  isWideLayout: PropTypes.bool,
  displayOrder: PropTypes.number,
  url: PropTypes.string,
  onPress: PropTypes.func,
  isOwner: PropTypes.bool,
  /* callout from parent is so that tapping anywhere on the screen will close the callout */
  isCalloutOpenFromParent: PropTypes.bool,
  setIsCalloutOpenFromParent: PropTypes.func,
  isMenuOpen: PropTypes.bool.isRequired,
  isTeamMenuOpen: PropTypes.bool,
  selectedTeamName: PropTypes.string,
  selectedTeamAccessCode: PropTypes.string,
  assetList: PropTypes.array,
  numberOfTeamFolders: PropTypes.number,
  setIsNavDisabled: PropTypes.func,
};

export default ResourceCard;
