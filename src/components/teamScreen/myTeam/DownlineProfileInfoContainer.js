import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileInfoTouchable, ChevronContainer } from './myTeamCard.styles';
import AppContext from '../../../contexts/AppContext';
import MyTeamViewContext from '../../../contexts/MyTeamViewContext';
import DownlineProfileInfo from './DownlineProfileInfo';

const DownlineProfileInfoContainer = ({
  member,
  isExpanded,
  onPress,
  level,
}) => {
  const { theme } = useContext(AppContext);
  const { closeAllMenus } = useContext(MyTeamViewContext);

  return (
    <ProfileInfoTouchable
      activeOpacity={1}
      onPress={() => {
        onPress();
        closeAllMenus();
      }}
    >
      <>
        <DownlineProfileInfo member={member} level={level} />
        <ChevronContainer>
          <MaterialCommunityIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            color={theme.primaryTextColor}
            size={24}
          />
        </ChevronContainer>
      </>
    </ProfileInfoTouchable>
  );
};

DownlineProfileInfoContainer.propTypes = {
  member: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
  onPress: PropTypes.func,
  level: PropTypes.number,
};

export default DownlineProfileInfoContainer;
