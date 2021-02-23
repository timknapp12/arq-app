import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import bellIcon from '../../../assets/icons/ic_bell.png';
import accountIcon from '../../../assets/icons/ic_account.png';
import smallQ from '../../../assets/icons/Q-Sciences-small-logo.png';
import { darkred, white } from '../../Styles/colors';

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
  background-color: ${darkred};
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
  <Image {...props} source={smallQ} style={{ height: 24 }} />
);
