import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Linking } from 'react-native';
import PdfIcon from '../../../../assets/icons/pdf-icon.svg';
import VideoIcon from '../../../../assets/icons/video-icon.svg';
import PodcastIcon from '../../../../assets/icons/podcast-icon.svg';
import ImageIcon from '../../../../assets/icons/image-icon.svg';
import AppContext from '../../../contexts/AppContext';

const AssetIcon = ({ title, url, contentType, navigation }) => {
  const { theme } = useContext(AppContext);

  return (
    <View>
      {contentType === 'pdf' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Resources Asset Screen', {
                title: title.toUpperCase(),
                url: url,
                contentType: contentType,
              })
            }>
            <PdfIcon
              style={{
                color: theme.activeTint,
                height: 34,
                width: 34,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {contentType === 'video' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <VideoIcon
              style={{
                color: theme.activeTint,
                height: 34,
                width: 34,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {contentType === 'podcast' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <PodcastIcon
              style={{
                color: theme.activeTint,
                height: 34,
                width: 34,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {contentType === 'image' && (
        <View style={{ marginStart: -4, paddingEnd: 4 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Resources Asset Screen', {
                title: title.toUpperCase(),
                url: url,
                contentType: contentType,
              })
            }>
            <ImageIcon
              style={{
                color: theme.activeTint,
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
  title: PropTypes.string,
  url: PropTypes.string,
  contentType: PropTypes.string,
  navigation: PropTypes.object,
};

export default AssetIcon;
