import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, SmallQIcon, BellIcon, AccountIcon, Header } from '../common';
import account from '../../../assets/icons/ic_account.png';

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
  const [isImageValid, setIsImageValid] = useState(true);
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
          {profileUrl && isImageValid ? (
            <ProfileImage
              source={{ uri: profileUrl }}
              defaultSource={account}
              onError={() => setIsImageValid(false)}
            />
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
