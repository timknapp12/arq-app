import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H4Black, RadioButton, CloseIcon, Flexbox } from '../../common';
import { filterAssetDownloadOptions } from '../../../utils/filterAssetDownloadOptions/filterAssetDownloadOtions';
import { Localized } from '../../../translations/Localized';

const Container = styled.View`
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: ${(props) => props.theme.dropShadow};
  padding: 12px;
  min-width: 180px;
  border-radius: 2px;
  position: absolute;
  right: 4px;
  top: 64px;
`;

const translateLabel = (contentType) => {
  if (contentType === 'image') {
    return Localized('Image');
  }
  if (contentType === 'pdf') {
    return Localized('Document');
  }
  if (contentType === 'video') {
    return Localized('Video');
  }
  if (contentType === 'podcast') {
    return Localized('Podcast');
  } else return '';
};

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)`
  padding: 4px 10px;
`;

const MultiAssetMenu = ({ title, options, onPress, onClose }) => {
  const filteredOptions =
    title === Localized('Download')
      ? filterAssetDownloadOptions(options)
      : options;
  const [selectedAsset, setSelectedAsset] = useState(filteredOptions?.[0]);

  return (
    <Container>
      <Flexbox align="flex-end">
        <CalloutButton onPress={onClose}>
          <CloseIcon />
        </CalloutButton>
      </Flexbox>
      {filteredOptions.map((item) => (
        <RadioButton
          onPress={() => setSelectedAsset(item)}
          key={item?.linkId}
          label={translateLabel(item?.contentType)}
          isSelected={item?.linkId === selectedAsset.linkId}
        />
      ))}
      <CalloutButton onPress={() => onPress(selectedAsset)}>
        <H4Black style={{ textAlign: 'center', marginTop: 6 }}>{title}</H4Black>
      </CalloutButton>
    </Container>
  );
};

MultiAssetMenu.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
};

export default MultiAssetMenu;
