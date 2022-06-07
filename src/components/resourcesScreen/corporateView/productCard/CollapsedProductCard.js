import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Analytics from 'expo-firebase-analytics';
import { H5, H6Secondary } from '../../../common';
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
  isExpanded,
  setIsExpanded,
  isCalloutOpenFromParent,
  isCalloutOpen,
  setIsCalloutOpen,
  onCallout,
  onShare,
  onDownload,
  onSend,
  onLeadCapture,
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
                Analytics.logEvent('product_card_opened');
              }}
            >
              <View style={{ height: '100%' }}>
                <H5
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ marginBottom: 4, flex: 1 }}
                >
                  {title}
                </H5>
                <H6Secondary
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ flex: 1 }}
                >
                  {description}
                </H6Secondary>
              </View>
            </GestureTouchable>
          </TitleAndDescription>
          <IconColumn>
            <GestureTouchable
              style={{
                paddingStart: 12,
                paddingEnd: 4,
              }}
              onPress={() => {
                setIsExpanded((state) => !state);
              }}
            >
              <MaterialCommunityIcon
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                color={theme.primaryTextColor}
                size={24}
              />
            </GestureTouchable>
            {isCalloutOpenFromParent ? (
              <GestureTouchable
                style={{
                  alignItems: 'center',
                  paddingBottom: 6,
                  paddingStart: 12,
                  paddingEnd: 5,
                }}
                onPress={() => setIsCalloutOpen(false)}
              >
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
                style={{
                  alignItems: 'center',
                  paddingBottom: 6,
                  paddingStart: 12,
                  paddingEnd: 5,
                }}
                onPress={(e) => onCallout(e)}
              >
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
          title={title}
          onShare={() => {
            onShare();
            Analytics.logEvent('share_product_by_drpdwn_menu');
          }}
          onDownload={() => {
            onDownload();
            Analytics.logEvent('dwnld_product_by_drpdwn_menu');
          }}
          onSend={() => {
            onSend();
            Analytics.logEvent('send2prospect_product_by_drpdwn_menu');
          }}
          onLeadCapture={() => {
            onLeadCapture();
            Analytics.logEvent('lead_capt_product_by_drpdwn_menu');
          }}
        />
      )}
    </Container>
  );
};

CollapsedProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  navigation: PropTypes.object,
  isExpanded: PropTypes.bool,
  setIsExpanded: PropTypes.func,
  isCalloutOpenFromParent: PropTypes.bool,
  isCalloutOpen: PropTypes.bool,
  setIsCalloutOpen: PropTypes.func,
  onCallout: PropTypes.func,
  onShare: PropTypes.func,
  onDownload: PropTypes.func,
  onSend: PropTypes.func,
  onLeadCapture: PropTypes.func,
};

export default CollapsedProductCard;
