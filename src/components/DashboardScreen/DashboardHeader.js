import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Header from '../Header';
import {
  H2Normal,
  Flexbox,
  SmallQIcon,
  BellIcon,
  AccountIcon,
} from '../Common';
import { Localized, init } from '../../Translations/Localized';

const DashboardHeader = ({ badgeValue, fadeIn, fadeOut, isMenuOpen }) => {
  init();
  const toggleMenu = () => {
    if (isMenuOpen) {
      fadeOut();
    } else {
      fadeIn();
    }
  };
  return (
    <Header>
      <Flexbox width="60px" align="flex-start">
        <SmallQIcon />
      </Flexbox>
      <H2Normal>{Localized('dashboard')}</H2Normal>
      <Flexbox width="60px" direction="row">
        <BellIcon badgeValue={badgeValue} />
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}>
          <AccountIcon />
        </TouchableOpacity>
      </Flexbox>
    </Header>
  );
};

DashboardHeader.propTypes = {
  badgeValue: PropTypes.number,
  toggleMenu: PropTypes.func,
  fadeIn: PropTypes.func,
  fadeOut: PropTypes.func,
  isMenuOpen: PropTypes.bool,
};

export default DashboardHeader;
