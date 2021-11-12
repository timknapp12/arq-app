import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChevronIcon } from '../../common';
import { TouchableRow, ChevronContainer } from './myTeamCard.styles';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
import DownlineProfileInfo from './DownlineProfileInfo';

const DownlineProfileInfoContainer = ({
  member,
  isExpanded,
  onPress,
  level,
}) => {
  const { closeAllMenus } = useContext(MyTeamViewContext);

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
        <ChevronContainer>
          <ChevronIcon isExpanded={isExpanded} />
        </ChevronContainer>
      </>
    </TouchableRow>
  );
};

DownlineProfileInfoContainer.propTypes = {
  member: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
  onPress: PropTypes.func,
  level: PropTypes.number,
};

export default DownlineProfileInfoContainer;
