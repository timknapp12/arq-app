import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Flexbox, H2Black } from '../../common';
import { CardContainer, StandingsContainer } from './leaderbaoard.styles';
import DownlineProfileInfoContainer from '../myTeam/DownlineProfileInfoContainer';

const StandingsCard = ({ item, closeAllMenus }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((state) => !state);

  return (
    <CardContainer style={{ width: '100%' }}>
      <Flexbox direction="row" style={{ flex: 1 }}>
        <StandingsContainer isExpanded={isExpanded}>
          <H2Black>{item?.standing}</H2Black>
        </StandingsContainer>
        <View style={{ flex: 1, padding: 6 }}>
          <DownlineProfileInfoContainer
            style={{ flex: 1 }}
            member={item}
            isExpanded={isExpanded}
            onPress={toggleExpanded}
            closeAllMenus={closeAllMenus}
            showAccentColor={false}
          />
        </View>
      </Flexbox>
      {isExpanded && <H2Black>Expanded</H2Black>}
    </CardContainer>
  );
};

StandingsCard.propTypes = {
  item: PropTypes.object.isRequired,
  closeAllMenus: PropTypes.func.isRequired,
};

export default StandingsCard;
