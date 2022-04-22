import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableOpacity } from 'react-native';
import { ChevronIcon } from '../../common';
import VisualTreeIcon from '../../../../assets/icons/VisualTreeIcon.svg';
import { TouchableRow, ChevronContainer } from './myTeamCard.styles';
import DownlineProfileInfo from './DownlineProfileInfo';
import AppContext from '../../../contexts/AppContext';

const DownlineProfileInfoContainer = ({
  member,
  isExpanded = false,
  onPress = () => {},
  level,
  closeAllMenus = () => {},
  cardIsExpandable = true,
  showVisualTreeIcon,
  viewItemInVisualTree,
  isFilterMenuOpen = false,
  ...props
}) => {
  const { theme } = useContext(AppContext);

  return (
    <TouchableRow
      activeOpacity={1}
      onPress={() => {
        if (Platform.OS === 'android' && isFilterMenuOpen) return;
        onPress();
        closeAllMenus();
      }}
      style={{ flex: 1 }}
    >
      <>
        <DownlineProfileInfo member={member} level={level} {...props} />
        <ChevronContainer>
          {cardIsExpandable && <ChevronIcon isExpanded={isExpanded} />}
          {showVisualTreeIcon &&
          member?.associate?.associateType === 'AMBASSADOR' ? (
            <TouchableOpacity
              onPress={() => {
                viewItemInVisualTree(member);
              }}
            >
              <VisualTreeIcon
                style={{
                  color: theme.primaryTextColor,
                  height: 24,
                  width: 24,
                }}
              />
            </TouchableOpacity>
          ) : null}
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
  closeAllMenus: PropTypes.func,
  cardIsExpandable: PropTypes.bool,
  showVisualTreeIcon: PropTypes.bool,
  viewItemInVisualTree: PropTypes.func,
  isFilterMenuOpen: PropTypes.bool,
};

export default DownlineProfileInfoContainer;
