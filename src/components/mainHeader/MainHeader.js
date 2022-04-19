import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Flexbox, SmallQIcon, BellIcon, Header } from '../common';
import AccountIcon from '../../../assets/icons/accountProfile.svg';
import LoginContext from '../../contexts/LoginContext';
import AppContext from '../../contexts/AppContext';
import TabButtonContext from '../../contexts/TabButtonContext';
import NotificationsModal from '../notifications/NotificationsModal';

const ProfileImage = styled.Image`
  height: 24px;
  width: 24px;
  border-radius: 12px;
`;
const MainHeader = ({ fadeIn = () => {}, fadeOut = () => {}, isMenuOpen }) => {
  const { theme } = useContext(AppContext);
  const { closeAddOptions } = useContext(TabButtonContext);

  const {
    userProfile = { profileUrl: '' },
    prospectNotificationCount,
    setProspectNotificationCount,
  } = useContext(LoginContext);

  const [isImageValid, setIsImageValid] = useState(true);
  const [url, setUrl] = useState(userProfile?.profileUrl ?? '');
  // this flag triggers react to re-render the UI
  const [urlHasChanged, setUrlHasChanged] = useState(false);
  const [isNotificationModalOpen, setIsNotificationsModalOpen] =
    useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  // react native Image has a bug - using the setTimeout is a work around to force the image to rerender when the url has changed
  useEffect(() => {
    const timer = setTimeout(() => {
      setUrlHasChanged(true);
      setUrl(userProfile?.profileUrl);
    }, 1000);
    return () => {
      setUrlHasChanged(false);
      clearTimeout(timer);
    };
  }, [userProfile?.profileUrl]);

  return (
    <Header key={url}>
      <Flexbox width="60px" align="flex-start">
        <TouchableOpacity
          testID="profile-button"
          style={{ padding: 8, paddingEnd: 16 }}
          onPress={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
        >
          {url && isImageValid && urlHasChanged ? (
            <ProfileImage
              key={url}
              source={{ uri: url, cache: 'reload' }}
              onError={() => setIsImageValid(false)}
            />
          ) : (
            <AccountIcon
              size={24}
              style={{ color: theme.primaryTextColor, height: 2, width: 2 }}
            />
          )}
        </TouchableOpacity>
      </Flexbox>
      <SmallQIcon />
      <Flexbox width="60px" align="flex-end">
        <TouchableOpacity
          style={{ padding: 6, paddingStart: 16 }}
          onPress={() => {
            setIsNotificationsModalOpen(true);
            fadeOut();
            setProspectNotificationCount(0);
            closeAddOptions();
          }}
        >
          <BellIcon badgeValue={prospectNotificationCount} />
        </TouchableOpacity>
      </Flexbox>
      {isNotificationModalOpen && (
        <NotificationsModal
          visible={isNotificationModalOpen}
          onClose={() => setIsNotificationsModalOpen(false)}
        />
      )}
    </Header>
  );
};

MainHeader.propTypes = {
  toggleMenu: PropTypes.func,
  fadeIn: PropTypes.func,
  fadeOut: PropTypes.func,
  isMenuOpen: PropTypes.bool,
};

export default MainHeader;
