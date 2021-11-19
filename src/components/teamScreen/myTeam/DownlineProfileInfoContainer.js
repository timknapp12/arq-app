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
  cardIsExpandable = true,
  ...props
}) => {
  return (
    <TouchableRow
      activeOpacity={1}
      onPress={() => {
        onPress();
        closeAllMenus();
      }}
      style={{ flex: 1 }}
    >
      <>
        <DownlineProfileInfo member={member} level={level} {...props} />
        {cardIsExpandable && (
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
  cardIsExpandable: PropTypes.bool,
};

export default DownlineProfileInfoContainer;
