import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Flexbox } from '../../common';
import SearchIcon from '../../../../assets/icons/search-icon.svg';
import AppContext from '../../../contexts/AppContext';
import { RoundButton } from './visualTree.styles';

const VisualTreeSearchBar = ({ selectedPane, setSelectedPane }) => {
  const { theme } = useContext(AppContext);

  const onPress = () => {};
  return (
    <Flexbox direction="row">
      <Flexbox direction="row" width="100px">
        <RoundButton
          selected={selectedPane === 1}
          onPress={() => setSelectedPane(1)}
        />
        <RoundButton
          selected={selectedPane === 2}
          onPress={() => setSelectedPane(2)}
        />
        <RoundButton
          selected={selectedPane === 3}
          onPress={() => setSelectedPane(3)}
        />
      </Flexbox>
      <TouchableOpacity onPress={onPress}>
        <SearchIcon
          style={{ height: 36, width: 36, color: theme.primaryTextColor }}
        />
      </TouchableOpacity>
    </Flexbox>
  );
};

VisualTreeSearchBar.propTypes = {
  selectedPane: PropTypes.number.isRequired,
  setSelectedPane: PropTypes.func.isRequired,
};

export default VisualTreeSearchBar;
