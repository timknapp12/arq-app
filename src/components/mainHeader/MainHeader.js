import React, { useState, useContext, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, SmallQIcon, BellIcon, AccountIcon, Header } from '../common';
import account from '../../../assets/icons/ic_account.png';
import LoginContext from '../../contexts/LoginContext';

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
}) => {
  const { userProfile = { profileUrl: '' } } = useContext(LoginContext);
  const [isImageValid, setIsImageValid] = useState(true);
  const [url, setUrl] = useState(userProfile?.profileUrl ?? '');
  // this flag triggers react to re-render the UI
  const [urlHasChanged, setUrlHasChanged] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  useEffect(() => {
    setUrlHasChanged(true);
    setUrl(userProfile?.profileUrl);
    return () => {
      setUrlHasChanged(false);
    };
  }, [userProfile?.profileUrl]);

  return (
    <Header key={url}>
      <Flexbox width="60px" align="flex-start">
        <TouchableOpacity
          testID="profile-button"
          onPress={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}>
          {url && isImageValid && urlHasChanged ? (
            <ProfileImage
              key={url}
              source={{ uri: url }}
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
        <TouchableOpacity
          onPress={() => Alert.alert('This feature is not quite ready yet :)')}>
          <BellIcon badgeValue={badgeValue} />
        </TouchableOpacity>
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
};

export default MainHeader;
