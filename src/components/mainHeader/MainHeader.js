import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, SmallQIcon, BellIcon, AccountIcon, Header } from '../common';

const ProfileImage = styled.Image`
  height: 24px;
  width: 24px;
  border-radius: 12px;
`;

const MainHeader = ({
  badgeValue,
  fadeIn = () => {},
  fadeOut = () => {},
  isMenuOpen,
  profileUrl,
}) => {
  const toggleMenu = () => {
    if (isMenuOpen) {
      fadeOut();
    } else {
      fadeIn();
    }
  };
  return (
    <Header>
      <Flexbox width="60px" align="flex-start">
        <TouchableOpacity
          testID="profile-button"
          onPress={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}>
          {profileUrl ? (
            <ProfileImage source={{ uri: profileUrl }} />
          ) : (
            <AccountIcon />
          )}
        </TouchableOpacity>
      </Flexbox>
      <SmallQIcon />
      <Flexbox width="60px" align="flex-end">
        <BellIcon badgeValue={badgeValue} />
      </Flexbox>
    </Header>
  );
};

MainHeader.propTypes = {
  badgeValue: PropTypes.number,
  toggleMenu: PropTypes.func,
  fadeIn: PropTypes.func,
  fadeOut: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  profileUrl: PropTypes.string,
};

export default MainHeader;
