import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { Flexbox, Label, Input } from '../common';
import ImageIcon from '../../../assets/icons/image-icon.svg';
import PaperclipIcon from '../../../assets/icons/paperclip-icon.svg';
import EditModal from '../editModal/EditModal';
import AppContext from '../../contexts/AppContext';
import * as ImagePicker from 'expo-image-picker';
import { Localized, initLanguage } from '../../translations/Localized';

const imageHeight = 76;
const squareImageWidth = imageHeight;
const rectangleImageWidth = imageHeight * 2;

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

const FileUnderline = styled.View`
  width: 100%;
  border-bottom-color: ${(props) =>
    props.focused ? props.theme.highlight : props.theme.disabledTextColor};
  border-bottom-width: ${(props) => (props.focused ? '3px' : '1px')};
`;

const MiniCard = styled.View`
  height: 96px;
`;

const Footer = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  height: 20px;
  justify-content: center;
`;

const Title = styled.Text`
  flex: 1;
  font-family: 'Avenir-Heavy';
  font-size: 10px;
  opacity: 0.83;
  color: ${(props) => props.theme.primaryTextColor};
  padding: 2px;
`;

const DefaultSquareImage = styled.View`
  background-color: ${(props) => props.theme.disabledBackgroundColor};
  height: ${imageHeight}px;
  width: ${squareImageWidth}px;
`;

const DefaultRectangleImage = styled.View`
  background-color: ${(props) => props.theme.disabledBackgroundColor};
  height: ${imageHeight}px;
  width: ${rectangleImageWidth}px;
`;

const AddFolderModal = ({
  visible,
  onClose,
  // the following 3 props are passed in from ResourceCard.js to populate the info when a user is editing an existing folder
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
        <Label style={{ marginTop: 8 }}>{Localized('Title')}</Label>
        <Input
          autoFocus
          onFocus={() => setIsFileInputFocused(false)}
          testID="resource-folder-title-input"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Label style={{ marginTop: 8 }}>{Localized('Layout')}</Label>
        <Flexbox style={{ marginTop: 8 }} justify="flex-start" direction="row">
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
              {!isWideLayout && <Underline style={{ marginTop: 8 }} />}
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
              {isWideLayout && <Underline style={{ marginTop: 8 }} />}
            </Flexbox>
          </TouchableOpacity>
        </Flexbox>
        <Label style={{ marginTop: 8 }}>{Localized('Picture')}</Label>
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
                  color: theme.activeTint,
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
  folderTitle: PropTypes.string,
  folderUrl: PropTypes.string,
  folderIsWideLayout: PropTypes.bool,
};

export default AddFolderModal;
