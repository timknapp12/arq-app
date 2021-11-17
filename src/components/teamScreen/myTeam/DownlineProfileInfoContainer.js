import React from 'react';
import PropTypes from 'prop-types';
import { ChevronIcon } from '../../common';
import { TouchableRow, ChevronContainer } from './myTeamCard.styles';
import DownlineProfileInfo from './DownlineProfileInfo';

const DownlineProfileInfoContainer = ({
  member,
  isExpanded = false,
  onPress = () => {},
  level,
  closeAllMenus = () => {},
  showChevron = true,
}) => {
  return (
    <TouchableRow
      activeOpacity={1}
      onPress={() => {
        onPress();
        closeAllMenus();
      }}
    >
      <>
        <DownlineProfileInfo member={member} level={level} />
        {showChevron && (
          <ChevronContainer>
            <ChevronIcon isExpanded={isExpanded} />
          </ChevronContainer>
        )}
      </>
    </TouchableRow>
  );
};

DownlineProfileInfoContainer.propTypes = {
  member: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
  onPress: PropTypes.func,
  level: PropTypes.number,
  closeAllMenus: PropTypes.func,
  showChevron: PropTypes.bool,
};

export default DownlineProfileInfoContainer;
