import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated, View } from 'react-native';
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
    },
  },
];

const PlacementsContainer = ({
  associatesEligibleForPlacement,
  isExpanded,
  fadeAnim,
  fadeUp,
  fadeDown,
}) => {
  const { theme } = useContext(AppContext);
  console.log('associatesEligibleForPlacement', associatesEligibleForPlacement);

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
      {mock.length > 0 ? (
        mock?.map((member) => (
          <View
            style={{ marginRight: 8, marginLeft: 8 }}
            key={member?.associate?.associateId}
          >
            <VisualTreeBubble
              member={member}
              onDragStart={() => {}}
              onDragEnd={() => {}}
              onDragDrop={() => {}}
              payload={member.legacyAssociateId}
              draggable={true}
              position="relative"
              highlight={false}
              isDroppedItem={false}
              horizontalOffset={0}
              isInPlacementContainer={true}
            />
          </View>
        ))
      ) : (
        <H4>{Localized('No one in placement suite')}</H4>
      )}
    </Container>
  );
};

PlacementsContainer.propTypes = {
  associatesEligibleForPlacement: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  fadeAnim: PropTypes.object.isRequired,
  fadeUp: PropTypes.func.isRequired,
  fadeDown: PropTypes.func.isRequired,
};

export default PlacementsContainer;
