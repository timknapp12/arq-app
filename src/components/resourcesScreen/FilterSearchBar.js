import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import AppContext from '../../contexts/AppContext';
import { Flexbox } from '../common';

const FilterSearchBar = ({ children }) => {
  const { theme } = useContext(AppContext);
  return (
    <Flexbox direction="row" padding={4} style={{ zIndex: -1 }}>
      {children}
      <SearchIcon
        style={{ height: 36, width: 36, color: theme.primaryTextColor }}
      />
    </Flexbox>
  );
};

FilterSearchBar.propTypes = {
  children: PropTypes.any,
};

export default FilterSearchBar;
