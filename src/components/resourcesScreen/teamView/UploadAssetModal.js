import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import {
  TouchableOpacity,
  Alert,
  Keyboard,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  Flexbox,
  Label,
  Input,
  TextArea,
  Picker,
  H5Black,
  AlertText,
} from '../../common';
import PaperclipIcon from '../../../../assets/icons/paperclip-icon.svg';
import EditModal from '../../editModal/EditModal';
import AppContext from '../../../contexts/AppContext';
import TabButtonContext from '../../../contexts/TabButtonContext';
import { Filename, FileInput, FileUnderline, marginSize } from './modal.styles';
import { Localized } from '../../../translations/Localized';
import { ADD_UPDATE_ASSET } from '../../../graphql/mutations';
import {
  GET_ASSETS,
  GET_TEAM_RESOURCES,
  SEARCH_RESOURCES,
} from '../../../graphql/queries';
import { saveFileToFirebase } from '../../../utils/firebase/saveFileToFirebase';

const UploadAssetModal = ({
  visible,
  onClose,
  // folderId,
  // these props are to populate the fields in the modal with already existing data while in edit modal
  editMode,
  linkId,
  // displayOrder,
  selectedTeamName,
  assetTitle = '',
  assetDescription = '',
  assetContentType = '',
  assetFile = { url: '', contentType: '' },
  assetLink = '',
  // this is when user edits an asset from TeamSearchScreen.js
  searchTerm,
  // these are from TabButtonContainer
  // reshapedFolders = [{ value: 'test', label: 'test' }],
  // selectedFolderName = 'test',
  // setSelectedFolderName,
}) => {
  const { theme } = useContext(AppContext);
  const {
    folderId,
    displayOrder,
    reshapedFolders,
    selectedFolderName,
    setSelectedFolderName,
  } = useContext(TabButtonContext);
  console.log(`folderId`, folderId);

  const [title, setTitle] = useState(assetTitle);
  const [description, setDescription] = useState(assetDescription);
  const [contentType, setContentType] = useState(assetContentType);
  const [file, setFile] = useState(assetFile);
  const [link, setLink] = useState(assetLink);
  const [isFileInputFocused, setIsFileInputFocused] = useState(false);

  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const errorMessage = Localized(
    'Sorry there was an error! Please try again later',
  );

  console.log(`selectedFolderName`, selectedFolderName);
  // permissions for photo library
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          Localized(
            'Sorry, we need camera roll permissions to make this work!',
          ),
          Localized(
            'Please go to settings on your device and enable permissions to access your photos',
          ),
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setIsNewImageSelected(true);
      setFile({ url: result.uri, contentType: 'image' });
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    });
    if (result.type === 'cancel') {
      return;
    }
    if (!result.cancelled) {
      setIsNewImageSelected(true);
      setFile({ url: result.uri, contentType: 'pdf' });
    }
  };

  const pickFile = () => {
    if (!contentType) {
      Alert.alert(Localized('Please first select a file type above'));
    }
    if (contentType === 'image') {
      pickImage();
    }
    if (contentType === 'pdf') {
      pickDocument();
    }
  };

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setFile({ url: '', contentType: '' });
    setLink('');
    setIsFileInputFocused(false);
  };

  const variables = {
    folderId,
    linkId: linkId ? linkId : 0,
    linkTitle: title,
    linkUrl:
      contentType === 'podcast' || contentType === 'video' ? link : file.url,
    linkDescription: description,
    contentType,
    extension:
      contentType === 'pdf'
        ? 'pdf'
        : contentType === 'image'
        ? 'jpg'
        : contentType === 'podcast'
        ? 'mp3'
        : '',
    comments: '',
    displayOrder: displayOrder,
    fileName: '',
    imageUrl: '',
    dateStart: new Date().toISOString(),
    dateEnd: new Date().toISOString(),
    changedBy: '',
  };

  const [addUpdateAsset] = useMutation(ADD_UPDATE_ASSET, {
    variables: variables,
    refetchQueries: [
      { query: GET_TEAM_RESOURCES, variables: { teams: [selectedTeamName] } },
      { query: GET_ASSETS, variables: { folderId } },
      searchTerm !== null && {
        query: SEARCH_RESOURCES,
        variables: {
          teams: selectedTeamName,
          searchList: searchTerm,
        },
      },
    ],
    options: {
      awaitRefetchQueries: true,
    },
    onCompleted: () => {
      setIsLoading(false);
      onClose();
    },
    onError: (error) => {
      setIsLoading(false);
      setIsError(true);
      console.log(`error in addUpdateAsset in UploadAssetModal.js`, error);
    },
  });

  const onSave = async () => {
    if (!title) {
      return Alert.alert(Localized('Please enter a title'));
    }
    if (!description) {
      return Alert.alert(Localized('Please enter a description'));
    }
    if (!selectedFolderName) {
      return Alert.alert(Localized('Please select a folder'));
    }
    if (!contentType) {
      return Alert.alert(Localized('Please select a file type'));
    }
    if ((contentType === 'video' || contentType === 'podcast') && !title) {
      return Alert.alert(Localized('Please enter a link'));
    }
    if ((contentType === 'image' || contentType === 'pdf') && !file.url) {
      return Alert.alert(Localized('Please select a file'));
    }
    if (contentType === 'image' && file.contentType !== 'image') {
      return Alert.alert(
        Localized(
          `You selected a File Type of 'image' but uploaded a document that doesn't match. Please make sure these match`,
        ),
      );
    }
    if (contentType === 'pdf' && file.contentType !== 'pdf') {
      return Alert.alert(
        Localized(
          `You selected a File Type of 'pdf' but uploaded a document that doesn't match. Please make sure these match`,
        ),
      );
    }
    setIsLoading(true);
    isNewImageSelected
      ? await saveFileToFirebase(
          file,
          selectedTeamName,
          title,
          folderId,
          addUpdateAsset,
          variables,
        )
      : addUpdateAsset();
  };
  const contentTypeList = [
    { id: 0, label: Localized('Image'), value: 'image' },
    { id: 1, label: Localized('Pdf'), value: 'pdf' },
    { id: 2, label: Localized('Video'), value: 'video' },
    { id: 3, label: Localized('Podcast'), value: 'podcast' },
  ];

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
            {Localized(editMode ? `Edit Item` : `Add Item`)}
          </H5Black>
          <View
            style={{
              height: 20,
              width: '100%',
              padding: 4,
              alignItems: 'center',
            }}
          >
            {isLoading && (
              <ActivityIndicator color={theme.disabledBackgroundColor} />
            )}
          </View>
        </Flexbox>
        <Input
          label={Localized('Title')}
          autoFocus
          onFocus={() => setIsFileInputFocused(false)}
          testID="upload-asset-title-input"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setIsError(false);
          }}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          style={{ marginTop: marginSize }}
        />
        <Flexbox height="100px">
          <TextArea
            label={Localized('Description')}
            testID="upload-asset-description-input"
            value={description}
            multiline
            numberOfLines={3}
            onChangeText={(text) => {
              setDescription(text);
              setIsError(false);
            }}
            style={{ marginTop: marginSize }}
            onFocus={() => setIsFileInputFocused(false)}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
        </Flexbox>
        <Picker
          style={{ marginTop: 18, width: '100%' }}
          items={reshapedFolders}
          label={Localized('Folder Title')}
          value={selectedFolderName}
          placeholder={{
            label: '',
            value: null,
          }}
          onValueChange={(value) => {
            setSelectedFolderName(value);
            setIsFileInputFocused(false);
            setIsError(false);
          }}
          testID="foler-title-input"
        />
        <Picker
          style={{ marginTop: 8, width: '100%' }}
          items={contentTypeList}
          label={Localized('File Type')}
          value={contentType}
          placeholder={{
            label: '',
            value: null,
          }}
          onValueChange={(value) => {
            setContentType(value);
            setIsFileInputFocused(false);
            setIsError(false);
          }}
          testID="contentType-input"
        />
        {contentType === 'video' || contentType === 'podcast' ? (
          <>
            <Input
              label={Localized('Link')}
              onFocus={() => setIsFileInputFocused(false)}
              testID="upload-asset-link-input"
              value={link}
              onChangeText={(text) => {
                setLink(text);
                setIsError(false);
              }}
              placeholder={Localized('Enter a url')}
              placeholderTextColor={theme.placeholderTextColor}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              style={{ marginTop: marginSize }}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              pickFile();
              setIsFileInputFocused(true);
              setIsError(false);
            }}
            style={{ width: '100%' }}
          >
            <Label style={{ marginTop: marginSize }}>{Localized('File')}</Label>
            <FileInput>
              <Filename
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ flex: 1 }}
              >
                {file.url ? file.url : Localized('Add a file from your device')}
              </Filename>
              <PaperclipIcon
                style={{
                  color: theme.activeTint,
                  height: 30,
                  width: 30,
                  marginTop: -6,
                }}
              />
            </FileInput>
            <FileUnderline focused={isFileInputFocused} />
          </TouchableOpacity>
        )}
        {isError ? (
          <AlertText style={{ textAlign: 'center' }}>{errorMessage}</AlertText>
        ) : (
          <View style={{ height: 30 }} />
        )}
      </Flexbox>
    </EditModal>
  );
};

UploadAssetModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // folderId: PropTypes.number.isRequired,
  linkId: PropTypes.number,
  // displayOrder: PropTypes.number,
  editMode: PropTypes.bool,
  selectedTeamName: PropTypes.string,
  assetTitle: PropTypes.string,
  assetDescription: PropTypes.string,
  assetContentType: PropTypes.string,
  assetFile: PropTypes.object,
  assetLink: PropTypes.string,
  searchTerm: PropTypes.string,
  // reshapedFolders: PropTypes.array,
  // selectedFolderName: PropTypes.string,
  // setSelectedFolderName: PropTypes.func,
};

export default UploadAssetModal;
