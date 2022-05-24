import React, { useContext } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import NotificationsIcon from '../../../assets/icons/notification-icon.svg';
import accountIcon from '../../../assets/icons/ic_account.png';
import smallQ from '../../../assets/icons/Q-Sciences-small-logo.png';
import close from '../../../assets/icons/ic_close.png';
import qualified from '../../../assets/icons/qualified.png';
import notQualified from '../../../assets/icons/not_qualified.png';
import camera from '../../../assets/icons/button_camera.png';
import gallery from '../../../assets/icons/buton_gallery.png';
import edit from '../../../assets/icons/ic_edit.png';
import deletePng from '../../../assets/icons/ic_delete.png';
import TouchID from '../../../assets/icons/touch-id.svg';
import Dashboard from '../../../assets/icons/dashboard.svg';
import Resources from '../../../assets/icons/resources.svg';
import News from '../../../assets/icons/news.svg';
import Team from '../../../assets/icons/team-icon.svg';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../contexts/AppContext';
import { carnelian, primaryWhite, blue } from '../../styles/colors';

const IconContainer = styled.View`
  position: relative;
  width: 28px;
`;

const ThemedImage = styled.Image`
  height: 24px;
  width: 24px;
`;

const badgeCircumfrance = 16;

const BadgeContainer = styled.View`
  background-color: ${carnelian};
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 6px;
  right: -6px;
  min-height: ${badgeCircumfrance}px;
  min-width: ${badgeCircumfrance}px;
  border-radius: ${badgeCircumfrance / 2}px;
`;

const BadgeText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: ${primaryWhite};
`;

export const BellIcon = ({ badgeValue }) => {
  const { theme } = useContext(AppContext);
  return (
    <IconContainer>
      <NotificationsIcon
        style={{
          color: theme.primaryTextColor,
          height: 36,
          width: 36,
        }}
      />
      {badgeValue ? (
        <BadgeContainer>
          <BadgeText>{badgeValue}</BadgeText>
        </BadgeContainer>
      ) : null}
    </IconContainer>
  );
};

BellIcon.propTypes = {
  badgeValue: PropTypes.number,
};

export const AccountIcon = ({ ...props }) => (
  <ThemedImage {...props} source={accountIcon} />
);

export const SmallQIcon = ({ ...props }) => (
  <Image {...props} source={smallQ} style={{ height: 26 }} />
);

export const CloseIcon = ({ ...props }) => (
  <Image {...props} source={close} style={{ height: 14 }} />
);

export const CameraIcon = ({ ...props }) => (
  <Image {...props} source={camera} style={{ height: 24 }} />
);

export const GalleryIcon = ({ ...props }) => (
  <Image {...props} source={gallery} style={{ height: 24 }} />
);

export const QualifiedIcon = ({ ...props }) => (
  <Image {...props} source={qualified} style={{ height: 18 }} />
);

export const NotQualifiedIcon = ({ ...props }) => (
  <Image {...props} source={notQualified} style={{ height: 18 }} />
);

export const EditIcon = ({ ...props }) => (
  <Image {...props} source={edit} style={{ height: 16 }} />
);

export const DeleteIcon = ({ ...props }) => (
  <Image {...props} source={deletePng} style={{ height: 16 }} />
);

export const TouchIDIcon = ({ fill = blue, size = 36, ...props }) => (
  <TouchID width={size} height={size} fill={fill} {...props} />
);
TouchIDIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

// source for how to change color on svgs sent from Q Sciences marketing: https://stackoverflow.com/questions/49660912/react-native-how-to-use-local-svg-file-and-color-it
// change the stroke or fill color in the svg file to "currentColor"
export const DashboardIcon = ({ fill = primaryWhite, size = 34, ...props }) => (
  <Dashboard style={{ color: fill }} width={size} height={size} {...props} />
);
DashboardIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

export const ResourcesIcon = ({ fill = primaryWhite, size = 34, ...props }) => (
  <Resources style={{ color: fill }} width={size} height={size} {...props} />
);
ResourcesIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

export const NewsIcon = ({ fill = primaryWhite, size = 34, ...props }) => (
  <News style={{ color: fill }} width={size} height={size} {...props} />
);
NewsIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

export const TeamIcon = ({ fill = primaryWhite, size = 34, ...props }) => (
  <Team style={{ color: fill }} width={size} height={size} {...props} />
);
TeamIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

export const LoadingSpinner = ({ size = 'small', ...props }) => {
  const { theme } = useContext(AppContext);
  return (
    <ActivityIndicator
      color={theme.primaryButtonBackgroundColor}
      size={size}
      {...props}
    />
  );
};

LoadingSpinner.propTypes = { size: PropTypes.string };

export const ChevronIcon = ({ isExpanded, size = 24 }) => {
  const { theme } = useContext(AppContext);

  return (
    <MaterialCommunityIcon
      name={isExpanded ? 'chevron-up' : 'chevron-down'}
      color={theme.primaryTextColor}
      size={size}
    />
  );
};

ChevronIcon.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  size: PropTypes.number,
};
