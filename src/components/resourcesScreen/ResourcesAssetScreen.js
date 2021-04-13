import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions, ScrollView } from 'react-native';
import { ScreenContainer } from '../common';
import PDFReader from 'rn-pdf-reader-js';
import AppContext from '../../contexts/AppContext';

const ResourcesAssetScreen = ({ route }) => {
  const { theme } = useContext(AppContext);
  const { url, contentType } = route.params;
  const [imageWidth, setImageWidth] = useState(300);
  const [imageHeight, setImageHeight] = useState(150);

  const { width } = Dimensions.get('window');
  const ratio = imageWidth / imageHeight;
  const calculatedHeight = width / ratio;

  if (contentType === 'pdf') {
    return (
      <PDFReader
        webviewStyle={{ backgroundColor: theme.backgroundColor }}
        source={{ uri: url }}
      />
    );
  }
  if (contentType === 'image') {
    Image.getSize(url, (width, height) => {
      setImageWidth(width);
      setImageHeight(height);
    });
    return (
      <ScreenContainer>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            height: '100%',
          }}
          minimumZoomScale={1}
          maximumZoomScale={5}>
          <Image
            resizeMode={'cover'}
            style={{ width: width, height: calculatedHeight }}
            source={{ uri: url }}
          />
        </ScrollView>
      </ScreenContainer>
    );
  }
};
ResourcesAssetScreen.propTypes = {
  route: PropTypes.object,
};
export default ResourcesAssetScreen;
