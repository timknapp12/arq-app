import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  TouchableOpacity,
  Dimensions,
  View,
  Platform,
  Alert,
} from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import baseImage from '../../../assets/icons/image.png';
import KebobIcon from '../../../assets/icons/kebob-icon.svg';
import RemoveIcon from '../../../assets/icons/remove-icon.svg';
import UploadIcon from '../../../assets/icons/upload-icon.svg';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import AppContext from '../../contexts/AppContext';
import { H6, H4Book, Flexbox } from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import AddFolderModal from './AddFolderModal';
import UploadAssetModal from './UploadAssetModal';

// TouchableOpacity from react native listens to native events but doesn't handle nested touch events so it is only best in certain situations
// TouchableOpacity (renamed as GestureTouchable) from react-native-gesture-handler does not accept the native touch event but will accept nested touch events
// the two options above are used to handle different use cases depending on desired behavior

const containerHeight = 224;
const footerHeight = 48;

// this will make the image a 2 x 1 ratio with taking padding into account
const { width } = Dimensions.get('window');
const imageHeight = width / 2 - 20;

const CardContainer = styled.View`
  flex: ${(props) => (props.isWideLayout ? '0 1 100%' : '0 1 48%')};
  /* height: ${containerHeight}px; */
  margin-bottom: 20px;
  border-radius: 5px;
`;

CardContainer.propTypes = {
  isWideLayout: PropTypes.bool,
};

const CardImage = styled.Image`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: ${imageHeight}px;
`;

const CardFooter = styled.View`
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

const ResourceCallout = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: ${containerHeight}px;
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;

const ResourceCard = ({
  url,
  isWideLayout = true,
  title,
  onPress,
  hasPermissions,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  // this prop is passed from TeamView.js so that on android the touch event doesn't persists through the callout menu to the resource card underneath
  setIsNavDisabled = () => {},
  ...props
}) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isUploadAssetModalOpen, setIsUploadAssetModalOpen] = useState(false);

  useEffect(() => {
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(false);
    }
    return () => {
      setIsCalloutOpen(false);
    };
  }, [isCalloutOpenFromParent]);

  useEffect(() => {
    if (!isCalloutOpen) {
      setIsNavDisabled(false);
    }
  }, [isCalloutOpen]);

  const closeCallout = () => {
    setIsCalloutOpen(false);
    setIsCalloutOpenFromParent(false);
  };

  const onCallout = async () => {
    if (isCalloutOpen) {
      closeCallout();
    } else if (!isCalloutOpen) {
      await setIsCalloutOpenFromParent(true);
      setIsCalloutOpen(true);
      setIsNavDisabled(true);
    }
    if (isCalloutOpenFromParent) {
      setIsCalloutOpenFromParent(false);
    } else if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(true);
      setIsNavDisabled(true);
    }
  };

  const onRemove = () =>
    Alert.alert(
      `${Localized('Remove')} "${title}"?`,
      Localized(
        'Removing this will delete all of its content. Do you wish to continue?',
      ),
      [
        {
          text: Localized('Cancel'),
          onPress: () => {
            closeCallout();
          },
          style: 'cancel',
        },
        {
          text: Localized('Yes'),
          onPress: () => {
            closeCallout();
            console.log('Yes Pressed');
          },
        },
      ],
      { cancelable: false },
    );

  return (
    <CardContainer isWideLayout={isWideLayout} {...props}>
      <TouchableOpacity onPress={onPress}>
        <CardImage source={{ uri: url }} defaultSource={baseImage} />
      </TouchableOpacity>

      <CardFooter>
        <TouchableOpacity
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={onPress}>
          <H6>{title}</H6>
        </TouchableOpacity>

        {hasPermissions && (
          <View>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={onCallout}>
              <KebobIcon
                style={{ height: 20, width: 20, color: theme.activeTint }}
              />
            </TouchableOpacity>
          </View>
        )}
      </CardFooter>
      {/* TODO conditionally render the options in the callout  */}
      {isCalloutOpen && (
        <ResourceCallout>
          <CalloutButton
            onPress={() => {
              setIsAddFolderModalOpen(true);
            }}>
            <Flexbox direction="row" justify="flex-start">
              <EditIcon
                style={{
                  marginEnd: 8,
                  height: 24,
                  width: 24,
                  color: theme.activeTint,
                }}
              />
              <H4Book>{Localized('Edit')}</H4Book>
            </Flexbox>
          </CalloutButton>
          <CalloutButton onPress={() => setIsUploadAssetModalOpen(true)}>
            <Flexbox direction="row" justify="flex-start">
              <UploadIcon
                style={{
                  marginEnd: 8,
                  height: 24,
                  width: 24,
                  color: theme.activeTint,
                }}
              />
              <H4Book>{Localized('Upload')}</H4Book>
            </Flexbox>
          </CalloutButton>
          <CalloutButton onPress={onRemove}>
            <Flexbox direction="row" justify="flex-start">
              <RemoveIcon
                style={{
                  marginEnd: 8,
                  height: 24,
                  width: 24,
                  color: theme.activeTint,
                }}
              />
              <H4Book>{Localized('Remove')}</H4Book>
            </Flexbox>
          </CalloutButton>
        </ResourceCallout>
      )}
      {isAddFolderModalOpen && (
        <AddFolderModal
          visible={isAddFolderModalOpen}
          onClose={() => {
            setIsAddFolderModalOpen(false);
            closeCallout();
          }}
          editMode
          folderTitle={title}
          folderUrl={url}
          folderIsWideLayout={isWideLayout}
        />
      )}
      {isUploadAssetModalOpen && (
        <UploadAssetModal
          visible={isUploadAssetModalOpen}
          onClose={() => {
            setIsUploadAssetModalOpen(false);
            closeCallout();
          }}
        />
      )}
    </CardContainer>
  );
};

ResourceCard.propTypes = {
  title: PropTypes.string,
  isWideLayout: PropTypes.bool,
  url: PropTypes.string,
  onPress: PropTypes.func,
  hasPermissions: PropTypes.bool,
  /* callout from parent is so that tapping anywhere on the screen will close the callout */
  isCalloutOpenFromParent: PropTypes.bool,
  setIsCalloutOpenFromParent: PropTypes.func,
  setIsNavDisabled: PropTypes.func,
};

export default ResourceCard;
