import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform, Alert } from 'react-native';
import { Flexbox, Label, Input, TextArea, Picker } from '../common';
import PaperclipIcon from '../../../assets/icons/paperclip-icon.svg';
import EditModal from '../editModal/EditModal';
import AppContext from '../../contexts/AppContext';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Localized, initLanguage } from '../../translations/Localized';

const Filename = styled(Label)`
  opacity: 0.83;
`;

const FileInput = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 0 0 4px;
`;

const FileUnderline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) =>
    props.focused ? props.theme.highlight : props.theme.disabledTextColor};
  border-bottom-width: ${(props) => (props.focused ? '3px' : '1px')};
`;

const UploadAssetModal = ({ visible, onClose }) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('');
  const [file, setFile] = useState({ url: '', contentType: '' });
  const [link, setLink] = useState('');
  const [isFileInputFocused, setIsFileInputFocused] = useState(false);

  // permissions for photo library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            Localized(
              'Sorry, we need camera roll permissions to make this work!',
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
      quality: 1,
    });

    if (!result.cancelled) {
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
      setFile({ url: result.uri, contentType: 'pdf' });
    }
  };

  const pickFile = () => {
    if (!contentType) {
      Alert.alert('Please first select a file type above');
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

  // TODO: add graphql mutation
  // TODO: consider breaking this function out to a separate file
  const onSave = () => {
    if (!title) {
      return Alert.alert(Localized('Please enter a title'));
    }
    if (!description) {
      return Alert.alert(Localized('Please enter a description'));
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
        `You selected a File Type of "image" but uploaded a document that doesn't match. Please make sure these match`,
      );
    }
    if (contentType === 'pdf' && file.contentType !== 'pdf') {
      return Alert.alert(
        `You selected a File Type of "pdf" but uploaded a document that doesn't match. Please make sure these match`,
      );
    }
  };
  // TODO File Picker!!!
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
      onSave={onSave}>
      <Flexbox align="flex-start">
        <Label style={{ marginTop: 8 }}>{Localized('Title')}</Label>
        <Input
          autoFocus
          onFocus={() => setIsFileInputFocused(false)}
          testID="upload-asset-title-input"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextArea
          label={Localized('Description')}
          testID="upload-asset-description-input"
          value={description}
          multiline
          numberOfLines={3}
          onChangeText={(text) => setDescription(text)}
          style={{ marginTop: 8 }}
          onFocus={() => setIsFileInputFocused(false)}
        />
        <Picker
          style={{ marginTop: 8, width: '100%' }}
          items={contentTypeList}
          label={Localized('File Type')}
          value={contentType}
          placeholder={{
            label: Localized('Select a file type'),
            value: null,
          }}
          onValueChange={(value) => {
            setContentType(value);
            setIsFileInputFocused(false);
          }}
          testID="contentType-input"
        />
        {contentType === 'video' || contentType === 'podcast' ? (
          <>
            <Label style={{ marginTop: 8 }}>Link</Label>
            <Input
              onFocus={() => setIsFileInputFocused(false)}
              testID="upload-asset-link-input"
              value={link}
              onChangeText={(text) => setLink(text)}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              pickFile();
              setIsFileInputFocused(true);
            }}
            style={{ width: '100%' }}>
            <Label style={{ marginTop: 8 }}>{Localized('File')}</Label>
            <FileInput>
              <Filename
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ flex: 1 }}>
                {file.url}
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
      </Flexbox>
    </EditModal>
  );
};

UploadAssetModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UploadAssetModal;
