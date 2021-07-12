import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';

// TouchableOpacity from react native listens to native events but doesn't handle nested touch events so it is only best in certain situations
// TouchableOpacity (renamed as GestureTouchable) from react-native-gesture-handler does not accept the native touch event but will accept nested touch events
// the two options above are used to handle different use cases depending on desired behavior

const containerHeight = 224;
const footerHeight = 48;

// this will make the image a 2 x 1 ratio with taking padding into account
const { width } = Dimensions.get('window');
const imageHeight = width / 2 - 20;

export const CardContainer = styled.View`
  flex: ${(props) => (props.isWideLayout ? '0 1 100%' : '0 1 48%')};
  /* height: ${containerHeight}px; */
  margin-bottom: 20px;
  border-radius: 5px;
`;

CardContainer.propTypes = {
  isWideLayout: PropTypes.bool,
};

export const CardImage = styled.Image`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: ${imageHeight}px;
`;

export const CardFooter = styled.View`
  height: ${footerHeight}px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 8px;
`;

export const ResourceCallout = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: ${containerHeight}px;
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
export const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;
