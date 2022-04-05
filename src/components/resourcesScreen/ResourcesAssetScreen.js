import React, {
  useState,
  // useContext,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions, ScrollView } from 'react-native';
import { ScreenContainer } from '../common';
// import PDFReader from 'rn-pdf-reader-js';
import baseImage from '../../../assets/icons/image.png';
// import AppContext from '../../contexts/AppContext';
import * as ScreenOrientation from 'expo-screen-orientation';

const ResourcesAssetScreen = ({ route }) => {
  // const { theme } = useContext(AppContext);
  const { url, contentType } = route.params;
  const [imageWidth, setImageWidth] = useState(300);
  const [imageHeight, setImageHeight] = useState(150);

  const { width } = Dimensions.get('window');
  const ratio = imageWidth / imageHeight;
  const calculatedHeight = width / ratio;

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  // if (contentType === 'pdf') {
  //   return (
  //     <PDFReader
  //       style={{
  //         backgroundColor: theme.backgroundColor,
  //       }}
  //       webviewStyle={{
  //         backgroundColor: theme.backgroundColor,
  //         marginTop: -4,
  //         marginStart: -4,
  //         padding: 0,
  //       }}
  //       source={{ uri: url ? url : baseImage }}
  //     />
  //   );
  // }
  if (contentType === 'image') {
    Image.getSize(url, (width, height) => {
      setImageWidth(width);
      setImageHeight(height);
    });
    return (
      <ScreenContainer style={{ paddingTop: 0 }}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            height: '100%',
          }}
          minimumZoomScale={1}
          maximumZoomScale={5}
        >
          <Image
            resizeMode={'cover'}
            style={{ width: width, height: calculatedHeight }}
            source={url ? { uri: url } : baseImage}
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
