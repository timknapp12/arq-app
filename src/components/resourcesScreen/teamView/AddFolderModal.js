import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
import {
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  Keyboard,
  View,
} from 'react-native';
import {
  Flexbox,
  Label,
  Input,
  H5Black,
  AlertText,
  LoadingSpinner,
} from '../../common';
import ImageIcon from '../../../../assets/icons/image-icon.svg';
import PaperclipIcon from '../../../../assets/icons/paperclip-icon.svg';
import EditModal from '../../editModal/EditModal';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import * as ImagePicker from 'expo-image-picker';
import { Localized } from '../../../translations/Localized';
import { ADD_UPDATE_FOLDER } from '../../../graphql/mutations';
import { GET_TEAM_RESOURCES } from '../../../graphql/queries';
import { saveFileToFirebase } from '../../../utils/firebase/saveFileToFirebase';
import {
  imageHeight,
  squareImageWidth,
  rectangleImageWidth,
  Underline,
  Filename,
  FileInput,
  FileUnderline,
  MiniCard,
  Footer,
  Title,
  DefaultSquareImage,
  DefaultRectangleImage,
  marginSize,
} from './modal.styles';

const AddFolderModal = ({
  visible,
  onClose,
  selectedTeamName,
  selectedTeamAccessCode,
  displayOrder,
  // the following props are passed in from ResourceCard.js to populate the info when a user is editing an existing folder
  editMode,
  folderId,
  folderTitle = '',
  folderUrl = '',
  folderIsWideLayout = false,
}) => {
  const { theme, associateId } = useContext(AppContext);
  const { userProfile } = useContext(LoginContext);
  const [title, setTitle] = useState(folderTitle);
  const [isWideLayout, setIsWideLayout] = useState(folderIsWideLayout);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const [imageFile, setImageFile] = useState({ url: folderUrl });
  const [isFileInputFocused, setIsFileInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const errorMessage = Localized(
    'Sorry there was an error! Please try again later',
  );

  // permissions for photo library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            Localized(
              'Sorry, we need camera roll permissions to make this work!',
              Localized(
                'Please go to settings on your device and enable permissions to access your photos',
              ),
            ),
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: isWideLayout ? [2, 1] : [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setIsNewImageSelected(true);
      setImageFile({ url: result.uri });
    }
  };

  const clearFields = () => {
    setTitle('');
    setImageFile({ url: '' });
    setIsWideLayout(false);
    setIsFileInputFocused(false);
  };

  const variables = {
    folderId: folderId ? folderId : 0,
    teamAssociateId: associateId,
    folderName: title,
    folderDescription: '',
    isWideLayout,
    pictureUrl: folderUrl,
    teamName: selectedTeamName,
    teamAccessCode: selectedTeamAccessCode,
    changedBy: `${userProfile.firstName} ${userProfile.lastName}`,
    displayOrder,
    folderType: 'TEAM',
    fileName: '',
    comments: '',
  };
  const [addUpdateFolder] = useMutation(ADD_UPDATE_FOLDER, {
    variables: variables,
    refetchQueries: [
      { query: GET_TEAM_RESOURCES, variables: { teams: [selectedTeamName] } },
    ],
    onCompleted: () => {
      setIsLoading(false);
      onClose();
      Analytics.logEvent('add_or_update_team_folder');
    },
    onError: (error) => {
      setIsLoading(false);
      setIsError(true);
      console.log(`error in addUpdateFolder`, error);
    },
  });

  const onSave = async () => {
    if (!title) {
      return Alert.alert(Localized('Please enter a title'));
    }
    if (!imageFile.url) {
      return Alert.alert(Localized('Please select an image'));
    }
    setIsLoading(true);
    isNewImageSelected
      ? await saveFileToFirebase(
          imageFile,
          selectedTeamName,
          title,
          folderId,
          addUpdateFolder,
          variables,
        )
      : addUpdateFolder({ variables: variables });
  };

  return (
    <EditModal
      visible={visible}
      onClose={() => {
        clearFields();
        onClose();
      }}
      onSave={onSave}
      saveButtonDisabled={isLoading}
    >
      <Flexbox align="flex-start">
        <Flexbox>
          <H5Black style={{ textAlign: 'center' }}>
            {Localized(editMode ? `Edit Folder` : `Add Folder`)}
          </H5Black>
        </Flexbox>
        <View
          style={{
            height: 20,
            width: '100%',
            padding: 4,
            alignItems: 'center',
          }}
        >
          {isLoading && <LoadingSpinner />}
        </View>
        <Input
          label={Localized('Title')}
          autoFocus
          onFocus={() => setIsFileInputFocused(false)}
          testID="resource-folder-title-input"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setIsError(false);
          }}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          style={{ marginTop: marginSize }}
        />
        <Label style={{ marginTop: marginSize }}>{Localized('Layout')}</Label>
        <Flexbox
          style={{ marginTop: marginSize }}
          justify="flex-start"
          direction="row"
        >
          <TouchableOpacity
            onPress={() => {
              setIsWideLayout(false);
              setIsFileInputFocused(false);
              setIsError(false);
            }}
          >
            <Flexbox
              height="106px"
              style={{ width: squareImageWidth, marginEnd: 20 }}
            >
              <MiniCard>
                {imageFile.url && !isWideLayout ? (
                  <Image
                    style={{ width: squareImageWidth, height: imageHeight }}
                    source={{ uri: imageFile.url }}
                  />
                ) : (
                  <DefaultSquareImage>
                    <ImageIcon color={theme.cardBackgroundColor} />
                  </DefaultSquareImage>
                )}
                <Footer>
                  <Title ellipsizeMode="tail" numberOfLines={1}>
                    {!isWideLayout && title ? title : Localized('Title')}
                  </Title>
                </Footer>
              </MiniCard>
              {!isWideLayout && <Underline style={{ marginTop: marginSize }} />}
            </Flexbox>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsWideLayout(true);
              setIsFileInputFocused(false);
              setIsError(false);
            }}
          >
            <Flexbox height="106px">
              <MiniCard>
                {imageFile.url && isWideLayout ? (
                  <Image
                    style={{
                      width: rectangleImageWidth,
                      height: imageHeight,
                    }}
                    source={{ uri: imageFile.url }}
                  />
                ) : (
                  <DefaultRectangleImage>
                    <ImageIcon color={theme.cardBackgroundColor} />
                  </DefaultRectangleImage>
                )}
                <Footer>
                  <Title ellipsizeMode="tail" numberOfLines={1}>
                    {isWideLayout && title ? title : Localized('Title')}
                  </Title>
                </Footer>
              </MiniCard>
              {isWideLayout && <Underline style={{ marginTop: marginSize }} />}
            </Flexbox>
          </TouchableOpacity>
        </Flexbox>
        <TouchableOpacity
          onPress={() => {
            pickImage();
            setIsFileInputFocused(true);
            setIsError(false);
          }}
          style={{ width: '100%' }}
        >
          <Label style={{ marginTop: marginSize }}>
            {Localized('Picture')}
          </Label>
          <Flexbox align="flex-end">
            <FileInput>
              <Filename
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ flex: 1 }}
              >
                {imageFile.url}
              </Filename>
              <PaperclipIcon
                style={{
                  color: theme.primaryTextColor,
                  height: 30,
                  width: 30,
                  marginTop: -6,
                }}
              />
            </FileInput>
            <FileUnderline focused={isFileInputFocused} />
          </Flexbox>
        </TouchableOpacity>
        {isError ? (
          <AlertText style={{ textAlign: 'center' }}>{errorMessage}</AlertText>
        ) : (
          <View style={{ height: 30 }} />
        )}
      </Flexbox>
    </EditModal>
  );
};

AddFolderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedTeamName: PropTypes.string.isRequired,
  selectedTeamAccessCode: PropTypes.string.isRequired,
  displayOrder: PropTypes.number,
  editMode: PropTypes.bool,
  folderId: PropTypes.number,
  folderTitle: PropTypes.string,
  folderUrl: PropTypes.string,
  folderIsWideLayout: PropTypes.bool,
};

export default AddFolderModal;
