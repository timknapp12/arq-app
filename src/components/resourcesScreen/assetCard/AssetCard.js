import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Share, Alert, Linking } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../../contexts/AppContext';
import { H5Black, H6Book } from '../../common';
import AssetIcon from './AssetIcon';
import CalloutMenu from '../CalloutMenu';
import IconRow from './IconRow';
import { downloadFile } from '../../../utils/downloadFile';

// TouchableOpacity from react native listens to native events but doesn't handle nested touch events so it is only best in certain situations
// TouchableOpacity (renamed as GestureTouchable) from react-native-gesture-handler does not accept the native touch event but will accept nested touch events
// the two options above are used to handle different use cases depending on desired behavior

const AssetCardContainer = styled.View`
  width: 100%;
`;

const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 4px 0;
  border-radius: 5px;
  margin-bottom: 10px;
  height: ${(props) => (props.isExpanded ? 'auto' : '60px')};
  overflow: hidden;
`;

const InnerContainer = styled.View`
  width: 100%;
  padding: 0 6px;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleAndDescription = styled.View`
  flex: 1;
  padding: 4px 0;
`;

const IconColumn = styled.View`
  height: 50px;
  justify-content: space-between;
`;

const AssetCard = ({
  title,
  description,
  url,
  contentType,
  ext,
  isCalloutOpenFromParent,
  setIsCalloutOpenFromParent,
  navigation,
  isFavorite,
  hasPermissions,
  setToastInfo,
  ...props
}) => {
  const { theme } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);

  const download = async () => {
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

  const closeCallout = () => {
    setIsCalloutOpen(false);
    setIsCalloutOpenFromParent(false);
  };

  const onCallout = async (e) => {
    e.stopPropagation();
    if (isCalloutOpen) {
      closeCallout();
    }
    if (!isCalloutOpen) {
      await setIsCalloutOpenFromParent(true);
      setIsCalloutOpen(true);
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

  const openAsset = () => {
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
              <H5Black style={{ marginBottom: 4 }}>{title}</H5Black>
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
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                color={theme.activeTint}
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
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  color={theme.activeTint}
                  size={24}
                />
              </GestureTouchable>
              {isCalloutOpenFromParent ? (
                <GestureTouchable
                  style={{ alignItems: 'center' }}
                  onPress={() => setIsCalloutOpen(false)}>
                  <KebobIcon
                    style={{ height: 20, width: 20, color: theme.activeTint }}
                  />
                </GestureTouchable>
              ) : (
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={(e) => onCallout(e)}>
                  <KebobIcon
                    style={{ height: 20, width: 20, color: theme.activeTint }}
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
            onShare={onShare}
            download={download}
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
          hasPermissions={hasPermissions}
          onShare={onShare}
          download={download}
          closeCallout={closeCallout}
        />
      )}
    </AssetCardContainer>
  );
};

AssetCard.propTypes = {
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
  hasPermissions: PropTypes.bool,
  setToastInfo: PropTypes.func,
};

export default AssetCard;
