import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import bellIcon from '../../../assets/icons/ic_bell.png';
import accountIcon from '../../../assets/icons/ic_account.png';
import smallQ from '../../../assets/icons/Q-Sciences-small-logo.png';
import close from '../../../assets/icons/ic_close.png';
import qualified from '../../../assets/icons/qualified.png';
import notQualified from '../../../assets/icons/not_qualified.png';
import camera from '../../../assets/icons/button_camera.png';
import gallery from '../../../assets/icons/buton_gallery.png';
import edit from '../../../assets/icons/ic_edit.png';
import deletePng from '../../../assets/icons/ic_delete.png';
import { darkRed, white } from '../../styles/colors';

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
  background-color: ${darkRed};
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  height: ${badgeCircumfrance}px;
  width: ${badgeCircumfrance}px;
  border-radius: ${badgeCircumfrance / 2}px;
`;

const BadgeText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: ${white};
`;

export const BellIcon = ({ badgeValue }) => (
  <IconContainer>
    <ThemedImage source={bellIcon} />
    {badgeValue ? (
      <BadgeContainer>
        <BadgeText>{badgeValue}</BadgeText>
      </BadgeContainer>
    ) : null}
  </IconContainer>
);

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
