import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { H2 } from './Texts';

// source for themes with styled components: https://styled-components.com/docs/advanced#theming

const sharedCss = {
  width: '100%',
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  borderWidth: 1,
};

// LOGIN BUTTON
const ThemedButton = styled.TouchableOpacity`
  ${sharedCss};
  background-color: ${(props) =>
    props.disabled
      ? props.theme.disabledBackgroundColor
      : props.theme.activeBackground};
  border-color: ${(props) =>
    props.disabled
      ? props.theme.disabledBackgroundColor
      : props.theme.activeBackground};
`;

const ThemedText = styled(H2)`
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
