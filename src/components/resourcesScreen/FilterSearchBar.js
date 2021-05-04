import React, { useContext } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import AppContext from '../../contexts/AppContext';
import { Flexbox } from '../common';

const FilterSearchBar = ({ userName = 'user' }) => {
  const { theme } = useContext(AppContext);
  return (
    <Flexbox direction="row" padding={10} style={{ zIndex: -1 }}>
      <Text style={{ color: '#fff' }}>{`${userName}'s awesome team`}</Text>
      <SearchIcon color={theme.primaryTextColor} size={24} name="search" />
    </Flexbox>
  );
};

FilterSearchBar.propTypes = {
  userName: PropTypes.string,
};

export default FilterSearchBar;
