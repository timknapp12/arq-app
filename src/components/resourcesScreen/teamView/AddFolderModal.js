import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { Flexbox, Label, Input, H5Black } from '../../common';
import ImageIcon from '../../../../assets/icons/image-icon.svg';
import PaperclipIcon from '../../../../assets/icons/paperclip-icon.svg';
import EditModal from '../../editModal/EditModal';
import AppContext from '../../../contexts/AppContext';
import * as ImagePicker from 'expo-image-picker';
import { Localized, initLanguage } from '../../../translations/Localized';
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
  // the following props are passed in from ResourceCard.js to populate the info when a user is editing an existing folder
  editMode,
  folderTitle = '',
  folderUrl = '',
  folderIsWideLayout = false,
}) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [title, setTitle] = useState(folderTitle);
  const [isWideLayout, setIsWideLayout] = useState(folderIsWideLayout);
  const [imageFile, setImageFile] = useState({ url: folderUrl });
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
      aspect: isWideLayout ? [2, 1] : [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageFile({ url: result.uri });
    }
  };

  const clearFields = () => {
    setTitle('');
    setImageFile({ url: '' });
    setIsWideLayout(false);
    setIsFileInputFocused(false);
  };
  // TODO: add graphql mutation
  const onSave = () => {
    if (!title) {
      return Alert.alert(Localized('Please enter a title'));
    }
    if (!imageFile.url) {
      return Alert.alert(Localized('Please select an image'));
    }
  };

  return (
    <EditModal
      visible={visible}
      onClose={() => {
        clearFields();
        onClose();
      }}
      onSave={onSave}>
      <Flexbox align="flex-start">
        <Flexbox>
          <H5Black style={{ textAlign: 'center' }}>
            {Localized(
              editMode ? Localized(`Edit Folder`) : Localized(`Add Folder`),
            )}
          </H5Black>
        </Flexbox>
        <Label style={{ marginTop: marginSize }}>{Localized('Title')}</Label>
        <Input
          autoFocus
          onFocus={() => setIsFileInputFocused(false)}
          testID="resource-folder-title-input"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Label style={{ marginTop: marginSize }}>{Localized('Layout')}</Label>
        <Flexbox
          style={{ marginTop: marginSize }}
          justify="flex-start"
          direction="row">
          <TouchableOpacity
            onPress={() => {
              setIsWideLayout(false);
              setIsFileInputFocused(false);
            }}>
            <Flexbox
              height="106px"
              style={{ width: squareImageWidth, marginEnd: 20 }}>
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
            }}>
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
        <Label style={{ marginTop: marginSize }}>{Localized('Picture')}</Label>
        <TouchableOpacity
          onPress={() => {
            pickImage();
            setIsFileInputFocused(true);
          }}
          style={{ width: '100%' }}>
          <Flexbox align="flex-end">
            <FileInput>
              <Filename
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ flex: 1 }}>
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
      </Flexbox>
    </EditModal>
  );
};

AddFolderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  folderTitle: PropTypes.string,
  folderUrl: PropTypes.string,
  folderIsWideLayout: PropTypes.bool,
};

export default AddFolderModal;
