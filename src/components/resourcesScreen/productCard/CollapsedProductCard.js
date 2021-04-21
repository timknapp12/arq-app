import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H5Black, H6Book } from '../../common';
import KebobIcon from '../../../../assets/icons/kebob-icon.svg';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../../contexts/AppContext';
import CalloutMenu from '../CalloutMenu';

// TouchableOpacity from react native listens to native events but doesn't handle nested touch events so it is only best in certain situations
// TouchableOpacity (renamed as GestureTouchable) from react-native-gesture-handler does not accept the native touch event but will accept nested touch events
// the two options above are used to handle different use cases depending on desired behavior

const Container = styled.View`
  width: 100%;
`;

const OuterContainer = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 6px 0;
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
  isDownloaded,
  hasPermissions,
  onShare,
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
                <H5Black style={{ marginBottom: 4 }}>{title}</H5Black>
                <H6Book
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ flex: 1 }}>
                  {description}
                </H6Book>
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
        </InnerContainer>
      </OuterContainer>
      {isCalloutOpen && (
        <CalloutMenu
          url={url}
          title={title}
          isFavorite={isFavorite}
          setIsFavorite={() => {}}
          isDownloaded={isDownloaded}
          setIsDownloaded={() => {}}
          hasPermissions={hasPermissions}
          onShare={onShare}
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
  isDownloaded: PropTypes.bool,
  hasPermissions: PropTypes.bool,
  onShare: PropTypes.func,
};

export default CollapsedProductCard;
