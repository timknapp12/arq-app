import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity as GestureTouchable } from 'react-native-gesture-handler';
import {
  Switch as NativeSwitch,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { H4Book, Checkmark } from './texts';
import AppleIcon from '../../../assets/icons/apple-button.svg';
import GoogleLogo from '../../../assets/icons/google-button.svg';
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
  min-height: 40px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.disabledBackgroundColor
      : props.theme.primaryButtonBackgroundColor};
`;

const ThemedText = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 24px;
  text-align: center;
  color: ${(props) =>
    props.disabled
      ? props.theme.disabledTextColor
      : props.theme.primaryTextColor};
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

export const PrimaryButtonSmall = ({ disabled, children, ...props }) => (
  <ThemedButton style={{ minHeight: 20 }} disabled={disabled} {...props}>
    <ThemedText style={{ fontSize: 16 }} disabled={disabled}>
      {children}
    </ThemedText>
  </ThemedButton>
);

PrimaryButtonSmall.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

// SECONDARY BUTTON
const ThemedSecondaryButton = styled.TouchableOpacity`
  ${sharedCss};
  width: 100%;
  min-height: 40px;
  border-radius: 5px;
  border-color: ${(props) => props.theme.secondaryButtonTextColor};
  border-width: 2px;
`;

const ThemedSecondaryButtonText = styled.Text`
  font-family: 'Avenir-Light';
  font-size: 24px;
  color: ${(props) => props.theme.secondaryButtonTextColor};
  text-align: center;
`;

export const SecondaryButton = ({ children, ...props }) => (
  <ThemedSecondaryButton {...props}>
    <ThemedSecondaryButtonText>{children}</ThemedSecondaryButtonText>
  </ThemedSecondaryButton>
);

SecondaryButton.propTypes = {
  children: PropTypes.string.isRequired,
};

// TERTIARY BUTTON
const ButtonContainer = styled.View`
  opacity: ${(props) =>
    props.selected ? props.theme.primaryOpacity : props.theme.disabledOpacity};
`;

const ThemedTertiary = styled.TouchableOpacity`
  ${sharedCss};
  min-width: 110px;
  height: 22px;
  border-radius: 11px;
  padding: 0px 6px;
  border-width: ${(props) => (props.selected ? '2px' : '1px')};
  border-color: ${(props) =>
    props.selected
      ? props.theme.tertiarySelectedBorderColor
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
  font-size: 14px;
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

// GOOGLE LOGIN
export const GoogleLoginButton = ({ ...props }) => (
  <TouchableOpacity {...props}>
    <GoogleLogo />
  </TouchableOpacity>
);

// APPLE LOGIN
export const AppleLoginButton = ({ ...props }) => (
  <TouchableOpacity {...props}>
    <AppleIcon />
  </TouchableOpacity>
);

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

// RADIO BUTTON

// react native TouchableOpacity does not work on android on elements with absolute positioning
// so this uses TouchableOpacity from a library called react-native-gesture-handler for android
const RadioContainer = styled(
  Platform.OS === 'android' ? GestureTouchable : TouchableOpacity,
)`
  flex-direction: row;
  align-items: center;
`;

const Button = styled.View`
  height: 16px;
  width: 16px;
  border-color: ${(props) => props.theme.primaryTextColor};
  border-width: 1px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const Fill = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.highlight};
`;

export const RadioButton = ({ label = '', isSelected, onPress, ...props }) => {
  return (
    <RadioContainer onPress={onPress} {...props}>
      <Button>{isSelected && <Fill />}</Button>
      <H4Book style={{ marginStart: 12, marginEnd: 8 }}>{label}</H4Book>
    </RadioContainer>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
};

// Radio Button with react-native TouchableOpacity instead of react-native-gesture-handler since the radio button above
// won't work on Android if the position is not absolute positioned.
const NativeRadioContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const NativeTouchableRadioButton = ({
  label = '',
  isSelected,
  onPress,
  ...props
}) => {
  return (
    <NativeRadioContainer onPress={onPress} {...props}>
      <Button>{isSelected && <Fill />}</Button>
      <H4Book style={{ marginStart: 12, marginEnd: 8 }}>{label}</H4Book>
    </NativeRadioContainer>
  );
};

NativeTouchableRadioButton.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
};

// CHECKBOX BUTTON

const StyledCheckbox = styled.View`
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border-color: ${(props) => props.theme.primaryTextColor};
  border-width: ${(props) => (props.selected ? '0px' : '1px')};
  background-color: ${(props) =>
    props.selected ? props.theme.primaryButtonBackgroundColor : 'transparent'};
`;

export const Checkbox = ({ selected = false }) => (
  <StyledCheckbox selected={selected}>
    {selected && <Checkmark>&#10003;</Checkmark>}
  </StyledCheckbox>
);

Checkbox.propTypes = {
  selected: PropTypes.bool.isRequired,
};

// this is used on the Prospect Screen
// ADD BUTTON
export const AddButton = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  box-shadow: ${(props) => props.theme.dropShadow};
`;
