import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import VisualTreeBubble from './VisualTreeBubble';
import { H4 } from '../../common';
import AppContext from '../../../contexts/AppContext';

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
  },
];

const PlacementsContainer = ({ associatesEligibleForPlacement, loading }) => {
  console.log('associatesEligibleForPlacement', associatesEligibleForPlacement);
  const { theme } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const Container = Animated.createAnimatedComponent(StyledContainer);
  const initialValue = -64;
  const fadeAnim = useRef(new Animated.Value(initialValue)).current;

  const fadeUp = () => {
    setIsExpanded(true);
    Animated.timing(fadeAnim, {
      toValue: 80,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const fadeDown = () => {
    setIsExpanded(false);
    Animated.timing(fadeAnim, {
      toValue: initialValue,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container style={{ bottom: fadeAnim }}>
      <Handle onPress={isExpanded ? fadeDown : fadeUp}>
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
      {!loading && mock.length > 0 ? (
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
        <H4>No one in placement suite</H4>
      )}
    </Container>
  );
};

PlacementsContainer.propTypes = {
  associatesEligibleForPlacement: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PlacementsContainer;
