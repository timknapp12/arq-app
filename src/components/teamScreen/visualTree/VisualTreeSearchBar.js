import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Flexbox } from '../../common';
import { RoundButton } from './visualTree.styles';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import TeamScreenContext from '../../../contexts/TeamScreenContext';
import { Localized } from '../../../translations/Localized';

const VisualTreeSearchBar = ({
  selectedVisualTreePane,
  setSelectedVisualTreePane,
}) => {
  const { viewInVisualTree } = useContext(TeamScreenContext);

  const navigation = useNavigation();
  const navigateToSearchScreen = () => {
    navigation.navigate('Search Visual Tree Screen', {
      title: Localized('Search My Team'),
      viewInVisualTree,
    });
  };

  return (
    <FilterSearchBar onPress={navigateToSearchScreen}>
      <Flexbox direction="row" width="100px">
        <RoundButton
          selected={selectedVisualTreePane === 1}
          onPress={() => setSelectedVisualTreePane(1)}
        />
        <RoundButton
          selected={selectedVisualTreePane === 2}
          onPress={() => setSelectedVisualTreePane(2)}
        />
        <RoundButton
          selected={selectedVisualTreePane === 3}
          onPress={() => setSelectedVisualTreePane(3)}
        />
      </Flexbox>
    </FilterSearchBar>
  );
};

VisualTreeSearchBar.propTypes = {
  selectedVisualTreePane: PropTypes.number.isRequired,
  setSelectedVisualTreePane: PropTypes.func.isRequired,
};

export default VisualTreeSearchBar;
