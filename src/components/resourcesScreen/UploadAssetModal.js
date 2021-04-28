import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform, Alert } from 'react-native';
import { Flexbox, Label, AnimatedInput, TextArea, Picker } from '../common';
import PaperclipIcon from '../../../assets/icons/paperclip-icon.svg';
import EditModal from '../editModal/EditModal';
import AppContext from '../../contexts/AppContext';
import * as ImagePicker from 'expo-image-picker';
import { Localized, initLanguage } from '../../translations/Localized';

const Underline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) => props.theme.highlight};
  border-bottom-width: 3px;
`;

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

const UploadAssetModal = ({ visible, onClose }) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('');
  const [file, setFile] = useState({ url: '' });

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
      setFile({ url: result.uri });
    }
  };

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setFile({ url: '' });
  };
  // TODO: add graphql mutation
  const onSave = () => {
    if (!title) {
      return Alert.alert(Localized('Please enter a title'));
    }
    if (!file.url) {
      return Alert.alert(Localized('Please select a file'));
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
        <AnimatedInput
          autoFocus
          label={Localized('Title')}
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
        />
        <Flexbox style={{ marginTop: 8 }} align="flex-start">
          <Picker
            items={contentTypeList}
            label={Localized('File Type')}
            value={contentType}
            placeholder={{
              label: Localized('Select a file type'),
              value: null,
            }}
            onValueChange={(value) => {
              setContentType(value);
            }}
            testID="country-input"
          />
        </Flexbox>
        <Label style={{ marginTop: 8 }}>{Localized('File')}</Label>
        <TouchableOpacity onPress={pickImage} style={{ width: '100%' }}>
          <Flexbox align="flex-end">
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
            <Underline />
          </Flexbox>
        </TouchableOpacity>
      </Flexbox>
    </EditModal>
  );
};

UploadAssetModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UploadAssetModal;
