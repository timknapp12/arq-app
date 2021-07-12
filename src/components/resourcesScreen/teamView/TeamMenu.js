import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { H4Book, H4Black } from '../../common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Localized } from '../../../translations/Localized';

const SideMenu = styled.View`
  z-index: -1;
  position: absolute;
  align-items: flex-start;
  top: 0;
  background-color: ${(props) => props.theme.sideMenuBackground};
  padding: 18px;
`;

const TouchableContainer = styled.View`
  width: 100%;
`;

const Touchable = styled(TouchableOpacity)`
  padding: 2px;
`;

const Menu = Animated.createAnimatedComponent(SideMenu);

const TeamMenu = ({
  items,
  onClose,
  setIsAccessCodeModalOpen,
  onSelect,
  setIsNewAccessCode,
  hasPermissions,
  userHasAlreadyCreatedATeam,
  ...props
}) => {
  return (
    <Menu {...props}>
      {items.map((item) => (
        <TouchableContainer key={item.teamAccessId}>
          <Touchable
            onPress={() => {
              onSelect(item.teamName);
              onClose();
            }}>
            <H4Book>{item.teamName}</H4Book>
          </Touchable>
        </TouchableContainer>
      ))}
      <Touchable
        style={{ marginTop: 16, flexDirection: 'row' }}
        onPress={() => {
          setIsNewAccessCode(false);
          setIsAccessCodeModalOpen(true);
          onClose();
        }}>
        <H4Book>{Localized('Add Team Access Code')}</H4Book>
        <H4Black> +</H4Black>
      </Touchable>
      {hasPermissions && !userHasAlreadyCreatedATeam && (
        <Touchable
          style={{ flexDirection: 'row' }}
          onPress={() => {
            setIsNewAccessCode(true);
            setIsAccessCodeModalOpen(true);
            onClose();
          }}>
          <H4Book>{Localized('Create Team Access Code')}</H4Book>
          <H4Black> +</H4Black>
        </Touchable>
      )}
    </Menu>
  );
};

TeamMenu.propTypes = {
  items: PropTypes.array,
  onClose: PropTypes.func,
  setIsAccessCodeModalOpen: PropTypes.func,
  onSelect: PropTypes.func,
  setIsNewAccessCode: PropTypes.func,
  hasPermissions: PropTypes.bool,
  userHasAlreadyCreatedATeam: PropTypes.bool,
};

export default TeamMenu;
