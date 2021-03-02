import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H2Bold } from './Texts';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

const sharedCss = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// PRIMARY BUTTON
const ThemedButton = styled.TouchableOpacity`
  ${sharedCss};
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border-width: 1px;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.disabledBackgroundColor
      : props.theme.activeBackground};
  border-color: ${(props) =>
    props.disabled
      ? props.theme.disabledBackgroundColor
      : props.theme.activeBackground};
`;

const ThemedText = styled(H2Bold)`
  color: ${(props) =>
    props.disabled ? props.theme.disabledTextColor : props.theme.color};
`;

export const PrimaryButton = ({ disabled, children, ...props }) => (
  <ThemedButton disabled={disabled} {...props}>
    <ThemedText disabled={disabled}>{children}</ThemedText>
  </ThemedButton>
);

PrimaryButton.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

// SECONDARY BUTTON

// TERTIARY BUTTON

const ThemedTertiary = styled.TouchableOpacity`
  ${sharedCss};
  width: 100px;
  height: 27px;
  border-radius: 13.5px;
  background-color: ${(props) =>
    props.selected
      ? props.theme.tertiarySelectedBackgroundColor
      : props.theme.tertiaryDisabledBackgroundColor};
`;

const TertiaryText = styled.Text`
  font-family: 'Nunito-Black';
  color: ${(props) =>
    props.selected
      ? props.theme.tertiarySelectedTextColor
      : props.theme.tertiaryDisabledTextColor};
`;

export const TertiaryButton = ({ selected, children, ...props }) => (
  <ThemedTertiary selected={selected} {...props}>
    <TertiaryText selected={selected}>{children}</TertiaryText>
  </ThemedTertiary>
);

TertiaryButton.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.string.isRequired,
};
