import React, { useState, useEffect } from 'react';
import { Alert, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { CameraIcon, GalleryIcon } from '../Common';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const ImageContainer = styled.View`
  height: 72px;
  width: 72px;
  position: relative;
`;

const Avatar = styled.Image`
  height: 72px;
  width: 72px;
  border-radius: 36px;
  margin-bottom: 8px;
`;

const DefaultFiller = styled.View`
  border-radius: 36px;
  height: 100%;
  width: 100%;
  background-color: grey;
  justify-content: center;
  align-items: center;
`;

const Initials = styled.Text`
  font-family: 'Nunito-Black';
  font-size: 48px;
  color: ${(props) => props.theme.color};
`;

const CameraButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const CameraButton = styled.TouchableOpacity`
  justify-content: center;
  background-color: ${(props) => props.theme.headerBackgroundColor};
  border-radius: 12px;
`;

const ProfileImage = ({
  handleChange,
  image,
  setIsSaveButtonVisisble,
  initials = '',
  setIsNewImageSelected,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  // permissions for camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // permissions for photo library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work!',
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      handleChange('image', {
        ...image,
        url: result.uri,
      });
      setIsSaveButtonVisisble(true);
      setIsNewImageSelected(true);
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      handleChange('image', {
        ...image,
        url: result.uri,
      });
      setIsSaveButtonVisisble(true);
      setIsNewImageSelected(true);
    }
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return Alert.alert('No access to camera');
  }
  return (
    <ImageContainer>
      {image.url ? (
        <Avatar source={{ uri: image.url }} />
      ) : (
        <DefaultFiller>
          <Initials>{initials}</Initials>
        </DefaultFiller>
      )}
      <CameraButtonsView>
        <CameraButton onPress={openCamera}>
          <CameraIcon />
        </CameraButton>
        <CameraButton onPress={pickImage}>
          <GalleryIcon />
        </CameraButton>
      </CameraButtonsView>
    </ImageContainer>
  );
};

ProfileImage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  setIsSaveButtonVisisble: PropTypes.func.isRequired,
  initials: PropTypes.string,
  setIsNewImageSelected: PropTypes.func.isRequired,
};

export default ProfileImage;
