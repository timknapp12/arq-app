import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated, View, ScrollView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlacementMember from './PlacementMember';
import { H4 } from '../../common';
import AppContext from '../../../contexts/AppContext';
import { Localized } from '../../../translations/Localized';

const StyledContainer = styled.View`
  background-color: ${(props) => props.theme.placementContainerBackgroundColor};
  width: 100%;
  min-height: 204px;
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 8px;
`;

const Handle = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.placementContainerBackgroundColor};
  width: 70%;
  height: 32px;
  position: absolute;
  top: -27px;
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
    legacyAssociateId: 1049922,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    associate: {
      firstName: 'Test1',
      lastName: 'Barney',
      dateSignedUp: '2023-04-28T22:56:47.000Z',
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
    legacyAssociateId: 1051430,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    associate: {
      firstName: 'Test2',
      lastName: 'Vaden',
      dateSignedUp: '2023-04-30T22:56:47.000Z',
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
    legacyAssociateId: 13,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    associate: {
      firstName: 'Test3',
      lastName: 'Billy',
      associateId: 12,
      legacyAssociateId: 13,
      dateSignedUp: '2023-05-02T22:56:47.000Z',
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
    legacyAssociateId: 22,
    ov: 0,
    ovRankId: 1,
    ovRankName: 'Ambassador',
    profileUrl: null,
    uplineId: 6,
    enrollerId: 8,
    associate: {
      associateId: 22,
      legacyAssociateId: 22,
      firstName: 'Test4',
      lastName: 'VanDyke',
      dateSignedUp: '2023-04-30T22:56:47.000Z',
    },
    uplineTreeNode: {
      associate: {
        legacyAssociateId: 4,
      },
    },
  },
];

console.log('mock.length', mock.length);

const PlacementsDrawer = ({
  associatesEligibleForPlacement,
  isExpanded,
  fadeAnim,
  fadeUp,
  fadeDown,
  setIsPlacementConfirmModalOpen,
  setSelectedPlacementEnrolee,
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
        {isExpanded && (
          <>
            {mock.length > 0 ? (
              mock?.map((member) => (
                <View
                  onStartShouldSetResponder={() => true}
                  style={{ marginRight: 8, marginLeft: 8 }}
                  key={member?.associate?.associateId}
                >
                  <PlacementMember
                    member={member.associate}
                    setIsPlacementConfirmModalOpen={
                      setIsPlacementConfirmModalOpen
                    }
                    setSelectedPlacementEnrolee={setSelectedPlacementEnrolee}
                  />
                </View>
              ))
            ) : (
              <H4>{Localized('No one in placement suite')}</H4>
            )}
          </>
        )}
      </ScrollView>
    </Container>
  );
};

PlacementsDrawer.propTypes = {
  associatesEligibleForPlacement: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  fadeAnim: PropTypes.object.isRequired,
  fadeUp: PropTypes.func.isRequired,
  fadeDown: PropTypes.func.isRequired,
  setIsPlacementConfirmModalOpen: PropTypes.func.isRequired,
  setSelectedPlacementEnrolee: PropTypes.func.isRequired,
};

export default PlacementsDrawer;
