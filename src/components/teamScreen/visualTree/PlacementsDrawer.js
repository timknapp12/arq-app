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
            {associatesEligibleForPlacement.length > 0 ? (
              associatesEligibleForPlacement?.map((member) => (
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
