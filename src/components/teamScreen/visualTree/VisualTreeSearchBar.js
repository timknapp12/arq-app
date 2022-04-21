import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Flexbox, H5 } from '../../common';
import {
  RoundButtonContainer,
  SkewedBorder,
  RoundButton,
  SearchBarNav,
  MoveIconsContainer,
  MoveButton,
} from './visualTree.styles';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import TeamScreenContext from '../../../contexts/TeamScreenContext';
import properlyCaseName from '../../../utils/properlyCaseName/properlyCaseName';
import { Localized } from '../../../translations/Localized';

const VisualTreeSearchBar = ({
  selectedVisualTreePane,
  setSelectedVisualTreePane,
  pane1ActiveMember,
  pane2ActiveMember,
  pane3ActiveMember,
  pane1HasContent,
  pane2HasContent,
  pane3HasContent,
  setPane1HasContent,
  setPane2HasContent,
  setPane3HasContent,
}) => {
  const { viewInVisualTree } = useContext(TeamScreenContext);

  const navigation = useNavigation();
  const navigateToSearchScreen = () => {
    navigation.navigate('Search Visual Tree Screen', {
      title: Localized('Search My Team'),
      viewInVisualTree,
    });
  };

  const activeBubbleMember =
    selectedVisualTreePane === 1
      ? pane1ActiveMember
      : selectedVisualTreePane === 2
      ? pane2ActiveMember
      : pane3ActiveMember;

  const disabledMap = {
    1:
      selectedVisualTreePane === 1 ||
      (selectedVisualTreePane === 2 && !pane2ActiveMember) ||
      (selectedVisualTreePane === 3 && !pane3ActiveMember),
    2:
      selectedVisualTreePane === 2 ||
      (selectedVisualTreePane === 1 && !pane1ActiveMember) ||
      (selectedVisualTreePane === 3 && !pane3ActiveMember),
    3:
      selectedVisualTreePane === 3 ||
      (selectedVisualTreePane === 1 && !pane1ActiveMember) ||
      (selectedVisualTreePane === 2 && !pane2ActiveMember),
  };

  return (
    <>
      <FilterSearchBar onPress={navigateToSearchScreen}>
        <Flexbox direction="row" justify="flex-start" style={{ flex: 1 }}>
          <RoundButtonContainer>
            <RoundButton
              selected={selectedVisualTreePane === 1}
              hasContent={pane1HasContent}
              onPress={() => setSelectedVisualTreePane(1)}
            />
            <RoundButton
              selected={selectedVisualTreePane === 2}
              hasContent={pane2HasContent}
              onPress={() => setSelectedVisualTreePane(2)}
            />
            <RoundButton
              selected={selectedVisualTreePane === 3}
              hasContent={pane3HasContent}
              onPress={() => setSelectedVisualTreePane(3)}
            />
          </RoundButtonContainer>
          <SkewedBorder />
        </Flexbox>
      </FilterSearchBar>
      <SearchBarNav>
        <MoveIconsContainer>
          <MoveButton
            disabled={disabledMap[1]}
            onPress={() => {
              setPane1HasContent(true);
              setSelectedVisualTreePane(1);
            }}
          />
          <MoveButton
            disabled={disabledMap[2]}
            onPress={() => {
              setPane2HasContent(true);
              setSelectedVisualTreePane(2);
            }}
          />
          <MoveButton
            disabled={disabledMap[3]}
            onPress={() => {
              setPane3HasContent(true);
              setSelectedVisualTreePane(3);
            }}
          />
        </MoveIconsContainer>
        <H5 style={{ textAlign: 'center', flex: 2 }}>
          {properlyCaseName(
            activeBubbleMember?.firstName,
            activeBubbleMember?.lastName,
          )}
        </H5>
        <View style={{ flex: 1 }} />
      </SearchBarNav>
    </>
  );
};

VisualTreeSearchBar.propTypes = {
  selectedVisualTreePane: PropTypes.number.isRequired,
  setSelectedVisualTreePane: PropTypes.func.isRequired,
  pane1ActiveMember: PropTypes.object,
  pane2ActiveMember: PropTypes.object,
  pane3ActiveMember: PropTypes.object,
  pane1HasContent: PropTypes.bool.isRequired,
  pane2HasContent: PropTypes.bool.isRequired,
  pane3HasContent: PropTypes.bool.isRequired,
  setPane1HasContent: PropTypes.func.isRequired,
  setPane2HasContent: PropTypes.func.isRequired,
  setPane3HasContent: PropTypes.func.isRequired,
};

export default VisualTreeSearchBar;
