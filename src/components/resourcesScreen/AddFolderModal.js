import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { Flexbox, Label, AnimatedInput } from '../common';
import square from '../../../assets/images/square-layout.png';
import rectangle from '../../../assets/images/rectangle-layout.png';
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
  color: ${(props) => props.theme.color};
  padding: 2px;
`;

const AddFolderModal = ({ isAddFolderModalOpen, setIsAddFolderModalOpen }) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [imageLayout, setImageLayout] = useState('square');
  const [imageFile, setImageFile] = useState({ url: '' });

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
      aspect: imageLayout === 'square' ? [1, 1] : [2, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageFile({ url: result.uri });
    }
  };
  const squareSource =
    imageFile.url && imageLayout === 'square' ? { uri: imageFile.url } : square;
  const rectangleSource =
    imageFile.url && imageLayout === 'rectangle'
      ? { uri: imageFile.url }
      : rectangle;

  const clearFields = () => {
    setTitle('');
    setImageFile({ url: '' });
    setImageLayout('square');
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
      visible={isAddFolderModalOpen}
      onClose={() => {
        clearFields();
        setIsAddFolderModalOpen(false);
      }}
      onSave={onSave}>
      <Flexbox align="flex-start">
        <AnimatedInput
          label={Localized('Title')}
          testID="resource-folder-title-input"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Label style={{ marginTop: 8 }}>{Localized('Layout')}</Label>
        <Flexbox style={{ marginTop: 8 }} justify="flex-start" direction="row">
          <TouchableOpacity onPress={() => setImageLayout('square')}>
            <Flexbox
              width="76px"
              height="106px"
              style={{ width: 76, marginEnd: 20 }}>
              <MiniCard>
                <Image
                  style={{ width: 76, height: 76 }}
                  source={squareSource}
                />
                <Footer>
                  <Title ellipsizeMode="tail" numberOfLines={1}>
                    {imageLayout === 'square' && title
                      ? title
                      : Localized('Title')}
                  </Title>
                </Footer>
              </MiniCard>
              {imageLayout === 'square' && (
                <Underline style={{ marginTop: 8 }} />
              )}
            </Flexbox>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setImageLayout('rectangle')}>
            <Flexbox width="150px" height="106px">
              <MiniCard>
                <Image
                  style={{ width: 152, height: 76 }}
                  source={rectangleSource}
                />
                <Footer>
                  <Title ellipsizeMode="tail" numberOfLines={1}>
                    {imageLayout === 'rectangle' && title
                      ? title
                      : Localized('Title')}
                  </Title>
                </Footer>
              </MiniCard>
              {imageLayout === 'rectangle' && (
                <Underline style={{ marginTop: 8 }} />
              )}
            </Flexbox>
          </TouchableOpacity>
        </Flexbox>
        <Label style={{ marginTop: 8 }}>{Localized('Picture')}</Label>
        <TouchableOpacity onPress={pickImage} style={{ width: '100%' }}>
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
            <Underline />
          </Flexbox>
        </TouchableOpacity>
      </Flexbox>
    </EditModal>
  );
};

AddFolderModal.propTypes = {
  isAddFolderModalOpen: PropTypes.bool.isRequired,
  setIsAddFolderModalOpen: PropTypes.func.isRequired,
};

export default AddFolderModal;
