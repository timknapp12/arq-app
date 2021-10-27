import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H4Book } from '../../common';
import { Localized } from '../../../translations/Localized';

const SideMenu = styled.View`
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

const FilterOrgMenu = ({ onClose, setSortBy, ...props }) => {
  return (
    <Menu {...props}>
      <TouchableContainer>
        <Touchable
          onPress={() => {
            setSortBy('ambassadors');
            onClose();
          }}
        >
          <H4Book>{Localized('My Ambassadors')}</H4Book>
        </Touchable>
      </TouchableContainer>
      <TouchableContainer>
        <Touchable
          onPress={() => {
            setSortBy('customers');
            onClose();
          }}
        >
          <H4Book>{Localized('My Customers')}</H4Book>
        </Touchable>
      </TouchableContainer>
    </Menu>
  );
};

FilterOrgMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default FilterOrgMenu;
