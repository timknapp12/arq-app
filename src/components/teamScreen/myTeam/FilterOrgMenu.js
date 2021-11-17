import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../../menu/Menu';
import { Localized } from '../../../translations/Localized';

const FilterOrgMenu = ({ onClose, setSortBy, ...props }) => {
  const items = [
    {
      id: 0,
      title: Localized('My Ambassadors'),
      onPress: () => {
        setSortBy('AMBASSADOR');
        onClose();
      },
    },
    {
      id: 1,
      title: Localized('My Customers'),
      onPress: () => {
        setSortBy('PREFERRED');
        onClose();
      },
    },
    {
      id: 2,
      title: Localized('My Organization'),
      onPress: () => {
        setSortBy('ORGANIZATION');
        onClose();
      },
    },
  ];
  return <Menu {...props} items={items} />;
};

FilterOrgMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default FilterOrgMenu;
