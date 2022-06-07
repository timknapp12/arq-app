import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import * as Analytics from 'expo-firebase-analytics';
import { H4Book } from '../../common';
import TrashCanIcon from '../../../../assets/icons/TrashCanIcon.svg';
import PinIcon from '../../../../assets/icons/pin-icon.svg';
import UnpinIcon from '../../../../assets/icons/UnpinIcon.svg';
import ViewProspectIcon from '../../../../assets/icons/ShowAllIcon.svg';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';

const Container = styled.View`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: ${(props) => `${props.cardHeight - 6}px`};
  box-shadow: ${(props) => props.theme.dropShadow};
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;

const Row = styled.View`
  flex-direction: row;
`;

const NotificationCalloutMenu = ({
  cardHeight,
  onRemove,
  handlePin,
  onViewProspect,
  isSaved,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  const iconStyle = {
    marginEnd: 8,
    height: 24,
    width: 24,
    color: theme.primaryTextColor,
  };
  return (
    <Container cardHeight={cardHeight} {...props}>
      <CalloutButton
        onPress={() => {
          onRemove();
          Analytics.logEvent('Remove_notification_from_dropdown');
        }}
      >
        <Row>
          <TrashCanIcon style={iconStyle} />
          <H4Book>{Localized('Remove')}</H4Book>
        </Row>
      </CalloutButton>
      <CalloutButton
        onPress={() => {
          handlePin();
          Analytics.logEvent(
            `${isSaved ? 'Unpin' : 'Pin'}_notification_from_dropdown`,
          );
        }}
      >
        {isSaved ? (
          <Row>
            <UnpinIcon style={iconStyle} />
            <H4Book>{Localized('Unpin')}</H4Book>
          </Row>
        ) : (
          <Row>
            <PinIcon style={iconStyle} />
            <H4Book>{Localized('Pin')}</H4Book>
          </Row>
        )}
      </CalloutButton>
      <CalloutButton
        onPress={() => {
          onViewProspect();
          Analytics.logEvent('View_prospect_from_dropdown');
        }}
      >
        <Row>
          <ViewProspectIcon style={iconStyle} />
          <H4Book>{Localized('View Prospect')}</H4Book>
        </Row>
      </CalloutButton>
    </Container>
  );
};

NotificationCalloutMenu.propTypes = {
  cardHeight: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  handlePin: PropTypes.func.isRequired,
  onViewProspect: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default NotificationCalloutMenu;
