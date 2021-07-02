import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Share,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../../contexts/AppContext';
import { H5Black, H6Book } from '../../common';
import AssetIcon from './AssetIcon';
import CalloutMenu from '../CalloutMenu';
import IconRow from './IconRow';
import UploadAssetModal from '../teamView/UploadAssetModal';
import { downloadFile } from '../../../utils/downloadFile';
import { Localized, initLanguage } from '../../../translations/Localized';
import {
  AssetCardContainer,
  OuterContainer,
  InnerContainer,
  TitleAndDescription,
  IconColumn,
} from './AssetCard.styles';

// TouchableOpacity from react native listens to native events but doesn't handle nested touch events so it is only best in certain situations
// TouchableOpacity (renamed as GestureTouchable) from react-native-gesture-handler does not accept the native touch event but will accept nested touch events
// the two options above are used to handle different use cases depending on desired behavior

const AssetCard = ({
  linkId,
  title,
  description,
  url,
  contentType,
  ext,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  navigation,
  isFavorite,
  folderId,
  isOwner,
  setToastInfo,
  displayOrder,
  selectedTeamName,
  // this prop is passed from ResourceCategoryScreen.js so that on android the touch event doesn't persists through the callout menu to the resource card underneath
  setIsNavDisabled = () => {},
  isNavDisabled,
  ...props
}) => {
  initLanguage();
  const { theme } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  const [isUploadAssetModalOpen, setIsUploadAssetModalOpen] = useState(false);

  const onDownload = async () => {
    const filename = `${title.split(' ').join('')}.${ext ?? ''}`;
    try {
      await downloadFile(url, filename, contentType, setToastInfo);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(false);
    }
    if (isExpanded) {
      setIsCalloutOpen(false);
    }
    return () => {
      setIsCalloutOpen(false);
    };
  }, [isCalloutOpenFromParent, isExpanded]);

  useEffect(() => {
    if (!isCalloutOpen) {
      setIsNavDisabled(false);
    }
  }, [isCalloutOpen]);

  const closeCallout = () => {
    setIsCalloutOpen(false);
    setIsCalloutOpenFromParent(false);
  };

  const onCallout = async (e) => {
    e.stopPropagation();
    if (isCalloutOpen) {
      closeCallout();
    } else if (!isCalloutOpen) {
      await setIsCalloutOpenFromParent(true);
      setIsCalloutOpen(true);
      setIsNavDisabled(true);
    }
    if (!isCalloutOpenFromParent) {
      setIsCalloutOpen(true);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
    closeCallout();
  };

  // TODO: wire this up to the backend with a mutation
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

  const openAsset = () => {
    // when a callout menu item on android is tapped, the touch event bleeds through to the item underneath, causing unwanted events to fire. So this prevents that
    if (Platform.OS === 'android' && isNavDisabled) {
      setIsCalloutOpenFromParent(false);
      setIsNavDisabled(false);
      return;
    }
    closeCallout();
    if (contentType === 'pdf' || contentType === 'image') {
      navigation.navigate('Resources Asset Screen', {
        title: title.toUpperCase(),
        url: url,
        contentType: contentType,
      });
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <AssetCardContainer {...props}>
      <OuterContainer isExpanded={isExpanded}>
        <InnerContainer>
          <AssetIcon
            title={title}
            url={url}
            contentType={contentType}
            navigation={navigation}
            onPress={openAsset}
          />
          <TouchableOpacity style={{ flex: 1 }} onPress={openAsset}>
            <TitleAndDescription>
              <H5Black
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{ marginBottom: 4 }}>
                {title}
              </H5Black>
              {isExpanded ? (
                <H6Book style={{ flex: 1 }}>{description}</H6Book>
              ) : (
                <H6Book
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ flex: 1 }}>
                  {description}
                </H6Book>
              )}
            </TitleAndDescription>
          </TouchableOpacity>
          {isExpanded ? (
            <TouchableOpacity onPress={() => setIsExpanded((state) => !state)}>
              <MaterialCommunityIcon
                name="chevron-up"
                color={theme.primaryTextColor}
                size={24}
              />
            </TouchableOpacity>
          ) : (
            <IconColumn>
              <GestureTouchable
                onPress={() => {
                  setIsExpanded((state) => !state);
                }}>
                <MaterialCommunityIcon
                  name="chevron-down"
                  color={theme.primaryTextColor}
                  size={24}
                />
              </GestureTouchable>
              {isCalloutOpenFromParent ? (
                <GestureTouchable
                  style={{ alignItems: 'center' }}
                  onPress={() => setIsCalloutOpen(false)}>
                  <KebobIcon
                    style={{
                      height: 20,
                      width: 20,
                      color: theme.primaryTextColor,
                    }}
                  />
                </GestureTouchable>
              ) : (
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={(e) => onCallout(e)}>
                  <KebobIcon
                    style={{
                      height: 20,
                      width: 20,
                      color: theme.primaryTextColor,
                    }}
                  />
                </TouchableOpacity>
              )}
            </IconColumn>
          )}
        </InnerContainer>
        {isExpanded && (
          <IconRow
            isFavorite={isFavorite}
            contentType={contentType}
            isOwner={isOwner}
            onShare={onShare}
            onDownload={onDownload}
            onEdit={() => setIsUploadAssetModalOpen(true)}
            onRemove={onRemove}
          />
        )}
      </OuterContainer>
      {/* TODO conditionally render the options in the callout  */}
      {isCalloutOpen && (
        <CalloutMenu
          url={url}
          title={title}
          isFavorite={isFavorite}
          setIsFavorite={() => {}}
          contentType={contentType}
          isOwner={isOwner}
          onShare={onShare}
          onDownload={onDownload}
          closeCallout={closeCallout}
          onEdit={() => setIsUploadAssetModalOpen(true)}
          onRemove={onRemove}
        />
      )}
      {isUploadAssetModalOpen && (
        <UploadAssetModal
          visible={isUploadAssetModalOpen}
          onClose={() => {
            setIsUploadAssetModalOpen(false);
            closeCallout();
          }}
          selectedTeamName={selectedTeamName}
          // These props are passed to populate the corresponding fields in the edit phase of the modal
          editMode
          folderId={folderId}
          linkId={linkId}
          displayOrder={displayOrder}
          assetTitle={title}
          assetDescription={description}
          assetContentType={contentType}
          assetFile={
            contentType === 'image' || contentType === 'pdf'
              ? {
                  url,
                  contentType,
                }
              : { url: '', contentType: '' }
          }
          assetLink={
            contentType === 'video' || contentType === 'podcast' ? url : ''
          }
        />
      )}
    </AssetCardContainer>
  );
};

AssetCard.propTypes = {
  linkId: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  contentType: PropTypes.string,
  ext: PropTypes.string,
  navigation: PropTypes.object,
  /* callout from parent is so that tapping anywhere on the screen will close the callout */
  isCalloutOpenFromParent: PropTypes.bool,
  setIsCalloutOpenFromParent: PropTypes.func,
  isFavorite: PropTypes.bool,
  folderId: PropTypes.number,
  isOwner: PropTypes.bool,
  setToastInfo: PropTypes.func,
  displayOrder: PropTypes.number,
  setIsNavDisabled: PropTypes.func,
  selectedTeamName: PropTypes.string,
  isNavDisabled: PropTypes.bool,
};

export default AssetCard;
