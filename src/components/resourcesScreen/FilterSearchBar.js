import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
// Components
import { FilterIcon, SearchIcon } from '../common/icons';

const FilterSearchBar = ({ userName = 'user' }) => {
  return (
    <View style={{ alignSelf: 'stretch', padding: 10, zIndex: -1 }}>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
        <FilterIcon />
        <Text style={{ color: '#fff' }}>{`${userName}'s awesome team`}</Text>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
};

FilterSearchBar.propTypes = {
  userName: PropTypes.string,
};

export default FilterSearchBar;
