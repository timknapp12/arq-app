import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import { Flexbox, H5, TeamIcon } from '../../common';
import {
  RoundButtonContainer,
  SkewedBorder,
  RoundButton,
  SearchBarNav,
  MoveIconsContainer,
  MoveButton,
  Button,
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
  resetActiveBubbleMap,
}) => {
  const { viewInVisualTree, viewInNewPane, viewInMyTeamView } =
    useContext(TeamScreenContext);

  const navigation = useNavigation();
  const navigateToSearchScreen = () => {
    Analytics.logEvent('search_in_visual_tree');
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

  const legacyId = activeBubbleMember?.legacyAssociateId;
  const level = activeBubbleMember?.level ?? 2;

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

  const viewItemInMyTeamView = (item) => {
    const uplineId = item?.uplineId;
    const selectedMemberId = item?.associateId;
    const levelInTree = item?.level - 1;
    viewInMyTeamView(uplineId, selectedMemberId, levelInTree);
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
              viewInNewPane(1, legacyId, level);
              resetActiveBubbleMap[selectedVisualTreePane]();
            }}
          />
          <MoveButton
            disabled={disabledMap[2]}
            onPress={() => {
              viewInNewPane(2, legacyId, level);
              resetActiveBubbleMap[selectedVisualTreePane]();
            }}
          />
          <MoveButton
            disabled={disabledMap[3]}
            onPress={() => {
              viewInNewPane(3, legacyId, level);
              resetActiveBubbleMap[selectedVisualTreePane]();
            }}
          />
        </MoveIconsContainer>
        <H5 style={{ textAlign: 'center', flex: 2 }}>
          {properlyCaseName(
            activeBubbleMember?.firstName,
            activeBubbleMember?.lastName,
          )}
        </H5>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Button
            disabled={!activeBubbleMember}
            style={{
              paddingEnd: 4,
              paddingStart: 4,
            }}
            onPress={() => viewItemInMyTeamView(activeBubbleMember)}
          >
            <TeamIcon size={26} />
          </Button>
        </View>
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
  resetActiveBubbleMap: PropTypes.object.isRequired,
};

export default VisualTreeSearchBar;
