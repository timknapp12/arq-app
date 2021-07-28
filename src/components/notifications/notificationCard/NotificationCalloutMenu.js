import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import { H4Book } from '../../common';
import RemoveIcon from '../../../../assets/icons/remove-icon.svg';
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
  top: 64px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

// The TouchableOpacity from react native works on ios and the TouchableOpacity from react-native-gesture-hanlder works on android
const CalloutButton = styled(
  Platform.OS === 'ios' ? TouchableOpacity : GestureTouchable,
)``;

const Row = styled.View`
  flex-direction: row;
`;

const NotificationCalloutMenu = ({
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
    <Container {...props}>
      <CalloutButton onPress={onRemove}>
        <Row>
          <RemoveIcon style={iconStyle} />
          <H4Book>{Localized('Clear')}</H4Book>
        </Row>
      </CalloutButton>
      <CalloutButton onPress={handlePin}>
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
      <CalloutButton onPress={onViewProspect}>
        <Row>
          <ViewProspectIcon style={iconStyle} />
          <H4Book>{Localized('View Prospect')}</H4Book>
        </Row>
      </CalloutButton>
    </Container>
  );
};

NotificationCalloutMenu.propTypes = {
  onRemove: PropTypes.func.isRequired,
  handlePin: PropTypes.func.isRequired,
  onViewProspect: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default NotificationCalloutMenu;
