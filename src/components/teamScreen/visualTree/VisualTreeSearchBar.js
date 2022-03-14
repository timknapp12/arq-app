import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Flexbox } from '../../common';
import { RoundButton } from './visualTree.styles';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import { Localized } from '../../../translations/Localized';

const VisualTreeSearchBar = ({
  selectedPane,
  setSelectedPane,
  paneOneSearchId,
  paneTwoSearchId,
  paneThreeSearchId,
  paneOneSearchLevel,
  paneTwoSearchLevel,
  paneThreeSearchLevel,
}) => {
  const navigation = useNavigation();
  const navigateToSearchScreen = () => {
    navigation.navigate('Search Visual Tree Screen', {
      title: Localized('Search My Team'),
      selectedPane,
      paneOneSearchId,
      paneTwoSearchId,
      paneThreeSearchId,
      paneOneSearchLevel,
      paneTwoSearchLevel,
      paneThreeSearchLevel,
    });
  };

  return (
    <FilterSearchBar onPress={navigateToSearchScreen}>
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
  );
};

VisualTreeSearchBar.propTypes = {
  selectedPane: PropTypes.number.isRequired,
  setSelectedPane: PropTypes.func.isRequired,
  paneOneSearchId: PropTypes.number.isRequired,
  paneTwoSearchId: PropTypes.number.isRequired,
  paneThreeSearchId: PropTypes.number.isRequired,
  paneOneSearchLevel: PropTypes.number.isRequired,
  paneTwoSearchLevel: PropTypes.number.isRequired,
  paneThreeSearchLevel: PropTypes.number.isRequired,
};

export default VisualTreeSearchBar;
