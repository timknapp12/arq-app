import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Switch as NativeSwitch, Platform } from 'react-native';
import AppContext from '../../contexts/AppContext';

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
  background-color: ${(props) =>
    props.disabled
      ? props.theme.disabledBackgroundColor
      : props.theme.primaryButtonBackgroundColor};
`;

const ThemedText = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 24px;
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
const ButtonContainer = styled.View`
  opacity: ${(props) =>
    props.selected ? props.theme.primaryOpacity : props.theme.disabledOpacity};
`;

const ThemedTertiary = styled.TouchableOpacity`
  ${sharedCss};
  width: 100px;
  height: 22px;
  border-radius: 11px;
  border-width: ${(props) => (props.selected ? '2px' : '1px')};
  border-color: ${(props) =>
    props.selected
      ? props.theme.teriarySelectedBorderColor
      : props.theme.tertiaryDisabledBorderColor};
  background-color: ${(props) =>
    props.selected
      ? props.theme.tertiarySelectedBackgroundColor
      : props.theme.tertiaryDisabledBackgroundColor};
`;

const TertiaryText = styled.Text`
  font-family: ${(props) => (props.selected ? 'Avenir-Heavy' : 'Avenir-Light')};
  color: ${(props) =>
    props.selected
      ? props.theme.tertiarySelectedTextColor
      : props.theme.tertiaryDisabledTextColor};
`;

export const TertiaryButton = ({ selected, children, ...props }) => (
  <ButtonContainer selected={selected}>
    <ThemedTertiary selected={selected} {...props}>
      <TertiaryText selected={selected}>{children}</TertiaryText>
    </ThemedTertiary>
  </ButtonContainer>
);

TertiaryButton.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

// SWITCH
export const Switch = ({ value, onValueChange, ...props }) => {
  const { theme } = useContext(AppContext);
  return (
    <NativeSwitch
      {...props}
      trackColor={{
        false: theme.inactiveSwitchBackground,
        true: theme.activeSwitchBackground,
      }}
      thumbColor={value ? theme.activeSwitchThumb : theme.inactiveSwitchThumb}
      ios_backgroundColor={theme.inactiveSwitchBackground}
      onValueChange={onValueChange}
      value={value}
      style={{
        // ios switch is larger than on android
        transform: [
          { scaleX: Platform.OS === 'ios' ? 0.8 : 1 },
          { scaleY: Platform.OS === 'ios' ? 0.8 : 1 },
        ],
        // there is a margin at the end of the switch, so this will counteract that
        marginEnd: -8,
      }}
    />
  );
};

Switch.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};
