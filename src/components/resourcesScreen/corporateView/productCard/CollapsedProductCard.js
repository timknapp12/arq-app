import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H5, H6Secodnary } from '../../../common';
import KebobIcon from '../../../../../assets/icons/kebob-icon.svg';
import AppContext from '../../../../contexts/AppContext';
import CalloutMenu from '../../CalloutMenu';
import {
  Container,
  OuterContainer,
  InnerContainer,
  TitleAndDescription,
  IconColumn,
} from './CollapsedProductCard.styles';

// TouchableOpacity from react native listens to native events but doesn't handle nested touch events so it is only best in certain situations
// TouchableOpacity (renamed as GestureTouchable) from react-native-gesture-handler does not accept the native touch event but will accept nested touch events
// the two options above are used to handle different use cases depending on desired behavior

const CollapsedProductCard = ({
  title,
  description,
  url,
  isExpanded,
  setIsExpanded,
  isCalloutOpenFromParent,
  isCalloutOpen,
  setIsCalloutOpen,
  onCallout,
  isFavorite,
  onShare,
  onDownload,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  return (
    <Container {...props}>
      <OuterContainer isExpanded={isExpanded}>
        <InnerContainer>
          <View style={{ width: 30 }} />
          <TitleAndDescription>
            <GestureTouchable
              containerStyle={{ flex: 1 }}
              onPress={() => {
                setIsExpanded(true);
              }}>
              <View style={{ height: '100%' }}>
                <H5
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ marginBottom: 4, flex: 1 }}>
                  {title}
                </H5>
                <H6Secodnary
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ flex: 1 }}>
                  {description}
                </H6Secodnary>
              </View>
            </GestureTouchable>
          </TitleAndDescription>
          <IconColumn>
            <GestureTouchable
              onPress={() => {
                setIsExpanded((state) => !state);
              }}>
              <MaterialCommunityIcon
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
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
        </InnerContainer>
      </OuterContainer>
      {isCalloutOpen && (
        <CalloutMenu
          url={url}
          title={title}
          isFavorite={isFavorite}
          setIsFavorite={() => {}}
          onShare={onShare}
          onDownload={onDownload}
        />
      )}
    </Container>
  );
};

CollapsedProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  navigation: PropTypes.object,
  isExpanded: PropTypes.bool,
  setIsExpanded: PropTypes.func,
  isCalloutOpenFromParent: PropTypes.bool,
  isCalloutOpen: PropTypes.bool,
  setIsCalloutOpen: PropTypes.func,
  onCallout: PropTypes.func,
  isFavorite: PropTypes.bool,
  onShare: PropTypes.func,
  onDownload: PropTypes.func,
};

export default CollapsedProductCard;
