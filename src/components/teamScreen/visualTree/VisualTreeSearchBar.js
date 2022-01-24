import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox } from '../../common';
// import SearchIcon from '../../../../assets/icons/search-icon.svg';
import { RoundButton } from './visualTree.styles';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import CollapsableInput from './CollapsableInput';

const VisualTreeSearchBar = ({
  selectedPane,
  setSelectedPane,
  searchTerm,
  setSearchTerm,
}) => {
  const [isSearchInputExpanded, setIsSearchInputExpanded] = useState(false);

  return (
    <Flexbox>
      <FilterSearchBar
        onPress={() => setIsSearchInputExpanded((state) => !state)}
      >
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
      </FilterSearchBar>
      <Flexbox style={{ paddingEnd: 12, paddingStart: 12 }}>
        <CollapsableInput
          isOpen={isSearchInputExpanded}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </Flexbox>
    </Flexbox>
  );
};

VisualTreeSearchBar.propTypes = {
  selectedPane: PropTypes.number.isRequired,
  setSelectedPane: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default VisualTreeSearchBar;
