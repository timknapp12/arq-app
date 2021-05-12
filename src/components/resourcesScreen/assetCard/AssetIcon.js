import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import PdfIcon from '../../../../assets/icons/pdf-icon.svg';
import VideoIcon from '../../../../assets/icons/video-icon.svg';
import PodcastIcon from '../../../../assets/icons/podcast-icon.svg';
import ImageIcon from '../../../../assets/icons/image-icon.svg';
import AppContext from '../../../contexts/AppContext';

const AssetIcon = ({ contentType, onPress }) => {
  const { theme } = useContext(AppContext);

  return (
    <View>
      {contentType === 'pdf' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity onPress={onPress}>
            <PdfIcon
              style={{
                color: theme.primaryTextColor,
                height: 34,
                width: 34,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {contentType === 'video' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity onPress={onPress}>
            <VideoIcon
              style={{
                color: theme.primaryTextColor,
                height: 34,
                width: 34,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {contentType === 'podcast' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity onPress={onPress}>
            <PodcastIcon
              style={{
                color: theme.primaryTextColor,
                height: 34,
                width: 34,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {contentType === 'image' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity onPress={onPress}>
            <ImageIcon
              style={{
                color: theme.primaryTextColor,
                height: 34,
                width: 34,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

AssetIcon.propTypes = {
  contentType: PropTypes.string,
  onPress: PropTypes.func,
};

export default AssetIcon;
