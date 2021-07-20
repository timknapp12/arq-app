import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H4Book } from '../common';
import { Localized } from '../../translations/Localized';

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

const FilterMenu = ({ onClose, setSortBy, ...props }) => {
  return (
    <Menu {...props}>
      <H4Book style={{ padding: 2 }}>{`${Localized('Sort by')}:`}</H4Book>
      <TouchableContainer>
        <Touchable
          onPress={() => {
            setSortBy('firstName');
            onClose();
          }}>
          <H4Book>{Localized('First Name')}</H4Book>
        </Touchable>
      </TouchableContainer>
      <TouchableContainer>
        <Touchable
          onPress={() => {
            setSortBy('lastName');
            onClose();
          }}>
          <H4Book>{Localized('Last Name')}</H4Book>
        </Touchable>
      </TouchableContainer>
    </Menu>
  );
};

FilterMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default FilterMenu;
