import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated, View, ScrollView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import VisualTreeBubble from './VisualTreeBubble';
import { H4 } from '../../common';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';

const StyledContainer = styled.View`
  background-color: ${(props) => props.theme.placementContainerBackgroundColor};
  width: 100%;
  height: 140px;
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 8px;
`;

const Handle = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.placementContainerBackgroundColor};
  width: 70%;
  height: 26px;
  position: absolute;
  top: -23px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
`;

const mock = [
  {
    __typename: 'Associate',
    associateId: 402839,
    associateStatus: 'ACTIVE',
    associateType: 'AMBASSADOR',
    cv: 0,
    cvRankId: 1,
    cvRankName: 'Ambassador',
    firstName: 'Test1',
    lastName: 'Barney',
    legacyAssociateId: 1049922,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    dateSignedUp: '2023-04-28T22:56:47.000Z',
    associate: {
      associateId: 1,
      legacyAssociateId: 1049922,
    },
    uplineTreeNode: {
      associate: {
        legacyAssociateId: 4,
      },
    },
  },
  {
    __typename: 'Associate',
    associateId: 404094,
    associateStatus: 'ACTIVE',
    associateType: 'AMBASSADOR',
    cv: 0,
    cvRankId: 1,
    cvRankName: 'Ambassador',
    firstName: 'Test2',
    lastName: 'Vaden',
    legacyAssociateId: 1051430,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    dateSignedUp: '2023-04-30T22:56:47.000Z',
    associate: {
      associateId: 2,
      legacyAssociateId: 1051430,
    },
    uplineTreeNode: {
      associate: {
        legacyAssociateId: 4,
      },
    },
  },
  {
    __typename: 'Associate',
    associateId: 12,
    associateStatus: 'ACTIVE',
    associateType: 'AMBASSADOR',
    cv: 0,
    cvRankId: 1,
    cvRankName: 'Ambassador',
    firstName: 'Test3',
    lastName: 'Billy',
    legacyAssociateId: 13,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    dateSignedUp: '2023-05-02T22:56:47.000Z',
    associate: {
      associateId: 12,
      legacyAssociateId: 13,
    },
    uplineTreeNode: {
      associate: {
        legacyAssociateId: 4,
      },
    },
  },
  {
    __typename: 'Associate',
    associateId: 21,
    associateStatus: 'ACTIVE',
    associateType: 'AMBASSADOR',
    cv: 0,
    cvRankId: 1,
    cvRankName: 'Ambassador',
    firstName: 'Test4',
    lastName: 'VanDyke',
    legacyAssociateId: 22,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    dateSignedUp: '2023-04-30T22:56:47.000Z',
    associate: {
      associateId: 22,
      legacyAssociateId: 22,
    },
    uplineTreeNode: {
      associate: {
        legacyAssociateId: 4,
      },
    },
  },
];

console.log('mock.length', mock.length);

const PlacementsContainer = ({
  associatesEligibleForPlacement,
  isExpanded,
  fadeAnim,
  fadeUp,
  fadeDown,
  onDragStartPlacement,
  onDragEndPlacement,
  onDragDropPlacement,
  idOfDraggedItem,
}) => {
  const { theme } = useContext(AppContext);
  console.log('idOfDraggedItem', idOfDraggedItem);
  const Container = Animated.createAnimatedComponent(StyledContainer);

  return (
    <Container style={{ bottom: fadeAnim }}>
      <Handle activeOpacity={1} onPress={isExpanded ? fadeDown : fadeUp}>
        <MaterialCommunityIcon
          name={isExpanded ? 'chevron-down' : 'chevron-up'}
          color={theme.primaryTextColor}
          size={32}
        />
        <MaterialCommunityIcon
          name={isExpanded ? 'chevron-down' : 'chevron-up'}
          color={theme.primaryTextColor}
          size={32}
        />
      </Handle>
      <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '100%',
        }}
        style={{ height: '100%' }}
      >
        {associatesEligibleForPlacement.length > 0 ? (
          associatesEligibleForPlacement?.map((member) => (
            <View
              style={{ marginRight: 8, marginLeft: 8 }}
              key={member?.associate?.associateId}
            >
              <VisualTreeBubble
                member={member.associate}
                onDragStart={() => onDragStartPlacement(member.associate)}
                onDragEnd={onDragEndPlacement}
                onDragDrop={onDragDropPlacement}
                longPressDelay={200}
                payload={{ ...member, toBePlaced: true }}
                //   isBeingDragged={idOfDraggedItem === member?.legacyAssociateId}
                draggable={false}
                position="relative"
                //   style={{ position: 'absolute', top: -70, marginLeft: 40 }}
                highlight={false}
                isDroppedItem={false}
                horizontalOffset={0}
                isInPlacementContainer={true}
                //   selected={idOfDraggedItem === member?.legacyAssociateId}
              />
            </View>
          ))
        ) : (
          <H4>{Localized('No one in placement suite')}</H4>
        )}
      </ScrollView>
    </Container>
  );
};

PlacementsContainer.propTypes = {
  associatesEligibleForPlacement: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  fadeAnim: PropTypes.object.isRequired,
  fadeUp: PropTypes.func.isRequired,
  fadeDown: PropTypes.func.isRequired,
  onDragStartPlacement: PropTypes.func.isRequired,
  onDragEndPlacement: PropTypes.func.isRequired,
  onDragDropPlacement: PropTypes.func.isRequired,
  idOfDraggedItem: PropTypes.number,
};

export default PlacementsContainer;
