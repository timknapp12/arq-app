import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { CameraIcon, GalleryIcon } from '../common';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Localized } from '../../translations/Localized';

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
  background-color: ${(props) => props.theme.disabledTextColor};
  justify-content: center;
  align-items: center;
`;

const Initials = styled.Text`
  font-family: 'Avenir-Heavy';
  font-size: 30px;
  color: ${(props) => props.theme.primaryTextColor};
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
  profileUrl,
  handleChange,
  fieldName,
  setIsSaveButtonVisisble,
  initials = '',
  setIsNewImageSelected,
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasPhotosPermissions, setHasPhotosPermissions] = useState(null);
  // permissions for camera
  const getCameraPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      return setHasCameraPermission(true);
    }
    if (status !== 'granted') {
      Alert.alert(
        Localized('Sorry, we need camera roll permissions to make this work!'),
        Localized(
          'Please go to settings on your device and enable permissions to access your camera',
        ),
      );
      setHasCameraPermission(false);
    }
  };
  useEffect(() => {
    getCameraPermissions();
  }, []);

  // permissions for photo library
  const getPhotoPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      return setHasPhotosPermissions(true);
    }
    if (status !== 'granted') {
      Alert.alert(
        Localized('Sorry, we need camera roll permissions to make this work!'),
        Localized(
          'Please go to settings on your device and enable permissions to access your photos',
        ),
      );
      setHasPhotosPermissions(false);
    }
  };

  useEffect(() => {
    getPhotoPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      handleChange(fieldName, result.uri);
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
      handleChange(fieldName, result.uri);
      setIsSaveButtonVisisble(true);
      setIsNewImageSelected(true);
    }
  };

  return (
    <ImageContainer>
      {profileUrl ? (
        <Avatar source={{ uri: profileUrl }} />
      ) : (
        <DefaultFiller>
          <Initials>{initials}</Initials>
        </DefaultFiller>
      )}
      <CameraButtonsView>
        {hasCameraPermission && (
          <CameraButton onPress={openCamera}>
            <CameraIcon />
          </CameraButton>
        )}
        {hasPhotosPermissions && (
          <CameraButton onPress={pickImage}>
            <GalleryIcon />
          </CameraButton>
        )}
      </CameraButtonsView>
    </ImageContainer>
  );
};

ProfileImage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  profileUrl: PropTypes.string,
  fieldName: PropTypes.string,
  setIsSaveButtonVisisble: PropTypes.func.isRequired,
  initials: PropTypes.string,
  setIsNewImageSelected: PropTypes.func.isRequired,
};

export default ProfileImage;
