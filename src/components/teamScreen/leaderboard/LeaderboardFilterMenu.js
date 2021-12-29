import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../../menu/Menu';
import { Localized } from '../../../translations/Localized';

const LeaderboardFilterMenu = ({ onClose, setSortBy, ...props }) => {
  const menuItems = [
    {
      id: 0,
      title: Localized('Ambassador Enrollments'),
      onPress: () => {
        setSortBy('Ambassador Enrollments');
        onClose();
      },
    },
    {
      id: 1,
      title: Localized('PC Enrollments'),
      onPress: () => {
        setSortBy('PC Enrollments');
        onClose();
      },
    },
    {
      id: 2,
      title: Localized('Event Tickets'),
      onPress: () => {
        setSortBy('Event Tickets');
        onClose();
      },
    },
  ];

  return <Menu {...props} items={menuItems} />;
};

LeaderboardFilterMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default LeaderboardFilterMenu;
